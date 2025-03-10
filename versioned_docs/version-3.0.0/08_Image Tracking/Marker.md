# XREAL Markers

## Introduction

Introducing XREAL Markers, a novel set of 'interactive' image tracking cards designed to facilitate virtual and real-world interaction. By manipulating the magnetic sliders on the cards, users can engage in dynamic gameplay experiences. The cards are available in three distinct colors: green for bidirectional functionality, blue for tridirectional, and orange for six-directional capabilities. Developers are encouraged to leverage the cards' interactive features to innovate and enhance both new and existing applications. Additionally, we invite you to explore the sample application '[SpatialLife_20241216](https://public-resource.xreal.com/download/Application/spatiallife20241216.apk),' thoughtfully crafted by the XREAL design team.

XREAL Markers have been recognized for their innovative design, winning the prestigious [iF Design Award 2025](https://ifdesign.com/en/winner-ranking/project/xreal-markers/711126) in the User Experience (UX) category. The award acknowledges how XREAL Markers bridge physical interaction and virtual displays, offering an intuitive way to control AR content through tactile input and gestures.




<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px'}}>
  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/20250227-140646.jpeg" alt="XREAL Markers" style={{maxWidth: '45%'}} />
  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/markersgaid___2.jpg" alt="XREAL Markers Guide" style={{maxWidth: '45%'}} />
  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/02.jpg" alt="XREAL Markers Usage" style={{maxWidth: '45%'}} />
  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/spacial-life.jpg" alt="Spatial Life Application" style={{maxWidth: '45%'}} />
</div>


## Requirement

> To ensure optimal performance and compatibility when using the Spatial Life application, the following hardware and software specifications must be met:

- Android phones listed in[ Device Compatibility](../01_XREALDevices/Compatibility.md) or Beam Pro
- XREAL Air 2 Ultra
- [Nebula 3.8.0](https://play.google.com/store/apps/details?id=ai.nreal.nebula.universal&hl=en_US&gl=US)


> Developers who don’t have Marker cards can download and print this PDF file for use.

[XREAL Markers Print.pdf](../assets/XREAL%20Markers%20Print.pdf)

Usage Instructions:

* Please print the Marker images on matte A4 paper in color to ensure accurate output size.
* When printing, do not enlarge the image; print at 100% scale.
* Cut out the Marker along the black border and attach it to a rigid cardboard.
* Within the camera’s recognition range, only one card of the same color should appear.

## Developer Guide

Learn how to use the Marker Tracking feature in your own apps.

- Create a new project in Unity. 

> Need help setting up? Try [Getting Started with XREAL SDK](../01_Getting%20Started%20with%20XREAL%20SDK.md) first

- Import marker tracking module in XREAL SDK samples.

![image-20250310174559809](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250310174559809.png)

- Click XREAL -> MarkerTracking -> Install

  ![image-20250102194007535](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250102194007535.png)

> Note that the marker tracking is not compatible with the original image tracking. If you want to use the old version SDK, click uninstall.

- Open scene `MarkerTracking`

  ![image-20250102195024691](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250102195024691.png)

- Modify your application logic as needed. The editor includes a simulator for image tracking, demonstrated in the screenshot below. This simulator provides 11 buttons, each corresponding to one of the 11 images. By clicking these buttons, you can simulate the tracking effect for the respective image.

  ![image-20240722191741243](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240722191741243.png)

  


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