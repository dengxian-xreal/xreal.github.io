# Single Pass Stereo Rendering

### Introduction

Single Pass Stereo Rendering is an advanced rendering technique that allows a scene to be rendered in one pass for both the left and right eye views. This method is highly efficient and significantly enhances performance, particularly in scenarios such as Virtual Reality (VR) or Augmented Reality (AR) applications.

Implementing Single Pass Stereo Rendering in NRSDK primarily reduces CPU usage, while GPU performance remains largely unchanged. Using Single Pass Stereo Rendering can lead to lower battery usage and lower hardware temperatures, further enhancing the user experience and device performance.

This is especially beneficial for applications that are CPU-bound or draw call bound. We strongly recommend using Single Pass Stereo Rendering to improve performance in such cases.

### Setup

#### 1. Prerequisite

Install XREAL SDK, see [Getting Started with XREAL SDK](../01_Getting%20Started%20with%20XREAL%20SDK.md).

#### 2. Configure XREAL XR Plugin

- Go to "Edit -> Project Settings -> XR Plug-in Management" and check the "XREAL" option, select "Multiview" in the Stereo Rendering.

![image-20241226190639916](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241226190639916.png)

### Additional technical documentation

To understand Single Pass Stereo rendering in detail, go to [Single Pass Stereo Rendering](https://docs.unity3d.com/Manual/SinglePassStereoRendering.html) topics in Unity’s documentation.
