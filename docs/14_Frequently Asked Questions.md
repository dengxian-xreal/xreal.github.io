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

#### **3 How many different versions does NRSDK have? What are they?**

NRSDK has three different versions for each release. In most cases, you would get the normal version with the package name "NRSDKForUnityAndroid_x.x.x" from the [official website](https://developer.xreal.com/download). Apart from that, NRSDK also has **Experimental** and **Enterprise** versions. 

**Experimental** version includes features under experimental phases as introduced under *EXPERIMENTAL* section in this documentation.

For the **Enterprise** version, it is possible to access glasses raw data(grayscale camera & IMU) through its APIs. 

If interested, please contact us through the [official website](https://www.xreal.com/contact-us/) to get access.

#### 4 Through which API can I get the user's device (XREAL Light/Air) my apk is running on?

```
NRDeviceType NRKernal.NRDeviceSubsystem.GetDeviceType()
```

#### 5 Error occurs when building an apk

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

