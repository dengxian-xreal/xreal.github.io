---
sidebar_position: 3
---

# Migrating from NRSDK to XREAL SDK

有很多开发者之前已经使用NRSDK开发了很棒的应用（比如：AR Lab），本教程旨在帮助这些开发者从原有的NRSDK迁移到新版XREAL SDK，以享受XRI和ARFoundation带来的便利，实现更好的兼容性和跨平台性。本教程将在原本的demo HelloMR的基础上做迁移示例。

### 1. Prerequisites

**Hardware Checklist**

- A supported Android Phone. Please review the[ Device Compatibility](01_XREALDevices/Compatibility.md) list to ensure your phone model is compatible with the glasses and XREAL SDK.

- A pair of **XREAL** glasses.

- **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb). Wireless ADB is not required but **strongly recommended**, so that repetitive plug in/out can be avoided.

**Software Checklist**

- [Unity 2021.3.X or later](https://unity3d.com/get-unity/download) with Android Build Support Unity LTS (Long Term Support) version is recommended

- Latest [XREAL SDK for Unity](https://developer.xreal.com/download)

- XR Plugin Management

- XR Interaction Toolkit

- AR Foundation

- Android SDK 10.0 (API Level 29) or later, installed using the SDK Manager in [Android Studio](https://developer.android.com/studio)

- [Visual Studio](https://visualstudio.microsoft.com/downloads/) (if you prefer other development environments that’s fine too)

### 2. Import XRI and AR Foundation

1. Install XR Interaction Toolkit from the Unity Registry in the Package Manager and import **Starter Assets** in Samples tab.

   ![image-20240531111307809](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111307809.png)

   There will be a warning about new input system, and requires you to restart the editor, just click yes. 

   ![image-20240612181604343](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612181604343.png)

2. Install AR Foundation from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html).

![image-20240529200949957](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240529200949957.png)

### 3. Import XREAL SDK for Unity (⚠️待研发完成后补充)

There're several ways you can import XREAL SDK into your current project.

- Select `Window>Package Manager` .
- Click "➕" 
  1. Add package from disk
     1. Select the downloaded 
  2. Add package from tarball
  3. Add package from git URL

记得换这个图：

![image-20240612172215595](../../../../Library/Application%20Support/typora-user-images/image-20240612172215595.png)

### 4. Configure Project Settings

You could either configure your project automatically via XREAL SDK **Project Setup** tool or configure manually. These two ways are equivalent.

#### **Project Setup Tool**

* To enable XREAL XR Plug-in, navigate to the project settings under **Edit > Project Settings > XR Plug-in Management** and open the Android tab. Check the **XREAL** plug-in. ![image-20240528140739045](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528140739045.png)

- Initially, there might be some project settings that have to be updated/fixed. To do so, go to `Project Validation` window. Click on the fix buttons next to the entries to apply the needed project settings. ![image-20240528114854485](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528114854485.png)

#### **Manual Configuration**

- Go to **File > Build Settings**.

- Select **Android** and click **Switch Platform**.

- In the **Build Settings** window, click **Player Settings**.

- In the **Inspector** window, configure player settings as follows:



| **Setting**                                                  | **Value**                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Player Settings > Resolution and Presentation > Default Orientation` | Portrait                                                     |
| `Player Settings > Other Settings > Auto Graphics API`       | false                                                        |
| `Player Settings > Other Settings > Graphics APIs`           | OpenGL ES3                                                   |
| `Player Settings > Other Settings > Package Name`            | Create a unique app ID using a Java package name format. For example, use **com.xreal.helloMR** |
| `Player Settings > Other Settings > Minimum API Level`       | Android 10.0 or higher                                       |
| `Player Settings > Other Settings > Target API Level`        | Automatic (highest installed)                                |
| `Player Settings > Other Settings > Write Permission`        | External(SDCard)                                             |
| `Project Settings > Quality > VSync Count`                   | Don't Sync                                                   |

### Project Settings ⚠️

![image-20240528141758417](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528141758417.png)

* Stereo Rendering Mode
* Tracking Type
* Virtual Controller
* Input Source
* Support Mono Mode
* Target Device

  * You could specify Target Devices in `Assets/NRSDK/NRProjectConfig.` Be aware that **all the XREAL SDK features supported by XREAL Air are supported by XREAL Light** . By default, both `Support XREAL Light`(VISION) and `Support XREAL Air`(REALITY) are selected.
  * By selecting VISION, XREAL SDK will automatically attempt to adapt to XREAL Air, XREAL Air 2 or XREAL Air 2 Pro even if you had implemented XREAL SDK features that are based on RGB Camera (plane detection, image tracking, hand tracking, recording, etc. See [Device Compatibility](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/xreal-devices/compatibility) for details). However, be aware that the actual behavior of the adapted application may differ from your initial intent.

  If you only want the application to run on a specific device (Light/Air), you may arbitrarily specify a single target device. In this way, XREAL SDK will not try to adapt automatically, and the app will not run on unsupported devices.

  - support Multi Resume: This feature allows for different displays on the main screen (phone) and the secondary screen (glasses). When the AR app is sent to the background, the glasses continue to display the AR application, while the phone screen can show any 2D app. Essentially, this is dual-screen display functionality. This option is enabled by default, and after adding this feature, it requires permission on the phone upon first use.

### 6. Remove Old NRSDK and Import new SDK

* Duplicate the assets in NRSDK you need into another folder and delete NRSDK folder in Assets.

* NRCameraRig-> XR Origin(XR Rig)

  find the XR Origin(XR Rig) prefab in Project->Assets-> Samples->XR Interaction Toolkit-> 2.5.4->Starter Assets->Prefabs->XR Origin(XR Rig)

  之所以用这个prefab，而不直接在场景中创建一个新的XR Origin，是因为在Unity的官方示例中，这个prefab已经包含了我们将用到的很多配置，包括各种Interactors，所以我们建议直接使用这个prefab.

  ![image-20240612191039138](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612191039138.png)

* Remove NRInput in Hierarchy

* Add AR Session in Hierarchy by right click -> XR -> AR Session

  ![image-20240612191811692](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612191811692.png)

* Click PlaneDetector, remove these 3 scripts, and add component AR Plane Manager.

  ![image-20240612191917984](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612191917984.png)

* Then add a plane prefab, you can still use the previous one

  ![image-20240612192155293](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612192155293.png)

* That's it! you can now build and test! If you're familiar with the following steps, just ignore the tutorial and run your app on the device.

### 8.Building XREAL SDK App for Android

1. Access the **Build Settings** in **Menu -> File ->** **Build Settings**. Click the button "`Add Open Scene`" and make sure the current scene is checked. <img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FMoKBkh4ZItI620SjI3fB%2Fimage.png&width=768&dpr=4&quality=100&sign=d7917b19764c26c320b3e16d5d12fa8500a1a0f38bf3cb4e9075d724fce68853" alt="Your Image Description" class="center-image"/>


2. Click **Player Settings**. Customize the **Company Name** and **Product Name.** 
3. (Optional) Navigate to the **Android**> **Other Settings** panel to specify your build settings. As you have prepared **Step 3. Configure Project Settings,** you may leave the current configuration as it is. It is worth noting some of the other settings:

- **Multithreaded Rendering**: Enable this option to use multithreaded rendering. In most cases, both enabling and disabling this option is supported by XREAL SDK. However, for the scenes that contains **Overlay** content, you should disable multithreaded rendering. And When developing URP projects, if [single pass rendering](https://xreal.gitbook.io/nrsdk/development/tools/single-pass-stereo-rendering) is not used, it is best to also turn off Multithreaded rendering, otherwise tearing may occur.

- **Scripting Backend:** You must choose **IL2CPP** when building for ARM64 architecture. Note that starting from XREAL SDK 2.2, ARMv7 architecture is no longer supported.<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FijFH00KUpneZptdM1xaj%2Fimage.png&width=768&dpr=4&quality=100&sign=7c427706fce8673b8c60a167e55c1979693416747d46200b2b505fe0980786dd" alt="Your Image Description" class="center-image"/>



4. In **Build Settings** window, click **Build.**
5. Select the destination folder and wait until the building is finished.

### 9. Deploy to XREAL Device

- Connect your Phone / computing unit to your Mac / Windows PC. 

- Install your app through WiFi **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) or type-C cable after the build is successful.

- Disconnect the computing unit with your PC, and then connect it to the glasses.

- (Computing Unit only) If it is the first time you run this app, you need to authorize the app by some tools like [scrcpy](https://github.com/Genymobile/scrcpy).

- Launch your app along with the XREAL Light controller. For instructions on how to use the XREAL Light controller, please refer to [Controller](https://nrealsdkdoc2.readthedocs.io/en/dev/Docs/Unity_EN/Develop/Controller.html#controller-guide).

- Move around until XREAL SDK finds a horizontal plane and the detected plane will be covered with green grid.

- Click the Trigger button to put an XREAL logo object on it.

- (Optional) Use **Android Logcat** to view logged messages. We recommend using WiFi **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) to connect to your PC so that you do not have to be connected through the data cable most of the time.

- Enable developer options and USB debugging on your Phone / Computing unit. **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) is enabled as default and does not require manual setting.
