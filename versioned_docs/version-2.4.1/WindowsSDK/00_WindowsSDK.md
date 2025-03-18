# NRSDK for Windows Developer Documentation

## Introduction

Welcome to the NRSDK for Windows developer documentation. This guide is designed to help you get started with developing applications for XREAL devices using the Windows SDK. Whether you're a seasoned developer or just starting out, this documentation will provide you with the necessary information to create immersive and interactive experiences on Windows platforms.

## Main Features

- 6DoF Tracking
- 3DoF Tracking
- Glasses Control 
- Single pass rendering
- Gray Camera data
- IMU Data

## System Requirements

Before you start, ensure your development machine meets the following requirements:
- Windows 10 or later
- Unity 2021.3 LTS or later
- DirectX 11 compatible graphics card

## Getting Started

#### 1. Prerequisite

Install XR Plugin Manager

- Go to Edit -> Project Settings
- Install `XR Plugin Manager`

![image-20240813172225899](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172225899.png)

#### 2. Import NRSDK XR Plugin Package

:::tip

Download [XREAL XR Plugin](https://public-resource.xreal.com/download/NRSDKForUnity_2.3.0_Release_20240909/com.nreal.xr.zip)

:::

- Unzip the `com.xreal.xr.zip` file to a local directory; 
- In the editor, go to the "Windows -> Package Manager" menu bar, click "**+**", select "`Add package from disk`", and add the `package.json` from the local directory.

​	![image-20240813172242825](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172242825.png)

![image-20240813172255309](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172255309.png)

#### 3. Import Sample Project

After installing the XREAL XR Plugin, open the Package Manager, select `XREAL XR Plugin`, click on Samples, choose `Standalone` and click import.

![image-20241014174817555](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241014174817555.png)

These sample projects are designed to help you understand and implement various features of the NRSDK for Windows. 

| Sample Project | Description | Key Features |
|----------------|-------------|--------------|
| HelloMR | A basic XR application demonstrating core SDK functionality | - 6DoF head tracking<br/>- Basic rendering<br/>- Input handling |
| GlassesControlExample | Demonstrates the usage of Glasses Control related interfaces | Display, Brightness, Electrochromic, Psensor |
| GrayCamera | Demonstrates how to retrieve gray camera data | Sensor reading |
| IMUExample | Demonstrates how to retrieve IMU data | Sensor reading |



#### 4. Configure XREAL XR Plugin

- Go to "Edit -> Project Settings -> XR Plug-in Management" and check the "XREAL" option;

  ![image-20241014143215852](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241014143215852.png)

- Go to "Edit -> Project Settings -> XR Plug-in Management -> XREAL", and configure the settings according to your project requirements.

​	![image-20241014143152607](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241014143152607.png)

* `Stereo Rendering Mode`
  * **Multi-view**: This mode renders the left and right eye views in a single pass, reducing the overhead and potentially increasing performance.
  * **Multi-pass**: In this mode, the left and right eye views are rendered in separate passes, which can be less efficient but may be necessary for certain effects or compatibility.
* `Tracking Type`
  * **MODE_6DOF (Six Degrees of Freedom)**: Allows tracking of both position and rotation in 3D space, providing a fully immersive experience.
  * **MODE_3DOF (Three Degrees of Freedom)**: Tracks only rotational movement, meaning the user can look around but not move within the space.
  * **MODE_0DOF**: No tracking of movement or rotation.
  * **MODE_0DOF-STAB**: No tracking but ensures a stable view, using some form of sensor data to reduce drift.
* `Glasses Mode`
  * TwoD_1080_1920_60: 2D mode, 1080 resolution, 60Hz refresh rate.
  * ThreeD_540_3840_120: 3D mode, 540 resolution, 120Hz refresh rate.
  * ThreeD_1080_3840_60: 3D mode, 1080 resolution, 60Hz refresh rate.
  * ThreeD_1080_3840_72: 3D mode, 1080 resolution, 72Hz refresh rate.
  * TwoD_1080_1920_72: 2D mode, 1080 resolution, 72Hz refresh rate.
  * ThreeD_1080_3840_50: 3D mode, 1080 resolution, 50Hz refresh rate.
  * ThreeD_1080_3840_55: 3D mode, 1080 resolution, 55Hz refresh rate.
  * ThreeD_1080_1920_60: 3D mode, 1080 resolution, 60Hz refresh rate.
  * ThreeD_1080_3840_90: 3D mode, 1080 resolution, 90Hz refresh rate.
  * TwoD_1080_1920_90: 2D mode, 1080 resolution, 90Hz refresh rate.
  * TwoD_1080_1920_120: 2D mode, 1080 resolution, 120Hz refresh rate.
* `Auto Connect Glasses`: Automatically connect to the glasses when the application starts.
* `Check Connect Interval`: Check the connection to the glasses at regular intervals.
* `Target Frame Rate`: Set the target frame rate for the application.
* `License Asset`: Set the license asset for the XREAL SDK.


## API Overview



## Best Practices

[Share best practices for developing with NRSDK for Windows]

## Troubleshooting

[Include common issues and their solutions]

## FAQ

[List frequently asked questions and their answers]

---

This documentation is a work in progress and will be updated regularly. 
