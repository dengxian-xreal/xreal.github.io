# NRSDK 1.8.0

:::info

**Download** [**NRSDKForUnity_Release_1.8.0.unitypackage**](https://public-resource.xreal.com/download/NRSDKForUnity_1.8.0_Release/NRSDKForUnityAndroid_Release_1.8.0.unitypackage)

:::

**What's New:**


- Adapted for Nreal Air


- - Automatic mode switch between 3DoF/6DoF head tracking, image/plane tracking, video capture on Nreal Air & Nreal Light;

  - Added API `NRDevice.Subsystem.GetDeviceType` getting the current device's type (Nreal Light/Air) and `NRDevice.Subsystem.IsFeatureSupported` check if a feature specified in `NRSupportedFeature` is supported by the current device

  - Adapt to Android 12 (API level 31); developer should configure `target API` to `API level 31` in `Project Settings -> Player` when building application



- (NRSDK Experimental) Supported overlay compositor layers allowing texture rendering with higher quality


- (NRSDK Experimental) Supported DRM(Digital rights management) protected content display

**Improvements:**


- Significantly improved stability of head and controller tracking


- Reduced time switching between 3DoF/6DoF via `NRHMDPoseTracker.ChangeTo0Dof`,  `NRHMDPoseTracker.ChangeTo3Dof` and  `NRHMDPoseTracker.ChangeTo6Dof`


- Reduced time building blue tooth connection with Dev Kit controller


- Optimized NRSDK configuration helper (`NRSDK->Project Tips`) auto checking and tips

**Bug Fixes:**


- Fixed erroneously displayed black area when using screen capture feature


- Other bug fixes
