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

![image-20240813172225899](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172225899.png)

#### 2. Import NRSDK XR Plugin Package

:::tip

Download [XREAL XR Plugin](https://nreal-public.nreal.ai/download/NRSDKForUnity_2.2.0_Release_20240301/com.nreal.xr.zip)

:::

- Unzip the `com.xreal.xr.zip` file to a local directory; 
- In the editor, go to the "Windows -> Package Manager" menu bar, click "**+**", select "`Add package from disk`", and add the `package.json` from the local directory.

​	![image-20240813172242825](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172242825.png)

![image-20240813172255309](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172255309.png)

#### 3. Configure XREAL XR Plugin

- Go to "Edit -> Project Settings -> XR Plug-in Management" and check the "NRSDK" option;

  ![image-20240813172308266](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172308266.png)

- Go to "Edit -> Project Settings -> XR Plug-in Management -> NRSDK", switch the StereoRenderingMode to `Multiview`, and the XRPlugin configuration is complete.

​	![image-20240813172319331](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172319331.png)

### Additional technical documentation

To understand Single Pass Stereo rendering in detail, go to [Single Pass Stereo Rendering](https://docs.unity3d.com/Manual/SinglePassStereoRendering.html) topics in Unity’s documentation.
