# NRSDK 2.4.0
![Release Date](https://img.shields.io/badge/Release_Date-December_06,_2024-0080FF?style=flat&logoWidth=1)

:::info

Please note that Nebula will no longer be maintained. For developers who wish to continue developing with Android phones, we provide Control Glasses as a server to perform OTA updates and launch 3D applications on XREAL glasses. For Android phone compatibility, we will limit our testing to Samsung flagship models only. Currently, SDK 2.4.0 is compatible with Samsung S24.

**Download** [**NRSDKForUnity_Release_2.4.0.unitypackage**](https://public-resource.xreal.com/download/NRSDKForUnity_2.4.0_Release_20241113/NRSDKForUnityAndroid_2.4.0.unitypackage)

**Download [Control Glasses 1.0.0](https://public-resource.xreal.com/download/ControlGlasses_1.0.0_Release_20241113/ControlGlasses_1.0.0.unitypackage)**

:::

### What's New

* Compatibility with XREAL One Series
* Compatibility with Unity 6
* Added MSAA support when using [XREAL XR Plugin](../13_Rendering/1_Single%20Pass%20Stereo%20Rendering/#2-import-nrsdk-xr-plugin-package)
* Added gesture support in controller mode

### Changes
* Updated minimum Unity version requirement to 2021.3 LTS (previously 2019.4 LTS)
* RGB Camera now only supports YUV_420_888 format

### Improvements
* Modified transition effects during switching between 0 DoF and 3 DoF
* Improved hand tracking stability:
  * Enhanced stability when holding objects
  * Improved accuracy of invisible joint positioning
  * Better gesture recognition in low light, backlit, and complex background conditions
  * Increased success rate of pinch detection at various angles

### Bug Fixes
* Fixed an error in Spatial Anchor: After creating an anchor, when the Quality bar turns green, clicking save will cause the screen to freeze for about 15 seconds before displaying that the anchor has been saved.
* Fixed capture position issues when HMD coordinate system differs from world coordinate system
* Fixed YUV data memory layout order in RGB Camera
* Fixed an issue where the RGB camera would shut down after one minute of use, preventing photo and video capture








