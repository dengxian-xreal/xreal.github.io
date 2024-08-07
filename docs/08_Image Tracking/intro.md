# Image Tracking

### Introduction

NRSDK's Image Tracking capability helps you build AR apps that can respond to and follow images in the natural environment. These can include books, signs, posters, or logos.

A set of images can be uploaded to the database as pre-trained references. These images can then be tracked by NRSDK in the physical world while the transformation of the images are updated during the session.

### Capabilities

- NRSDK can detect and track images that are fixed in place, such as a painting on a wall or a book on the table. It can also track moving images, such as a rotating billboard or a poster held by someone walking around.
- Upon initiating tracking with NRSDK, the system delivers continuous estimations for the position and orientation of the tracked image. It is advisable to configure the size in Unity to match the printed tracked image. The transformation estimates for the image are continually updated, leading to enhanced tracking accuracy, particularly for static images, as NRSDK accumulates data from various angles over time.
- NRSDK can remember up to 8 images in the environment. However, these images cannot be tracked simultaneously in the current version. Therefore, only one image can be tracked in each frame. Additionally, NRSDK will not track multiple instances of the same image.

### Requirements

#### Image Selection Checklist

- Reference images should be in JPEG format, grayscale or RGB color, and have a dpi value of 150. The dimensions of printed reference images should be less than 1m^2.
- To enable better tracking, it is important to use images with well-distributed feature points and low degrees of self-similarity. NRSDK can evaluate the tracking quality of the reference images when you add them to the database. Images with low tracking quality cannot be added to the database.
- For those who design original reference images, we suggest to export the image using Adobe Illustrator rather than Adobe Photoshop. This is because Photoshop has looser export standards and NRSDK can sometimes fail to read information on pixel density.

**Image Tracking Condition Requirement**

- Images printed with dull surfaces perform better than glossy ones due to reduced light reflections.
- The quickest way to initialize image tracking is to view the image at a slight angle while keeping the image flat and undistorted.
- The NRImageTracking Tool gives a score between 0 and 100 for each uploaded reference image. We recommend using images with a score of 65 and above. Using an image with a score lower than 40 will result in poor tracking quality.

**Examples of good images and bad images:**

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc2.readthedocs.io%2Fen%2Fdev%2F_images%2Fimgtrack01.jpg&width=300&dpr=4&quality=100&sign=f7ca458a44d2378dd021cdf1e7715e584a6cbb803c646ba5ad5f47256431d302)

### Developer Guide

Learn how to use the Image Tracking feature in your own apps.

#### Build and Run the Sample App

Create a new project in Unity.

> Need help setting up? Try [Getting Started with NRSDK](../02_Getting%20Started%20with%20NRSDK.md) first

Before you build the app, make sure you include the tracking image scene located in

```
Assets > NRSDK > Demos > ImageTracking
```

Make sure your phone is connected to your PC before clicking Build and Run. Unity builds your project into an Android APK, which will be installed onto your phone. The app can then be launched once you plug XREAL Light glasses into the phone.

As you move your XREAL Light glasses, the app automatically detects and tracks images from the set of reference images.

#### Create the Database File

Select one or more pictures you want to use with the mouse, then right-click and select the `Create > NRSDK > TrackingImageDatabase` menu to create the database file.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc2.readthedocs.io%2Fen%2Fdev%2F_images%2Fimgtrack02.jpg&width=768&dpr=4&quality=100&sign=e95f47f3d550f73139a88a203ab1181090419e091205797dac13dacb31c57816)

A new image database is created in the same folder as the reference images.

The images in the database will be shown in the Inspector window along with image quality scores. We recommend using images with scores higher than 65 to guarantee good tracking performance.

The dimensions of the physical image (in meters) for each uploaded reference image should be the same as the dimension shows above.

You can click 'x' to delete items.

**Note:** The size of the images you use must correspond to the size in the database

#### Set the Database File

- In the Project window, go to `Assets > NRSDK` and open NRKernalSessionConfig.
- In the Inspector window, click the box next to Tracking Image Database and select the database file you created.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc2.readthedocs.io%2Fen%2Fdev%2F_images%2Fimgtrack03.jpg&width=768&dpr=4&quality=100&sign=59d21e338f1757507bc042a681627aa251b417b945552707325fb4591dcffaa2)

#### Get Tracked Image

See `MarkerDetecter.cs` , located in `Assets > NRSDK > Demos > TrackingImage > Scripts` for an example on how to get the trackables：

```
// Get a new NRTrackableImage
NRFrame.GetTrackables<NRTrackableImage>(m_NewTrackableImages, TrackableQueryFilter.New);

// Get the trackable's position
NRTrackableImage image = m_NewTrackableImages[i];
image.GetCenterPose()

// Get the trackable's size
image.Size;

// Get the trackable's statec
image.GetTrackingState();     //Tracking,Paused,Stopped

// Get all NRTrackableImage
NRFrame.GetTrackables<NRTrackableImage>(m_AllTrackableImages, TrackableQueryFilter.All
```
