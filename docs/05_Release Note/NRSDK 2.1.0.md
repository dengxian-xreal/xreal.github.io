# NRSDK 2.1.0

:::info

**Download** [**NRSDKForUnity_Release_2.1.0.unitypackage**](https://public-resource.xreal.com/download/NRSDKForUnity_2.1.0_Release_20231019/NRSDKForUnity_Release_2.1.0.unitypackage)

:::

### Important Notice

Starting with this version (2.1.0), NRSDK will no longer support the Dev Kit. We recommend using the latest hardware devices for optimal performance and experience. For users still utilizing the Dev Kit, we advise upgrading to supported hardware or continuing with an older version of the SDK. We appreciate your ongoing support for NRSDK and look forward to bringing more innovations and improvements in future releases.

### What's New


- Spatial Anchor: A new feature that provides world-locked frames of reference.

  - Enables users to place, persist, and resume virtual content across sessions to the same real-world locations, enhancing the seamless AR experience.

  - Introduces the ability to share anchors between users, allowing different users to interact with the same set of virtual objects anchored in the real world.



- Support for Single Pass Stereo Rendering, a rendering technique that significantly enhances performance:

  - Reduces CPU usage, which is especially beneficial for applications that are CPU-bound or draw call bound.
- Leads to less battery usage and lower hardware temperature, providing a more comfortable user experience.


- Introduced MonoMode rendering for on-screen display: enables 2D (1920*1080) mirroring for left and right eyes


- Added metrics in the logs


- Supports URP (Universal Render Pipeline)

### Improvements


- Hand Tracking


- - Significant improvement in the stability of gesture tracking trajectory, reducing jitter and jumping phenomena.

  - Enhanced accuracy of gesture tracking, enabling more precise recognition and tracking of complex hand movements.

  - Optimized runtime performance and resource usage of the gesture algorithm, resulting in smoother gesture tracking and lower device resource occupancy.

  - Modify the algorithm of gesture ray to improve its directionality and reduce the latency of gesture ray.



- Meshing


- - Improved mesh reconstruction for flat surfaces (including desks, floors, and walls), resulting in smoother and more complete meshes, less affected by weak textures.

  - Resolved the issue of fragments in space.

  - Extended the effective distance of the mesh from 4 meters to 5 meters.


### Modifications


- Enhanced NRTrackingModeChangedTip for smoother transitions between 3dof and 6dof modes.


- Raised the minimum Unity version supported by NRSDK to 2019.4.X.


- Adjusted ProjectTips: Now includes an Auto Graphic API check within ProjectSetting > GraphicAPI.


- Updated HomeMenu: Now defaults to Nebula after exiting the App.


- Refined GlassControl: Added `NRDeviceSubsystem.BrightnessMax` to dynamically read the maximum brightness for glasses.

### Bug Fixes


- Resolved the issue where a black screen appeared 0.5 seconds before recording began.


- Background MR applications will automatically close when the glasses are unplugged.

### **Know Issues**

NRSDK + URP + Multithreaded Rendering + NoXRPlugin is currently not supported.
