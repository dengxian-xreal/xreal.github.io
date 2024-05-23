# XREAL Markers

## Introduction

Introducing XREAL Markers, a novel set of 'interactive' image tracking cards designed to facilitate virtual and real-world interaction. By manipulating the magnetic sliders on the cards, users can engage in dynamic gameplay experiences. The cards are available in three distinct colors: green for bidirectional functionality, blue for tridirectional, and orange for six-directional capabilities. Developers are encouraged to leverage the cards' interactive features to innovate and enhance both new and existing applications. Additionally, we invite you to explore the sample application '[Spatial Life](https://nreal-public.nreal.ai/download/Application/SpatialLife.apk),' thoughtfully crafted by the XREAL design team.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252F72u2BCymCsDwuo4rstZW%252Fmarker.jpeg%3Falt%3Dmedia%26token%3D469a1904-f103-4bbf-a2d7-6876483b1655&width=768&dpr=4&quality=100&sign=17a6f80bf8c0f823f0682a711d7fa9f27d6aac80f8194796f34aa5a9ba66d22e)

## Requirement

> To ensure optimal performance and compatibility when using the Spatial Life application, the following hardware and software specifications must be met:

- Android phones listed in[ Device Compatibility](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/xreal-devices/compatibility)
- XREAL Air 2 Ultra
- [Nebula 3.8.0](https://play.google.com/store/apps/details?id=ai.nreal.nebula.universal&hl=en_US&gl=US)

> For developers interested in creating applications akin to Spatial Life, with feature coaster image tracking, additional resource is required:
<details>
<summary>NRSDKForUnity Experimental</summary>

2024.04.18 

Fixed: The problem of not being recognized after switching back from the background.

- [NRSDKForUnity_Experimental_Release_2.2.1.unitypackage](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.0_Release_20240418/NRSDKForUnityAndroid_Experimental_2.2.1.unitypackage)     

2024.03.29 

- [NRSDKForUnity_Experimental_Release_2.2.0.unitypackage](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.0_Release_20240329/NRSDKForUnityAndroid_Experimental_2.2.0.unitypackage)     

</details>

## Developer Guide

Learn how to use the Coasters Image Tracking feature in your own apps.

- Create a new project in Unity. 

> Need help setting up? Try [Getting Started with NRSDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android) first

- Click NRSDK -> CoastersTrackingModule -> Install
![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252F2DS7RnBhOur5zqlfWInT%252Fimage.png%3Falt%3Dmedia%26token%3Da7d24636-f285-45c5-97c1-fdc81dba74d6&width=768&dpr=4&quality=100&sign=d1e2aab6b7f5d641b6336557c4f46409dd863fac25e40494ca1d5b95e782837f)


> Note that the coasters image tracking is not compatible with the original image tracking. If you want to use the old version SDK, click uninstall.

- Open scene `**CoastersimageTracking**`
![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252F8o0JCLC5V3dMByLSphG0%252Fimage.png%3Falt%3Dmedia%26token%3Dac0bc058-8265-4cb6-b52b-1fd5e54d63d6&width=768&dpr=4&quality=100&sign=2f17ef70dc9a72044c261010cc91f296b219539001d1a2ad8b7f3325d877af29)

- Modify your application logic as needed. The editor includes a simulator for image tracking, demonstrated in the screenshot below. This simulator provides 11 buttons, each corresponding to one of the 11 images. By clicking these buttons, you can simulate the tracking effect for the respective image.
![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252FB9SXWtWoXmhIlRYTiYXR%252Fimage.png%3Falt%3Dmedia%26token%3D7095a69c-e27b-4fa4-9bb1-26255ad6d4ae&width=768&dpr=4&quality=100&sign=55b77ef0d9e24c6e6a6b77a81d4f0b7132dbee8809d7da366006cc25c18aa27c)

- The Marker feature uses a trained data sample. The sample resource address is shown in the figure below. It needs to be specified in the SessionConfig resource.
![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252FeaNlKYLU6xH7w7gobOYx%252Fimage.png%3Falt%3Dmedia%26token%3Dfd0435f1-506a-42c8-85e0-f60343b1ec27&width=768&dpr=4&quality=100&sign=9d9b334aee5e6ea6b69280e65a9b1f36536bd88d5b263adf92c6c5c2cc73cb6a)
![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252Fb8kRvjLE5O8TeTujVe5o%252Fimage.png%3Falt%3Dmedia%26token%3D9e874ced-4f67-4ea0-901e-173df086b713&width=768&dpr=4&quality=100&sign=81f060ed2e350ab912b77832dc47faad5cffc974d4047ddfc7ba34c9ff3c2bc7)

- Before building an APK, please add the following lines inside the `<application>` element of your `AndroidManifest.xml`
```
<uses-library android:name="libOpenCL.so" android:required="false"/>
<uses-library android:name="libcdsprpc.so" android:required="false"/>
```

## Usage

### Get the current tracked Image list.

```
NRFrame.GetTrackables<NRTrackableImage>(m_TempTrackingImages, NRTrackableQueryFilter.All);
```

### Get the tracking status of Image

> In Marker, the `GetTrackingState` method will only return two states: **Tracking** and **Paused**.



```
NRTrackableImage.GetTrackingState() 

    /// <summary> Device Tracking State. </summary>
    public enum TrackingState
    {
        /// <summary>
        /// TRACKING means the object is being tracked and its state is valid.
        /// </summary>
        Tracking = 0,

        /// <summary>
        /// PAUSED indicates that NRSDK has paused tracking, 
        /// and the related data is not accurate.  
        /// </summary>
        Paused = 1,

        /// <summary>
        /// STOPPED means that NRSDK has stopped tracking, and will never resume tracking. 
        /// </summary>
        Stopped = 2
    }
```

### Get the ID of the Image

> In Marker, the value range of ID is [0,10], corresponding to different states of Marker cards.

```
NRTrackableImage.GetCoastersDataBaseIndex()
```

### Get image pose and size information

```
// The length in the X direction of the image
NRTrackableImage.ExtentX
// The length in the Z direction of the image
NRTrackableImage.ExtentZ
// Get the pose of the center of the image
NRTrackableImage.GetCenterPose
```

### Enable and disable ImageTracking functionality

```
/// <summary> Enables the image tracking. </summary>
public void EnableImageTracking()
{
    var config = NRSessionManager.Instance.NRSessionBehaviour.SessionConfig;
    config.ImageTrackingMode = TrackableImageFindingMode.ENABLE;
    NRSessionManager.Instance.SetConfiguration(config);
}

/// <summary> Disables the image tracking. </summary>
public void DisableImageTracking()
{
    var config = NRSessionManager.Instance.NRSessionBehaviour.SessionConfig;
    config.ImageTrackingMode = TrackableImageFindingMode.DISABLE;
    NRSessionManager.Instance.SetConfiguration(config);
}
```