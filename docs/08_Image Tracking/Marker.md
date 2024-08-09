# XREAL Markers

## Introduction

Introducing XREAL Markers, a novel set of 'interactive' image tracking cards designed to facilitate virtual and real-world interaction. By manipulating the magnetic sliders on the cards, users can engage in dynamic gameplay experiences. The cards are available in three distinct colors: green for bidirectional functionality, blue for tridirectional, and orange for six-directional capabilities. Developers are encouraged to leverage the cards' interactive features to innovate and enhance both new and existing applications. Additionally, we invite you to explore the sample application '[Spatial Life](https://nreal-public.nreal.ai/download/Application/spatiallife0619.apk),' thoughtfully crafted by the XREAL design team.



![XREAL Markers](https://raw.githubusercontent.com/dengxian-xreal/Images/main/XREAL%20Markers.png)

## Requirement

> To ensure optimal performance and compatibility when using the Spatial Life application, the following hardware and software specifications must be met:

- Android phones listed in[ Device Compatibility](../01_XREALDevices/Compatibility.md) or Beam Pro
- XREAL Air 2 Ultra
- [Nebula 3.8.0](https://play.google.com/store/apps/details?id=ai.nreal.nebula.universal&hl=en_US&gl=US)

> For developers interested in creating applications akin to Spatial Life, with feature coaster image tracking, additional resource is required:
<details>
<summary>NRSDKForUnity Experimental</summary>
2024.06.19

Regular updates released with the normal version.

- [NRSDKForUnity_Experimental_Release_2.2.1.unitypackage](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.1_Release_20240619/NRSDKForUnityAndroid_Experimental_2.2.1.unitypackage) 

2024.04.18 

Fixed: The problem of not being recognized after switching back from the background.

- [NRSDKForUnity_Experimental_Release_2.2.1.unitypackage](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.0_Release_20240418/NRSDKForUnityAndroid_Experimental_2.2.1.unitypackage)     

2024.03.29 

- [NRSDKForUnity_Experimental_Release_2.2.0.unitypackage](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.0_Release_20240329/NRSDKForUnityAndroid_Experimental_2.2.0.unitypackage)     

</details>

> Developers who don’t have Marker cards can download and print this PDF file for use.

[XREAL Markers Print.pdf](../assets/XREAL%20Markers%20Print.pdf)

Usage Instructions:

* Please print the Marker images on matte A4 paper in color to ensure accurate output size.
* When printing, do not enlarge the image; print at 100% scale.
* Cut out the Marker along the black border and attach it to a rigid cardboard.
* Within the camera’s recognition range, only one card of the same color should appear.

## Developer Guide

Learn how to use the Coasters Image Tracking feature in your own apps.

- Create a new project in Unity. 

> Need help setting up? Try [Getting Started with NRSDK](../02_Getting%20Started%20with%20NRSDK.md) first

- Click NRSDK -> CoastersTrackingModule -> Install

  ![image-20240722191708368](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240722191708368.png)


> Note that the coasters image tracking is not compatible with the original image tracking. If you want to use the old version SDK, click uninstall.

- Open scene `CoastersimageTracking`

  ![image-20240722191721186](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240722191721186.png)

- Modify your application logic as needed. The editor includes a simulator for image tracking, demonstrated in the screenshot below. This simulator provides 11 buttons, each corresponding to one of the 11 images. By clicking these buttons, you can simulate the tracking effect for the respective image.

  ![image-20240722191741243](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240722191741243.png)

- The Marker feature uses a trained data sample. The sample resource address is shown in the figure below. It needs to be specified in the SessionConfig resource.

  ![XREAL Markers (1)](https://raw.githubusercontent.com/dengxian-xreal/Images/main/XREAL%20Markers%20(1).png)

- Set the ImageTrackingMode to enable.

  ![image-20240722191836785](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240722191836785.png)

- Before building an APK, please add the following lines inside the `<application>` element of your `AndroidManifest.xml`
```
<uses-library android:name="libOpenCL.so" android:required="false"/>
<uses-library android:name="libcdsprpc.so" android:required="false"/>
```

## Usage

### Get the current tracked Image list.

```c#
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