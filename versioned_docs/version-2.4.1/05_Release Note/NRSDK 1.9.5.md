# NRSDK 1.9.5

:::info

**Download** [**NRSDKForUnity_Release_1.9.5.unitypackage**](https://public-resource.xreal.com/download/NRSDKForUnity_Release_1.9.5/NRSDKForUnity_Release_1.9.5.unitypackage)

:::

**What’s New:**


- Added support for saving photos to the local album when using PhotoCapture


- Added support for saving videos to the local album when using Record


- Added API `NRHMDPoseTracker.ResetWorldMatrix` to reset the camera; resetPitch(Optional): whether the pitch Angle is reset


- Added a demo [ResetCamera](https://app.gitbook.com/o/n9Gz0qLyZFcBAT9F8hDM/s/yXoV7SMVFQhr75lOIoQv/development/miscellaneous/reset-camera) to demonstrate how to use the API ResetWorldMatrix


- Added a configuration option **ForceKillWhileGlassSwitchMode** in SessionConfig to decide whether exit the process while switching between 2D and 3D mode, **True** by default


- Added a new style of the virtual controller

**Fixed:**


- Fixed the issue that recording video twice in a row, internal audio recording fails during the second recording


- Fixed raycast missing after the app enters the background.
