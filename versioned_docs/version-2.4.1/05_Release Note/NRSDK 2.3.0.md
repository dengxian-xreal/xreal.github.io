# NRSDK 2.3.0
![Release Date](https://img.shields.io/badge/Release_Date-September_9,_2024-0080FF?style=flat&logoWidth=1)
:::info

SDK 2.3.0 is compatible with **Beam Pro** and **My Glasses 1.4.0**. For developers using Android phones, SDK 2.3.0 is compatible with **Nebula 3.8.1**.

**Download** [**NRSDKForUnity_Release_2.3.0.unitypackage**](https://public-resource.xreal.com/download/NRSDKForUnity_2.3.0_Release_20240909/NRSDKForUnityAndroid_2.3.0.unitypackage)

:::

### What's New

- **RGBCamera API:** Added Projection and UnProjection interfaces.
- **NRMetrics:** Introduced the enableTearCollecting option (note: time-consuming operation), which allows the collection of tear data and outputs results in the Metrics log.
- **Debounce Mode for Controller Tracker:** Added a new anti-shake mode for mobile ray tracking. The debounceMode option has been added to ControllerTracker, with the default set to false.

### Improvements
- **Hand Tracking:**
  - Enhanced joints stability and reduced latency.
  - Improved pinch gesture recognition accuracy and stability.
  - Better performance in low-light and complex background environments.

### Bug Fixes
- Fixed an issue where videos were not recorded after tapping "Record" and trying to view them in the album.
- Fixed an issue where hand tracking could be activated unintentionally when switching DoF modes.
- Fixed flickering issues in Unity’s controller interface when using the URP.
- Fixed an issue where controllers became unusable when resizing the Game window in Editor mode.

### Known Issues

* XREAL Light is not compatible with Samsung S23 and Beam Pro.
* URP is not compatible with multithreaded rendering.





