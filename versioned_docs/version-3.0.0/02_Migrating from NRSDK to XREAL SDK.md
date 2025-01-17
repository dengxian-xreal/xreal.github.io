---
sidebar_position: 3
---

# Migrating from NRSDK to XREAL SDK

Many developers have previously created excellent applications using NRSDK (e.g., [AR Lab](https://www.xreal.com/arlab/)). This tutorial aims to assist these developers in migrating from the original NRSDK to the new XREAL SDK, to enjoy the benefits of XRI and ARFoundation, achieving better compatibility and cross-platform functionality. This tutorial will provide a migration example based on the original demo **HelloMR**.

### 1. Prerequisites

**Hardware Checklist**

- A supported Android Phone. Please review the[ Device Compatibility](01_XREALDevices/Compatibility.md) list to ensure your phone model is compatible with the glasses and XREAL SDK.

- A pair of **XREAL** glasses.

- **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb). Wireless ADB is not required but **strongly recommended**, so that repetitive plug in/out can be avoided.

**Software Checklist**

- [Unity 2021.3.X or later](https://unity3d.com/get-unity/download) with Android Build Support Unity LTS (Long Term Support) version is recommended

- XR Plugin Management
- Latest [XREAL SDK for Unity](https://developer.xreal.com/download)
  - Sample `Interaction Basics`
  - Sample `AR Features` (Optional)
- XR Interaction Toolkit
  - Sample `Starter Assets`
  - Sample `Hands Interaction Demo` (Optional)
- AR Foundation
- XR Hands(Optional)
- Android SDK 10.0 (API Level 29) or later, installed using the SDK Manager in [Android Studio](https://developer.android.com/studio)
- [Visual Studio](https://visualstudio.microsoft.com/downloads/) (if you prefer other development environments that’s fine too)

### 2. Import XRI and AR Foundation

1. Install XR Interaction Toolkit from the Unity Registry in the Package Manager and import **Starter Assets** in Samples tab.

   ![image-20240531111307809](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111307809.png)

   There will be a warning about new input system, and requires you to restart the editor, just click yes. 

   ![image-20240612181604343](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612181604343.png)

2. Install AR Foundation from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html).

![image-20240529200949957](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240529200949957.png)

### 3. Import XREAL SDK for Unity

Open Window -> Package Manager, There are two import methods. 

* Add package from git url

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

   2.  Unzip folder `com.xreal.xr`

   3.  Select `package.json`，click Open

When importing the XREAL SDK into your Unity project, you’ll encounter several key components that facilitate the development of AR applications. Here’s a breakdown of the essential and optional elements:

* **Interaction Basics**: This is an essential component that provides assets to streamline the setup of basic rendering and interactions using controllers and hand gestures, compatible with the XR Interaction Toolkit. It includes prefabs and demo scenes designed to help you get started quickly with the XREAL SDK integration. This component is fundamental as it lays the groundwork for any XR application, ensuring that you have the necessary tools for basic interaction and rendering.

* **AR Features**: This is an optional component, recommended for those who require advanced AR functionalities in their projects. It includes sample scenes and other assets that demonstrate the integration of AR features supported by the XREAL SDK with AR Foundation. This part specifically supports Plane Detection, Image Tracking, Spatial Anchors, and Depth Meshing. Depending on the scope of your project, you can choose to import this component if your application will utilize complex AR features.

When setting up your project, start with the **Interaction Basics** to ensure all fundamental interaction mechanisms are in place. Then, depending on the AR features necessary for your project, consider importing the AR Features module to expand the application’s capabilities with advanced AR technology. This modular approach allows you to keep your project lightweight by only including the components necessary for your specific needs.

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

#### XREAL Specific Settings

In this section, we outline the key project settings available in the XREAL SDK, which allow developers to configure various aspects of stereo rendering, tracking, input sources, and device compatibility to optimize their AR applications for specific use cases.
Access these settings via `Edit > Project Settings > XR Plug-in Management > XREAL`:

![image-20241226190639916](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241226190639916.png)

* `Stereo Rendering Mode`
  * **Multi-view** (Recommended): This mode renders the left and right eye views in a single pass, reducing the overhead and potentially increasing performance.
  * **Multi-pass**: In this mode, the left and right eye views are rendered in separate passes, which can be less efficient but may be necessary for certain effects or compatibility.

* `Initial Tracking Type`
  * **MODE_6DOF** (Recommended for XREAL Air 2 Ultra): Allows tracking of both position and rotation in 3D space, providing a fully immersive experience.
  * **MODE_3DOF** (Recommended for XREAL Air/Air 2): Tracks only rotational movement, meaning the user can look around but not move within the space.
  * **MODE_0DOF**: No tracking of movement or rotation.
  * **MODE_0DOF-STAB**: No tracking but ensures a stable view, using some form of sensor data to reduce drift.

* `Initial Input Source`
  * **Hands**: Uses hand tracking for input.
  * **Controller**: Uses BeamPro or an Android phone as a controller for input.
  * **None**: No input source is used.

* `Virtual Controller`:  XREAL SDK allows the use of external devices, like BeamPro or Android phones, as virtual controllers. This setting defines the layout and functionality of the on-screen buttons for these controllers.

* `Support Multi Resume` (Recommended: Enabled)
  Enables dual-screen independent display mode, allowing the AR app to continue displaying in the glasses while the phone screen can switch to other 2D apps. When enabled:
  * The AR view remains active in the glasses even when the app is in background
  * Users can freely use other apps on their phone screen
  * Requires user permission on first launch
  * Enabled by default in XREAL Settings

  ![Dual Screen Display](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252FURzr2zc46xi9SY7CjA7z%252FCleanShot%25202024-03-12%2520at%252011.07.45.gif%3Falt%3Dmedia%26token%3Dfae8be23-1475-4633-9f12-6871c42388a1&width=768&dpr=4&quality=100&sign=58fec834f79e26dc2c1bdbf91f1b67a3efa81afca32b46d529c0107107e6f72a)

  For more detailed information about dual-screen display, see [Dual Screen Display](../Tools/DualScreenDisplay).

* `Support Devices` (Recommended: Enable both categories for maximum compatibility)
  * **XREAL_DEVICE_CATEGORY_REALITY**: Glasses with 6DoF tracking capabilities, such as the XREAL Air 2 Ultra.
  * **XREAL_DEVICE_CATEGORY_VISION**: Glasses with 3DoF tracking capabilities, such as the XREAL Air 2 and XREAL One Series.

* `Android Permissions` (Enable as needed for your app's functionality)
  Android permissions can be incorporated either by modifying the general Android Manifest.xml file or by utilizing the XREAL Settings interface for a more streamlined approach.
  * **VIBRATION**: Required for haptic feedback.
  * **CAMERA**: Required for RGB camera access and recording.
  * **AUDIO**: Required for audio recording features.


### 5. Remove Old NRSDK and Import New XREAL SDK

* Duplicate the assets in NRSDK you need into another folder and delete NRSDK folder in Assets.

* Replace the NRCameraRig with either the XR Interaction Setup prefab or the XR Interaction Hands Setup prefab, depending on your input source. You can find these prefabs in Project -> Assets -> Samples -> XREAL XR Plugin -> 3.0.0 -> Interaction Basics -> Prefabs.

  *  Use the **XR Interaction Setup** prefab if you plan to use controllers only.

  *  Use the **XR Interaction Hands Setup** prefab if you want to support hand gestures (with or without controllers).

  ![image-20241226120012761](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241226120012761.png)

  We recommend using these prefabs because they include specific adjustments optimized for XREAL AR environments.

* Remove NRInput in Hierarchy

* Add AR Session in Hierarchy by right click -> XR -> AR Session

  ![image-20240612191811692](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612191811692.png)

* Remove PlaneDetector.

* Add component AR Plane Manager to XR Origin(XR Rig).

  ![image-20240820164659586](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240820164659586.png)

* Then add a plane prefab, you can still use the previous one

  ![image-20240612192155293](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612192155293.png)

* That's it! you can now build and test! If you're familiar with the following steps, just ignore the tutorial and run your app on the device.

### 6. Building XREAL SDK App for Android

1. Access the **Build Settings** in **Menu -> File ->** **Build Settings**. Click the button "`Add Open Scene`" and make sure the current scene is checked. <img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FMoKBkh4ZItI620SjI3fB%2Fimage.png&width=768&dpr=4&quality=100&sign=d7917b19764c26c320b3e16d5d12fa8500a1a0f38bf3cb4e9075d724fce68853" alt="Your Image Description" class="center-image"/>


2. Click **Player Settings**. Customize the **Company Name** and **Product Name.** 
3. (Optional) Navigate to the **Android**> **Other Settings** panel to specify your build settings. As you have prepared **Step 3. Configure Project Settings,** you may leave the current configuration as it is. It is worth noting some of the other settings:

- **Multithreaded Rendering**: Enable this option to use multithreaded rendering. In most cases, both enabling and disabling this option is supported by XREAL SDK. However, for the scenes that contains **Overlay** content, you should disable multithreaded rendering. And When developing URP projects, if [single pass rendering](https://xreal.gitbook.io/nrsdk/development/tools/single-pass-stereo-rendering) is not used, it is best to also turn off Multithreaded rendering, otherwise tearing may occur.

- **Scripting Backend:** You must choose **IL2CPP** when building for ARM64 architecture. Note that starting from XREAL SDK 2.2, ARMv7 architecture is no longer supported.<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FijFH00KUpneZptdM1xaj%2Fimage.png&width=768&dpr=4&quality=100&sign=7c427706fce8673b8c60a167e55c1979693416747d46200b2b505fe0980786dd" alt="Your Image Description" class="center-image"/>



4. In **Build Settings** window, click **Build.**
5. Select the destination folder and wait until the building is finished.

### 7. Deploy to XREAL Device

- Connect your Phone / computing unit to your Mac / Windows PC. 

- Install your app through WiFi **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) or type-C cable after the build is successful.

- Disconnect the computing unit with your PC, and then connect it to the glasses.

- (Computing Unit only) If it is the first time you run this app, you need to authorize the app by some tools like [scrcpy](https://github.com/Genymobile/scrcpy).

- Launch your app along with the XREAL Light controller. For instructions on how to use the XREAL Light controller, please refer to [Controller](https://nrealsdkdoc2.readthedocs.io/en/dev/Docs/Unity_EN/Develop/Controller.html#controller-guide).

- Move around until XREAL SDK finds a horizontal plane and the detected plane will be covered with green grid.

- Click the Trigger button to put an XREAL logo object on it.

- (Optional) Use **Android Logcat** to view logged messages. We recommend using WiFi **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) to connect to your PC so that you do not have to be connected through the data cable most of the time.

- Enable developer options and USB debugging on your Phone / Computing unit. **Android Debug Bridge** [(adb)](https://developer.android.com/studio/command-line/adb) is enabled as default and does not require manual setting.
### 8. API Migration Reference

To help developers migrate their existing NRSDK applications to XREAL SDK, here's a comprehensive reference table of API changes. This table lists all the important changes in class names, APIs, callbacks, and configurations.

#### 8.1 Namespace/Class Name Renaming

| Old Name                          | New Name                          |
|:----------------------------------|:----------------------------------|
| NRVideoCapture                    | XREALVideoCapture                 |
| NRDeviceType                      | XREALDeviceType                   |
| NRPhotoCapture                    | XREALPhotoCapture                 |
| NRCaptureBehaviour                | XREALCaptureBehaviour             |
| NRCameraInitializer                | XREALCameraInitializer            |
| NativeDevice                      | XREALComponent                    |
| ControllerButton                  | XREALControllerButton             |
| NRAndroidPermissionsManager       | XREALAndroidPermissionsManager    |
| NRPointerRaycaster                | UnityEngine.EventSystems.PointerEventData or UnityEngine.XR.Interaction.Toolkit.XRRayInteractor |
| CanvasRaycastTarget               | TrackedDeviceGraphicRaycaster     |

#### 8.2 API Changes

| Old Interface | New Interface |
|--------|--------|
| MainThreadDispather.QueueOnMainThread | XREALMainThreadDispather.QueueOnMainThread |
| NRSessionManager.Instance.NRHMDPoseTracker.ChangeTo3Dof | XREALPlugin.SwitchTrackingTypeAsync() |
| NRDevice.Subsystem.GetDeviceType() | XREALPlugin.GetDeviceType() |
| NRDevice.Subsystem.AddEventListener | XREALPlugin.RegisterKeyEventCallback |
| NRDevice.Subsystem.GetElectrochromicLevel | XREALPlugin.GetElectrochromicLevel |
| NRFrame.targetFrameRate | XREALPlugin.SetTargetFrameRate |
| NRFrame.MonoMode | XREALPlugin.Get2D3DMode |
| NRSessionManager.Instance.IsRunning | XREALUtility.GetLoadedSubsystem&lt;XRSessionSubsystem&gt;().running |

#### 8.3 Callback System Changes

| Old Callback                     | New Callback                     |
|--------|--------|
| NRSessionManager.OnGlassesStateChanged | XREALPlugin.RegisterGlassesWearingCallback, XREALCallbackHandler.OnXREALGlassesWearingState |
| NRDevice.OnSessionSpecialEvent | XREALXRLoader.OnStartDisplaySubsystem, OnStartInputSubsystem |
| NRSessionManager.OnKernalError | XREALNativeCallbackHandler.NativeErrorCallback |
| NRGlassesInitErrorTip.OnPreComfirm | XREALErrorReceiver.OnXREALSDKFailPreComfirm |

#### 8.4 Configuration Changes

| Old Configuration | New Configuration |
|-------------------|-------------------|
| NRSessionManager.Instance.NRSessionBehaviour.SessionConfig.SupportMultiResume | XREALSettings.GetSettings().SupportMultiResume |
| NROverlay related components | Use Composition Layers from the XREAL XR Plugin Samples |
| IPoseProvider | Unity.XR.XREAL.Examples.IDataSource |

#### 8.5 Special Handling Instructions

* Singleton Pattern Changes:
  * For singletons that do not inherit from MonoBehaviour, use Unity.XR.XREAL.Singleton.
  * For singletons that inherit from MonoBehaviour, use Unity.XR.XREAL.SingletonMonoBehaviour.
* Performance Optimization:
  * QualitySettings.antiAliasing should be set before NRSwapChainManager::CreateTexture.
  * This can be set in the XREALXRLoader.OnStartInputSubsystem or XREALXRLoader.OnXRLoaderStart callbacks.
* Editor Related:
  * Import the XR Device Simulator from the XR Interaction Toolkit.
  * The GraphicRaycaster on the Canvas may affect event handling in editor mode.

#### 8.6 NRInput Migration

When migrating from NRInput, you have two options:

##### Option 1: Migrate to XR Interaction Toolkit Input Actions (Recommended)

This approach aligns with modern XR development practices and provides better compatibility with other XR platforms. Here's how to migrate:

1. Replace NRInput button checks with Input Actions:

```csharp
// Old NRInput code
if (NRInput.GetButtonDown(ControllerButton.TRIGGER)) {
    // Handle trigger press
}

// New Input Action code
[SerializeField]
private InputActionProperty m_TriggerAction;

private void OnEnable() {
    m_TriggerAction.action.performed += OnTriggerPressed;
}

private void OnTriggerPressed(InputAction.CallbackContext context) {
    // Handle trigger press
}
```

2. Replace controller state queries:

```csharp
// Old NRInput code
Vector3 position = NRInput.GetPosition();
Quaternion rotation = NRInput.GetRotation();

// New Input System code
public XRController controller;

void Update() {
    if (controller.inputDevice.TryGetFeatureValue(CommonUsages.devicePosition, out Vector3 position)) {
        // Use position
    }
    if (controller.inputDevice.TryGetFeatureValue(CommonUsages.deviceRotation, out Quaternion rotation)) {
        // Use rotation
    }
}
```

3. Replace haptic feedback:

```csharp
// Old NRInput code
NRInput.TriggerHapticVibration(duration, amplitude);

// New Input System code
public XRController controller;

void TriggerHaptic() {
    controller.SendHapticImpulse(0, amplitude, duration);
}
```

##### Option 2: Use XREALInput Compatibility Layer

If you prefer to maintain code similarity with your existing NRInput implementation, you can use the XREALInput class which provides a similar API:

1. Add the XREALInput script to your project and update your namespace references:

```csharp
// Old code
using NRInput;

// New code
using Unity.XR.XREAL.Samples;
```

2. Replace NRInput calls with XREALInput:

```csharp
// Old code
if (NRInput.GetButtonDown(ControllerButton.TRIGGER)) { }
Vector3 position = NRInput.GetPosition();
NRInput.TriggerHapticVibration(duration, amplitude);

// New code
if (XREALInput.GetButtonDown(ControllerButton.TRIGGER)) { }
Vector3 position = XREALInput.GetPosition();
XREALInput.TriggerHapticVibration(duration, amplitude);
```

The XREALInput class maintains similar method signatures and functionality to NRInput while using the new input system internally. This can be a good intermediate step if you want to gradually transition to the new input system.

Key differences to note:
- The XREALInput class uses Unity's new Input System internally
- Some advanced features may have slightly different implementations
- The class is provided in the Samples namespace as a migration aid

Choose the migration approach that best fits your project's needs:
- Option 1 if you're starting a new project or want to fully embrace the new input system
- Option 2 if you want to minimize code changes while still upgrading to the new SDK



## 9 Important Components 

* XREAL Session Manager
                                              ![image-20241226114952060](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241226114952060.png)

  * **Menu Action**: Input action reference for the XREAL Controller's Home button. When pressed, it can trigger system functions like exiting the application.

  * **Recenter Action**: Input action reference for recentering the controller. Activated by holding the designated button.

  * **Menu Prefab**: The system menu GameObject prefab that appears when pressing the Home button.

  * **Recenter Vibration Enabled**: Toggle to enable/disable haptic feedback when recentering the controller.

  * **Vibration Amplitude**: The strength of the haptic feedback when recentering (0-1 range). Default: 0.25

  * **Vibration Duration**: The duration of the haptic feedback in seconds when recentering. Default: 0.15

  * **Camera State Persistence Options**
    * These settings determine which camera transform properties should persist across application pause and resume cycles:
      * X Rotation Persistence: Preserves the camera's pitch angle
      * Y Rotation Persistence: Preserves the camera's yaw angle
      * Position Persistence: Preserves the camera's world position
    * When enabled, these options maintain the camera's last known state instead of resetting to default values upon application resume.

* XREALTrackingModeChangeListener
  * A component that provides smooth visual transitions when switching between different tracking modes (e.g., 3DoF to 6DoF) on XREAL devices.