# Image Tracking

### Introduction

XREAL's Image Tracking capability allows you to build AR apps that can respond to and follow images in the natural environment. These images can include books, signs, posters, or logos.

A set of images can be uploaded to the database as pre-trained references. These images can then be tracked by XREAL SDK in the physical world, with their transformations updated during the session.

### Capabilities

- XREAL SDK can detect and track images that are fixed in place, such as a painting on a wall or a book on the table. It can also track moving images, such as a rotating billboard or a poster held by someone walking around.
- Upon initiating tracking with XREAL SDK, the system delivers continuous estimations for the position and orientation of the tracked image. It is advisable to configure the size in Unity to match the printed tracked image. The transformation estimates for the image are continually updated, leading to enhanced tracking accuracy, particularly for static images, as XREAL SDK accumulates data from various angles over time.
- XREAL SDK allows developers to add up to 5 unique images to its reference image library. However, the number of images that can be tracked simultaneously in real-time is limited to 2 for optimal performance. Attempting to track more than 1 image concurrently may result in reduced real-time responsiveness of the application. It is important to note that XREAL SDK will not track multiple instances of the same image, even if they are physically present in the environment.

### Requirements

#### Image Selection Checklist

- **Supported Formats** & **Resolution**: Reference images should be in a format supported by Unity, such as JPEG, PNG, TGA, BMP, GIF, PSD, or TIFF. The images should be in grayscale or RGB color, with a recommended resolution of 150 DPI or higher. For optimal performance, the dimensions of printed reference images should be less than 1 square meter (1m^2).
- **Feature Points**: To enable better tracking, it is important to use images with well-distributed feature points and low degrees of self-similarity. NRSDK can evaluate the tracking quality of the reference images when you add them to the database. Images with low tracking quality cannot be added to the database.
- **Image Creation**: For those who design original reference images, we suggest to export the image using Adobe Illustrator rather than Adobe Photoshop. This is because Photoshop has looser export standards and NRSDK can sometimes fail to read information on pixel density.

**Image Tracking Condition Requirement**⚠️

- **Surface**: Images printed with dull surfaces perform better than glossy ones due to reduced light reflections.
- **Initialization**: The quickest way to initialize image tracking is to view the image at a slight angle while keeping the image flat and undistorted.
- **Quality Score**: The NRImageTracking Tool gives a score between 0 and 100 for each uploaded reference image. We recommend using images with a score of 65 and above. Using an image with a score lower than 40 will result in poor tracking quality.

**Examples of good images and bad images:**

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc2.readthedocs.io%2Fen%2Fdev%2F_images%2Fimgtrack01.jpg&width=300&dpr=4&quality=100&sign=f7ca458a44d2378dd021cdf1e7715e584a6cbb803c646ba5ad5f47256431d302)

### Developer Guide

Learn how to implement Image Tracking in your AR applications using AR Foundation with XREAL SDK. By integrating with AR Foundation, XREAL provides developers with a standardized development interface and workflow, allowing them to use the unified AR Foundation API for development. This greatly reduces the learning curve, enhances code portability, and enables the same codebase to support a wide range of platforms and devices.

#### Basic Setup

1. Create a new project in Unity.

> Need help setting up? Try [Getting Started with NRSDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android) first ⚠️

2. Install AR Foundation from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html).

![image-20240529200949957](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240529200949957.png)

3. Install XR Interaction Toolkit from the Unity Registry in the Package Manager and import Starter Assets in Samples tab.

   ![image-20240531111307809](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111307809.png)

4. Create a new scene 

5. Add an `XR Origin(XR Rig)` GameObject to the scene: 

   In the **Project** window, find Assets/Samples/XR Interaction Toolkit/3.0.1/Starter Assets/Prefabs/XR Origin (XR Rig).prefab, and drag it to **Hierarchy** window.

   ![image-20240531111129519](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111129519.png)

6. Add an `AR Session` GameObject to the scene: in the **Hierarchy** window, right-click and select **XR** > **AR Session**.

#### Create a reference image library

1. Create reference image libraries in the Unity Editor. From Unity's main menu, go to **Assets** > **Create** > **XR** > **Reference Image Library**.

   ![image-20240530110414334](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240530110414334.png)

2. This creates a new reference image library asset in your project. To add images, select this Asset, then click **Add Image** and complete the fields that appear:

   ![image-20240530110633794](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240530110633794.png)

​	You can specify the following information:

* **Name**：identify which reference image has been detected. 
* **Specify Size**： the accurate physical size of the image you will print later. The error between the actual size and the size you filled in should not exceed 1cm. The correct measures are essential for a correct pose estimation and subsequent placement of an augmentation.
* **Keep Texture at Runtime**：should set to true, this enables the subsystem to pass the texture data to the XREAL SDK service for tracking purposes.

#### Set the reference image library

Add `ARTrackedImageManager` on XR Origin GameObject.

![image-20240530155508300](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240530155508300.png)

The component provides three fields: 

* Serialized Library:  the `Reference Image Library` created above, 
* Max Number Of Moving Images: XREAL SDK does not require developers to set this field.
* Tracked Image Prefab: This prefab will be instantiated whenever an image from the reference image library is detected.

#### Respond to detected images

Add a `TrackedImageInfoManager` script to the `XR Origin` GameObject. This script can display different information on the tracked image and can be modified to respond to detected images as needed.

![image-20240530203422754](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240530203422754.png)

Subscribe to the ARTrackedImageManager's [trackedImagesChanged](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@5.1/api/UnityEngine.XR.ARFoundation.ARTrackedImageManager.html#UnityEngine_XR_ARFoundation_ARTrackedImageManager_trackedImagesChanged) event to be notified whenever an image is added (that is, first detected), updated, or removed:

```
[SerializeField]
ARTrackedImageManager m_TrackedImageManager;

void OnEnable() => m_TrackedImageManager.trackedImagesChanged += OnChanged;

void OnDisable() => m_TrackedImageManager.trackedImagesChanged -= OnChanged;

void OnChanged(ARTrackedImagesChangedEventArgs eventArgs)
{
    foreach (var newImage in eventArgs.added)
    {
        // Handle added event
    }

    foreach (var updatedImage in eventArgs.updated)
    {
        // Handle updated event
    }

    foreach (var removedImage in eventArgs.removed)
    {
        // Handle removed event
    }
}
```



#### Build and Run

Make sure your phone is connected to your PC before clicking Build and Run. Unity builds your project into an Android APK, which will be installed onto your phone. The app can then be launched once you plug XREAL Light glasses into the phone.

As you move your XREAL Light/Air 2 Ultra glasses, the app automatically detects and tracks images from the set of reference images.