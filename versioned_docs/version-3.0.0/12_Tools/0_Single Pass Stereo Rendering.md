# Single Pass Stereo Rendering

### Introduction

Single Pass Stereo Rendering is an advanced rendering technique that allows a scene to be rendered in one pass for both the left and right eye views. This method is highly efficient and significantly enhances performance, particularly in scenarios such as Virtual Reality (VR) or Augmented Reality (AR) applications.

Implementing Single Pass Stereo Rendering in NRSDK primarily reduces CPU usage, while GPU performance remains largely unchanged. Using Single Pass Stereo Rendering can lead to lower battery usage and lower hardware temperatures, further enhancing the user experience and device performance.

This is especially beneficial for applications that are CPU-bound or draw call bound. We strongly recommend using Single Pass Stereo Rendering to improve performance in such cases.

### Setup

#### 1. Prerequisite

Install XR Plugin Manager

- Go to Edit -> Project Settings
- Install `XR Plugin Manager`

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F5dpVzei7TPJ1fF0OBQVz%2F0.png&width=768&dpr=4&quality=100&sign=daabce755b1ccba8d2c71aaf3c45fd06c20ec9514c4f110725bb0bc7600148da)

#### 2. Import NRSDK XR Plugin Package

:::tip

Download [XREAL XR Plugin](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.0_Release_20240301/com.nreal.xr.zip)

:::

- Unzip the `com.xreal.xr.zip` file to a local directory; 
- In the editor, go to the "Windows -> Package Manager" menu bar, click "**+**", select "`Add package from disk`", and add the `package.json` from the local directory.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FlpTkFEgqTosBuiGysnrH%2F1.png&width=768&dpr=4&quality=100&sign=b6cdebf225ef35a6ff54e4544175de021927047049bdad89771f4eda3410b11d)

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FChJKq9RoAX2nTZUvsZl9%2F2.png&width=768&dpr=4&quality=100&sign=65c05b39d5bb8e5ec15691ab2bed2cdd6ca462d427afc15ad19d586e0954a73b)

#### 3. Configure XREAL XR Plugin

- Go to "Edit -> Project Settings -> XR Plug-in Management" and check the "NRSDK" option;

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FXcUpuK7EPcv2mIOTcOCW%2F3.png&width=768&dpr=4&quality=100&sign=c1b4826c4b3a56f679a7d281332a71ced79d9ff3ff9a920311613f36b04b48a2)

- Go to "Edit -> Project Settings -> XR Plug-in Management -> NRSDK", switch the StereoRenderingMode to `Multiview`, and the XRPlugin configuration is complete.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FtvE18AlByHj5zFdNQ429%2F4.png&width=768&dpr=4&quality=100&sign=6a64d3e073f19528e09233dbe11e047366377ae1b358cb27e0cab915518f3cb9)

### Additional technical documentation

To understand Single Pass Stereo rendering in detail, go to [Single Pass Stereo Rendering](https://docs.unity3d.com/Manual/SinglePassStereoRendering.html) topics in Unity’s documentation.
