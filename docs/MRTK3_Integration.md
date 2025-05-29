# MRTK3 Integration 

## Overview
Thanks to XREAL SDK 3.0.0's integration with XR Hands, developers can seamlessly combine MRTK3 with XREAL SDK for enhanced mixed reality experiences.

## Prerequisites
- [MRTK3 base project](https://github.com/MixedRealityToolkit/MixedRealityToolkit-Unity)
- [XREAL SDK 3.0.0](https://developer.xreal.com/download)
- XR Hands

:::info
If you want to skip all these environment setup steps and get a ready-to-use project, you can refer to **[this repository](https://github.com/dengxian-xreal/MixedRealityToolkit-Unity-XREALSDK)**.
Simply clone it and you're good to go.
:::


## Integration Steps

### 1. SDK Import
Import the XREAL SDK into your MRTK3 project. For detailed import instructions, please refer to the [Getting Started with XREAL SDK](https://docs.xreal.com/Getting%20Started%20with%20XREAL%20SDK#3-import-xreal-sdk-for-unity).

### 2. Hand Tracking Setup
1. Navigate to the HandInteractionExamples scene or your own scene
2. Locate the MRTK XR Rig in your scene hierarchy
3. In the Inspector, click on the currently used Input Action Asset
4. This will locate the asset in your Project window
5. Select the asset and click on `XREAL -> Setup Hand Tracking` in the menu bar
![image-20250328183401178](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250328183401178.png)

### 3. MRTK Profile Configuration
1. Locate the MRTK Profile in your Project window
2. Enable the following options:
   - Unity XR Hands
   - Unity XR SDK Hand Data
3. Disable:
   - Mixed Reality OpenXR Plugin Hands
![image-20250328183627816](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250328183627816.png)

### 4. XR Plugin Management Settings
1. Open Player Settings
2. Navigate to XR Plug-in Management
3. Configure the following:
   - Enable XREAL
   - Disable OpenXR
   ![image-20250328183829165](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250328183829165.png)
4. In the XREAL settings:
   - Set Initial Input Source to "Hands"
   ![image-20250328183914468](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250328183914468.png)


## Building and Deployment
After completing the above steps, your project is ready for building and deployment to XREAL devices.

## Additional Resources
- [Download Demo Application](https://public-resource.xreal.com/download/Application/MRTK3DemoForXREALSDK.apk)


## Troubleshooting
If you encounter any issues during integration, please ensure:
- All required packages are properly imported
- SDK versions are compatible
- All configuration steps have been followed precisely

