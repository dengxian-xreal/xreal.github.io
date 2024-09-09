# NRSDK 2.3.0

:::warning

SDK 2.3.0 is currently only compatible with the **Beam Pro** and the latest version of My Glasses, which was released alongside SDK 2.3.0. For developers using Android phones, please wait for the Nebula 3.9.0 release in late September.

**Download** [**NRSDKForUnity_Release_2.3.0.unitypackage**](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.3.0_Release_20240909/NRSDKForUnityAndroid_2.3.0.unitypackage)

:::

### What's New

- **License Support:**  Enterprise partners can now apply for access to the Enterprise SDK, which includes APIs for gray camera data, IMU data, and other glasses control functionalities. If your company is interested in business collaboration, please contact us through the [official website](https://www.xreal.com/contact-us/) to request access.
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
- Fixed flickering issues in Unity’s controller interface when using the URP plugin.
- Fixed an issue where controllers became unusable when resizing the Game window in Editor mode.

### Known Issues

* XREAL Light is not compatible with Samsung S23 and Beam Pro.
* URP is not compatible with multithreaded rendering.





