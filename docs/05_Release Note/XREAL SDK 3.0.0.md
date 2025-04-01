# XREAL SDK 3.0.0
![Release Date](https://img.shields.io/badge/Release_Date-March_20,_2025-0080FF?style=flat&logoWidth=1)

:::info

XREAL SDK 3.0.0 represents a major architectural upgrade from NRSDK, now fully integrated with Unity's XR ecosystem. This release marks a significant milestone in our development framework, offering enhanced compatibility, standardization, and development efficiency.

**Download** [**XREAL SDK 3.0.0 for Unity**](https://public-resource.xreal.com/download/XREALSDK_Release_3.0.0.20250401/com.xreal.xr.tar.gz)

Please note: Nebula will no longer be maintained.

For developers who want to continue working with Android phones instead of using BeamPro, the ControlGlasses app is required to perform OTA updates and launch 3D applications on XREAL glasses.

* If you are using BeamPro, you can ignore this notice.
* Users must install the ControlGlasses app on their Android device to run AR applications.
* Currently, we only test compatibility with Samsung flagship models, and XREAL SDK 3.0.0 is compatible with the Samsung S24.

**Download** [**Control Glasses 1.1.0**](https://public-resource.xreal.com/download/XREALSDK_Release_3.0.0.20250314/ControlGlasses-1.1.0.20250307172552-release.apk)

:::

### What's New

* **Unity XR Plugin Integration**
  * Complete transition from proprietary NRSDK APIs to Unity's XR Plugin architecture
  * Native support for Unity's XR Interaction Toolkit for standardized interaction handling
  * Seamless integration with AR Foundation for comprehensive AR feature management
  * Enhanced cross-platform compatibility and portability

* **Development Framework Improvements**
  * Standardized development workflow aligned with Unity's XR ecosystem
  * Enhanced compatibility with Unity's built-in XR tools and features

* **Feature Enhancements**
  * Hand Tracking: Updated from 23 joint points to 26 joint points to align with OpenXR standards
  * Image Tracking: 
    * Completely revamped image tracking system with improved detection rates
    * Enhanced tracking stability
  * Added support for XREAL Eye, an RGB camera accessory


### Compatibility Notes

**MyGlasses Hardware Compatibility:**
* Developers who do not utilize Hand Tracking or Image Tracking features can continue using previous SDK versions with the new MyGlasses
* To leverage the enhanced Hand Tracking (26 joint points) and improved Image Tracking capabilities with MyGlasses, upgrading to SDK 3.0.0 is required

### Migration Guide

For developers migrating from NRSDK to XREAL SDK 3.0.0, please refer to our comprehensive [Migration Guide](../02_MigratingFromNRSDKToXREALSDK/0_intro.md) for detailed instructions and best practices.


