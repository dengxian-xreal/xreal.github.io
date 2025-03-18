---
toc_min_heading_level: 2
toc_max_heading_level: 5
---
# Frequently Asked Questions

#### 1 Which Unity version is supported by NRSDK?

Please refer to [Getting Started with NRSDK](02_Getting%20Started%20with%20NRSDK.md).

#### 2 What are supported Android phones for hand tracking?

Hand Tracking has been fully tested on the following Android phones:

**Device compatibility**

To ensure optimal algorithm performance, it is recommended to use specific smartphone models and versions, as different manufacturers and Android versions may affect the algorithm's effectiveness.

- **Samsung S22**: OneUI 5.1
- **Samsung S23**: OneUI 5.1, OneUI 6.0
- **HUAWEI P60 Pro**: HarmonyOS 4.0.0
- **OPPO Find X6 Pro**: Android 13

Hand tracking can also run on devices besides the above, the stability however is not guaranteed. For the full compatibility list, please refer to[ Device Compatibility](https://docs.xreal.com/XREALDevices/Compatibility).

**Influence of Unity Packaging on APK:**

The current gesture recognition application supports **only Android SDK Target API 29**. Higher versions of the API may activate enhanced security restrictions, which can affect access to SNPE resources.


#### 3 Through which API can I get the user's device (XREAL Light/Air) my apk is running on?

```
NRDeviceType NRKernal.NRDeviceSubsystem.GetDeviceType()
```

#### 4 Error occurs when building an apk

```
UnityException: Error
mainTemplate.gradle file is using the old aaptOptions noCompress property definition which does not include types defined by unityStreamingAssets constant.
UnityEngine.GUIUtility:ProcessEvent(Int32, IntPtr, Boolean&) (at /Users/bokken/build/output/unity/unity/Modules/IMGUI/GUIUtility.cs:189)
```

Modify the file mainTemplate.gradle: 

```
aaptOptions {
        noCompress = ['.unity3d', '.ress', '.resource','unityStreamingAssets', '.obb'**STREAMING_ASSETS**]
    }**SIGN**
```

#### 5 Flickering occurs when using URP Project

You can try the following steps to resolve this issue:
1. Disable multi-threaded rendering
   ![image-20241212114352030](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241212114352030.png)
2. Use [Single Pass Rendering](./13_Rendering/1_Single%20Pass%20Stereo%20Rendering.md)
3. Set Quality as Performant

![image-20241212114245632](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241212114245632.png)

#### Control Glasses 

If the glasses' firmware is in an abnormal state, the SDK will consistently fail to start successfully. If you previously skipped the OTA reminder, please remember to manually check the OTA version and update it.

![image-20241202155925772](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202155925772.png)