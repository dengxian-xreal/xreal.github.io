---
id: pc-sdk-beta
slug: /pc-sdk-beta
title: PC SDK (Beta)
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# PC SDK (Beta)

XREAL SDK is **cross-platform**: the same SDK can build apps for **Android**, **macOS**, and **Windows**. Platform support differs mainly in **project configuration** and **runtime setup**.

This document applies to **Windows** and **macOS**.

![image-20260114174148221](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260114174148221.png)

## What you can build on PC

With the Windows/macOS PC SDK, you can connect XREAL glasses directly to a PC to:

- Display PC content in the glasses
- Interact using **keyboard and mouse**
- Support **3DoF** and **6DoF** tracking (where available)

### 6DoF support

6DoF is supported only on specific devices:

- **XREAL Air 2 Ultra**
- **XREAL One series + Eye camera**


## Requirements 

### Unity

- Unity **2022.3** or **Unity 6**
- Avoid using older Unity 2022 versions if possible

### Packages

The PC SDK configuration is **the same on Windows and macOS**:

- [com.xreal.xr](https://public-resource.xreal.com/download/XREALSDK_Preview_3.1.1.20260113/20260113_173436_3.1.1/com.xreal.xr.tar.gz)
- [com.xreal.xr.experimental](https://public-resource.xreal.com/download/XREALSDK_Preview_3.1.1.20260113/20260113_173436_3.1.1/com.xreal.xr.experimental.tar.gz)
- [com.cysharp.unitask](https://github.com/Cysharp/UniTask?tab=readme-ov-file#install-via-git-url)

## Getting Started with the PC SDK

:::tip Want to skip environment setup?
If you run into setup issues (or just want a ready-to-run project), clone the [XREALSDKForPC template repo](https://github.com/dengxian-xreal/XREALSDKForPC). If you run into any issues, feel free to open an issue in that repo and we’ll help you there.

Then download `com.xreal.xr` and `com.xreal.xr.experimental` (the tarballs linked above) and place them in the **project root** (the same folder level as `Assets/`). The project is preconfigured and should work once you open it in Unity.

![image-20260116152034334](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260116152034334.png)
:::

1. Add packages
   - Open **Window → Package Manager**
   - Click **+** → **Add package from tarball…**
   - Select the downloaded `.tgz` packages for `com.xreal.xr` and `com.xreal.xr.experimental` sequentially
   - Click **+** → **Add package from git URL…**
   - Paste the UniTask Git URL: `https://github.com/Cysharp/UniTask.git?path=src/UniTask/Assets/Plugins/UniTask`


2. Import samples
   - Import **Standalone Samples** only
   ![Standalone samples](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/2.PNG)


3. Enable the loader (but don’t auto-initialize)
   - Open **Edit → Project Settings → XR Plug-in Management**
   - In the **Standalone** tab, enable **XREAL XR Loader**
   - Keep **Initialize XR on Startup** unchecked

   ![Enable loader](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/1.png)


## Rendering (URP)

If your project uses **URP**:

- Replace the materials in the sample scene as needed
- Add `XREAL Embedding Render Feature` to your Renderer Features, and keep it as the **last** feature
 ![image-20260113175849554](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260113175849554.png)
## Input System

If your project uses the **Input System**, replace the scene’s Input Module accordingly.

 ![Unity 2026-01-13 18.02.53](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/Unity%202026-01-13%2018.02.53.png)

## Display Modes (Single-window vs Dual-window)

The PC SDK supports two runtime display modes:

- **Single-window mode (default)**: all app content renders to the glasses.
- **Dual-window mode (Windows only)**: the glasses render XR content, and the PC monitor shows a separate window (for example, UI or debugging). The two windows can display different content.

### How to enable dual-window mode (Windows)

![Second window option](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/SecondWindow.png)

The Hello MR sample includes a **UseSecondWindow** option. When enabled, Unity uses a second window to display XR content, while keeping the initial window for UI.

Due to Unity limitations, dual-window mode requires the glasses to be set as a **3D extended display before the app starts**. If this condition is not met, the Hello MR sample attempts to configure it automatically and then **restarts the app**.

macOS does not currently support dual-window mode.



## Build & Test

After building the app, when you run it on macOS, you’ll need to allow the app to find devices on the local network.

<img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20260114175115276.png" alt="Local network permission prompt" width="50%" />

## Current Limitations

- Hand tracking and AR features are not supported on PC yet.
- In Unity Editor Play Mode, 3D content renders to the **Game** view (not directly to the glasses).

## FAQ

### Which glasses are supported?

In theory, all XREAL glasses are supported, including the One series and Air series.

The One series has the best compatibility. For the Air series:
1. On Windows, compatibility can depend on your PC GPU’s support for NVIDIA Fast Sync.
2. On macOS, because there is no glasses chip, the experience may be worse.
