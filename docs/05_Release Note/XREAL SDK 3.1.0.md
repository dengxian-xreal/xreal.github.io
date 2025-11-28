# XREAL SDK 3.1.0
![Release Date](https://img.shields.io/badge/Release_Date-November_25,_2025-0080FF?style=flat&logoWidth=1)

:::info

**Download** [**XREAL SDK 3.1.0 for Unity**](https://public-resource.xreal.com/download/XREALSDK_Release_3.1.0.20251125/com.xreal.xr.tar.gz)

**Download** [**Control Glasses 3.1.0**](https://public-resource.xreal.com/download/XREALSDK_Release_3.1.0.20251124/ControlGlasses-3.1.0.20251118115716-release.apk) — [Why do I need ControlGlasses?](../Tools/ControlGlasses)

:::

### What's New

* **6DoF Tracking**
  * Adds support for 6DoF tracking on XREAL One series with XREAL Eye
  * Requires updating the glasses firmware to the latest version

* **Automatic Log Capture**
  * Added an option to automatically save Logcat logs on app launch for easier debugging.

### Changes

* Adds a new `Scanning` value to the `NotTrackingReason` enum

### Bug Fixes

* Fixed an issue where apps could not exit correctly after receiving a glasses-exit notification while running in the background
* Fixed a crash when calling `GetTrackingType` before `XREALLoader` was started
* Fixed incorrect timing for Metrics updates
* Fixed an Image Tracking build failure that occurred when the system user name contained non-English characters
* Fixed a mismatch between Unity Action data and reported hand-tracking data when pausing and resuming Unity while both hands remained in view

### Compatibility Notes

* Tested compatible host devices for SDK 3.1.0:
  * Beam Pro
  * Samsung S25

* To use the new 6DoF tracking capabilities, you must update the glasses firmware
  * BeamPro: update MyGlasses to 1.11.0, then connect the glasses to BeamPro to trigger the automatic firmware update
  * S25: connect the glasses to a PC and update the firmware via the OTA website: https://www.xreal.com/ota/

