---
sidebar_position: 3
---

# Getting Started with XREAL SDK

Start developing your XREAL Unity apps on Android phone.

This quickstart guide will help you set up your development environment and test out the sample app “Hello MR” using XREAL SDK.

### 1. Prerequisites

**Hardware Checklist**

- Beam Pro or a supported Android Phone. Currently, only the Samsung S22, S24, and subsequent flagship series are supported.

- A pair of **XREAL** glasses.

- **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb). Wireless ADB is not required but **strongly recommended**, so that repetitive plug in/out can be avoided.

**Software Checklist**

- [Unity 2021.3.X or later](https://unity3d.com/get-unity/download) with Android Build Support Unity LTS (Long Term Support) version is recommended
  - If you are using Unity 2021.3.X, please use AR Foundation 5.1.0 or later when you need AR Features.
- XR Plugin Management
- Latest [XREAL SDK for Unity](https://developer.xreal.com/download)
  - Sample `Interaction Basics`
  - Sample `AR Features` (Optional)
- XR Interaction Toolkit (Both 2.5.x and 3.0.x are supported)
  - Sample `Starter Assets`
  - Sample `Hands Interaction Demo` (Optional)
- AR Foundation(Optional)
- XR Hands(Optional)
- Android SDK 10.0 (API Level 29) or later, installed using the SDK Manager in [Android Studio](https://developer.android.com/studio)
- [Visual Studio](https://visualstudio.microsoft.com/downloads/) (if you prefer other development environments that’s fine too)

### 2. Creating a Unity Project

We’re going to create a new Unity project and integrate XREAL SDK later on. To create a new Unity project:

#### 1. Open Unity Hub and create a new 3D project.

Switch to the Android platform. After switching, some version of Unity may require you to restart the project.

![image-20241226180545435](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241226180545435.png)

#### 2. Import XRI and AR Foundation

1. Install XR Interaction Toolkit from the Unity Registry in the Package Manager and import **Starter Assets** in Samples tab. If you only use controllers for interaction, the Starter Assets will suffice. However, if you want to use hand gestures for interaction, you’ll also need to import the **Hands Interaction Demo**.

   ![image-20240531111307809](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111307809.png)

   There will be a warning about new input system, and requires you to restart the editor, just click yes. 

   ![image-20240612181604343](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612181604343.png)

2. (Optional) Install AR Foundation from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html) only if you need AR features like plane detection, image tracking, spatial anchors, or depth meshing. If you don’t require these features, there’s no need to install AR Foundation.

![image-20240529200949957](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240529200949957.png)

#### 3. Import XREAL SDK for Unity

Open Window -> Package Manager, There are two import methods. 

* Add package from git url (改成from tarball)

* Add pacakge from disk

>  For both the **Enterprise** and **Experimental** editions, only the ‘add package from disk’ method is supported. 
>
>  For the **Normal** edition of the SDK, both methods are supported.

![image-20240808201609886](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240808201609886.png)

1. Add package from git url: （目前需要内网环境才可以添加，后续需要修改成github链接）

```
ssh://git@gitlab.xreal.work:9022/SDKForUnity/xrsdkforunity.git?path=/XRProvider/com.xreal.xr#dev
```

2. Add package from disk

   1.  Download the plugin.

   2. Unzip folder `com.xreal.xr`

   3. Select `package.json`，click Open

When importing the XREAL SDK into your Unity project, you’ll encounter several key components that facilitate the development of AR applications. Here’s a breakdown of the essential and optional elements:

* **Interaction Basics**: This is an essential component that provides assets to streamline the setup of basic rendering and interactions using controllers and hand gestures, compatible with the XR Interaction Toolkit. It includes prefabs and demo scenes designed to help you get started quickly with the XREAL SDK integration. This component is fundamental as it lays the groundwork for any XR application, ensuring that you have the necessary tools for basic interaction and rendering.

* **AR Features**: This is an optional component, recommended for those who require advanced AR functionalities in their projects. It includes sample scenes and other assets that demonstrate the integration of AR features supported by the XREAL SDK with AR Foundation. This part specifically supports Plane Detection, Image Tracking, Spatial Anchors, and Depth Meshing. Depending on the scope of your project, you can choose to import this component if your application will utilize complex AR features.

When setting up your project, start with the **Interaction Basics** to ensure all fundamental interaction mechanisms are in place. Then, depending on the AR features necessary for your project, consider importing the AR Features module to expand the application’s capabilities with advanced AR technology. This modular approach allows you to keep your project lightweight by only including the components necessary for your specific needs.



### 3. Configure Project Settings

You could either configure your project automatically via XR Plugin Management **Project Validation** or configure manually. These two ways are equivalent.

#### **Project Validation**

* To enable XREAL XR Plug-in, navigate to the project settings under **Edit > Project Settings > XR Plug-in Management** and open the Android tab. Check the **XREAL** plug-in. ![image-20240528140739045](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528140739045.png)

- Initially, there might be some project settings that have to be updated/fixed. To do so, go to `Project Validation` window. Click on the `Fix All` buttons next to the entries to apply the needed project settings. ![image-20240528114854485](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528114854485.png)

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

### 4.XREAL Settings

![image-20241226190639916](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241226190639916.png)

* `Stereo Rendering Mode`
  * **Multi-view**: This mode renders the left and right eye views in a single pass, reducing the overhead and potentially increasing performance.
  * **Multi-pass**: In this mode, the left and right eye views are rendered in separate passes, which can be less efficient but may be necessary for certain effects or compatibility.

* `Initial Tracking Type`
  * **MODE_6DOF (Six Degrees of Freedom)**: Allows tracking of both position and rotation in 3D space, providing a fully immersive experience.
  * **MODE_3DOF (Three Degrees of Freedom)**: Tracks only rotational movement, meaning the user can look around but not move within the space.
  * **MODE_0DOF**: No tracking of movement or rotation.
  * **MODE_0DOF-STAB**: No tracking but ensures a stable view, using some form of sensor data to reduce drift.

* `Initial Input Source`
  * **Hands**: Uses hand tracking for input.
  * **Controller**: Uses BeamPro or an Android phone as a controller for input.
  * **None**: No input source is used.
  * **Controller And Hands**: Uses both hand tracking and controller for input.

* `Virtual Controller`:  XREAL SDK allows the use of external devices, like BeamPro or Android phones, as virtual controllers. This setting defines the layout and functionality of the on-screen buttons for these controllers.

* `Support Multi Resume`: Enables dual-screen independent display mode, allowing the AR app to continue displaying in the glasses while the phone screen can switch to other 2D apps. When enabled:
  * The AR view remains active in the glasses even when the app is in background
  * Users can freely use other apps on their phone screen
  * Requires user permission on first launch
  * Enabled by default in XREAL Settings

  ![Dual Screen Display](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252FURzr2zc46xi9SY7CjA7z%252FCleanShot%25202024-03-12%2520at%252011.07.45.gif%3Falt%3Dmedia%26token%3Dfae8be23-1475-4633-9f12-6871c42388a1&width=768&dpr=4&quality=100&sign=58fec834f79e26dc2c1bdbf91f1b67a3efa81afca32b46d529c0107107e6f72a)

  For more detailed information about dual-screen display, see [Dual Screen Display](../Tools/DualScreenDisplay).

* `Support Devices`: 
  * **XREAL_DEVICE_CATEGORY_REALITY**: Glasses with 6DoF tracking capabilities, such as the XREAL Air 2 Ultra.
  * **XREAL_DEVICE_CATEGORY_VISION**: Glasses with 3DoF tracking capabilities, such as the XREAL Air 2 and XREAL One Series.

* `Android Permissions`: 
  Android permissions can be incorporated either by modifying the general Android Manifest.xml file or by utilizing the XREAL Settings interface for a more streamlined approach.
  * **CAMERA**: Allows the app to access the camera.
  * **VIBRATION**: Allows the app to access the vibration. .
  * **AUDIO**: Allows the app to access the audio.
 
* `License Assets`: 
  By configuring the License, you can unlock advanced features of the SDK.

### 5. Find **HelloMR** Sample Scene

- After importing the sample **Interaction Basics**  in Unity Package Manager, find the **HelloMR** sample scene in the Unity Project window by selecting `Assets/Samples/XREAL XR Plugin/3.0.0/Interaction Basics/HelloMR.unity`

  ![image-20240808205306592](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240808205306592.png)

### 6. Building XREAL SDK App for Android
1. Access the **Build Settings** in **Menu -> File ->** **Build Settings**. Click the button "`Add Open Scene`" and make sure the current scene is checked. 

   ![image-20240722111318972](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240722111318972.png)


2. Click **Player Settings**. Customize the **Company Name** and **Product Name.** 
3. (Optional) Navigate to the **Android**> **Other Settings** panel to specify your build settings. As you have prepared **Step 3. Configure Project Settings,** you may leave the current configuration as it is. It is worth noting some of the other settings:

- **Multithreaded Rendering**: Enable this option to use multithreaded rendering. In most cases, both enabling and disabling this option is supported by XREAL SDK. However, for the scenes that contains **Overlay** content, you should disable multithreaded rendering. And When developing URP projects, if [single pass rendering](https://xreal.gitbook.io/nrsdk/development/tools/single-pass-stereo-rendering) is not used, it is best to also turn off Multithreaded rendering, otherwise tearing may occur.

- **Scripting Backend:** You must choose **IL2CPP** when building for ARM64 architecture. Note that starting from NRSDK 2.2.0, ARMv7 architecture is no longer supported.	![image-20240722113642797](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240722113642797.png)

4. In **Build Settings** window, click **Build.**
5. Select the destination folder and wait until the building is finished.

### 7. Deploy to XREAL Device

- Connect your Phone / Beam Pro to your Mac / Windows PC. 
- Install your app through WiFi **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) or type-C cable after the build is successful.
- Disconnect the device with your PC, and then connect it to the glasses.
- (Optional) Use **Android Logcat** to view logged messages. We recommend using WiFi **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) to connect to your PC so that you do not have to be connected through the data cable most of the time.
- Enable developer options and USB debugging on your Phone / Beam Pro. **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) is enabled as default and does not require manual setting.


### 8. Troubleshooting

#### 1. How to obtain key events, gesture events, etc.
  Controller events, gesture events, controller position information, gesture position information, and HMD position information can all be obtained through Unity's Input System. For detailed information, please refer to the official Unity manual at
  https://docs.unity3d.com/Packages/com.unity.inputsystem@1.7/manual/index.html

#### 2. XREAL Logo Not Visible in URP Project
  The default material is not a URP material; you need to manually change the material.

#### 3. Adding Android Permissions
  Android permissions can be incorporated either by modifying the general Android Manifest.xml file or by utilizing the XREAL Settings interface for a more streamlined approach.
  ![image-20241230152824094](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241230152824094.png)

#### 4. How to activate Device Simulator
  Firstly, import the XR Device Simulator from the XR Interaction Toolkit samples.

  ![image-20241230153527317](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241230153527317.png)

  After importing, ensure that the simulator is enabled.

  ![image-20241230153829887](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241230153829887.png)

#### 5. How to disable the Unity logo splash screen in your app.

To disable the splash screen, you must have a Unity Pro license. Once you have the license, navigate to **Edit -> Project Settings -> Player**, and under the **Splash Image** section, uncheck the option for displaying the Unity logo. This will remove the splash screen when your app starts.

![image-20241230160531803](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241230160531803.png)

#### 6. Composition Layers with Layer Order Less Than 0 Not Visible in URP

  In URP, HDR must be disabled. The reason for this is that when HDR is enabled, Unity uses R11G11B10 textures instead of R8G8B8A8_UNorm. Consequently, the Alpha Blend of the Composition Layer does not function correctly, although the Layer Order feature remains operational.