---
id: ios-sdk-beta
slug: /ios-sdk-beta
title: iOS SDK (Beta)
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# iOS SDK (Beta)

XREAL SDK is **cross-platform**: the same SDK can build apps for **Android**, **macOS**, and **Windows**. Platform support differs mainly in **project configuration** and **runtime setup**.

This document applies to **iOS**.

![image-20260209115604221](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260209115604221.png)

## Requirements

### Software

- Xcode
- Unity (with iOS plug-in)
- GlassesControl API License

### Hardware

- Glasses: only supports XREAL One series
- iPhone: supports DP output (iPhone 15 and above)
- Eye: required if you want to use 6DoF

## Install

### Packages

- [com.xreal.xr.3.1.2.20260206](https://public-resource.xreal.com/download/XREALSDK_Preview_3.1.2.20260206/20260206_185349_3.1.2_Preview/com.xreal.xr.tar.gz)
- [com.xreal.xr.experimental.3.1.2.20260206](https://public-resource.xreal.com/download/XREALSDK_Preview_3.1.2.20260206/20260206_185349_3.1.2_Preview/com.xreal.xr.experimental.tar.gz)

### Add to your project

1. Switch Unity to the iOS platform.
2. Import packages: `com.xreal.xr` and `com.xreal.xr.experimental`.
3. Enable **XREAL XR Loader** in Unity **XR Management**.
   ![image-20260209115717843](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260209115717843.png)
4. In **XREAL Settings**, set **Stereo Rendering Mode** to **Multi Pass**.
   ![image-20260209115736756](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260209115736756.png)
5. In **Player Settings → Other Settings → Scripting Define Symbols**, add `DIRECT_PRESENT` to enable direct presentation on iOS.
   ![image-20260209115837023](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260209115837023.png)
6. For each scene, select the main camera and set **Target Display** to **Display 2**. 
   ![image-20260209115903179](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260209115903179.png)
7. Add **XREAL Embedding Render Feature** to your renderer. If you have multiple renderer features, **XREAL Renderer Feature** should be the last one.
   ![image-20260209115921896](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260209115921896.png)
8. **Export the Unity Project to Xcode and Add Signing** Build the Unity project into an Xcode project as usual. After adding the required signing settings in Xcode, the app can be installed on the iPhone for testing.
9. If you use **Unity 6**, disable **HDR**.
