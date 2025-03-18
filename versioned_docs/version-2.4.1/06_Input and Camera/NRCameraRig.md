# NRCameraRig

### Introduction

The NRSDK contains the **NRCameraRig** prefab that provides the transform object to represent the tracking space. It contains 4 game object to fine-tune the relationship between the head tracking reference frame and your world. Under the NRCameraRig, you will find a CenterCamera, which is the main Unity camera, and two camera game objects for each eye.

### How to Add NRCameraRig in the Scene

NRCameraRig is a replacement for Unity’s main camera, which means you can safely delete Unity’s main camera from the Hierarchy tab.

1. From the **Hierarchy** tab, right-click **Main Camera**, and click **Delete**.
2. In the **Project** tab, expand the **Assets** > **NRSDK** > **Prefabs** folder, and drag and drop the **NRCameraRig** prefab into the scene. You can also drag and drop it in the **Hierarchy** tab.

### Configure Settings

There is just one main script attached to the NRCameraRig prefab, NRHMDPoseTracker.cs, which provides settings for the camera, display, tracking, quality, and performance of your app.

To begin with settings, in the **Hierarchy** tab, select **NRCameraRig**, and in the **Inspector** tab, review the following settings: 

**NRHMD Pose Tracker**

- **Tracking Type**: There are four types of tracking and the special one ***Tracking 0 Dof Stable*** enables the display's tag-along behavior depending on the current view, which is very helpful for image stabilization.
- **Tracking Mode Auto Adaption:** In **NRProjectConfig**, you can choose the target devices of your app, and if you select this option, the Tracking Type will automatically be compatible with your target device.
- **Use Relative:** Select this option to update the local transform of NRCameraRig, which means if there is a parent node of NRCameraRig, you can change its transform to change the NRCameraRig. On the contrary, the Global Transform of NRCameraRig will be updated and won't be affected by its parent node if this option is unselected.