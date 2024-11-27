---
toc_min_heading_level: 2
toc_max_heading_level: 5
---
# Frequently Asked Questions

#### **1 Which Unity version is supported by NRSDK?**

Unity 2019.4.x and above. The LTS(long term support) Unity version is recommended.



#### **2 How is the compatibility between different NRSDK and Android versions?**

The following compatibility assumes the latest Nebula 2.3.4 is installed. Please set the target API level accordingly in `Project Settings -> Player -> Target API Level `when building the application.

| NRSDK       | Target API Level | Compatible Android Version |
| :---------- | :--------------- | :------------------------- |
| NRSDK 1.9.0 | 32               | Android 12 and below       |
| NRSDK 1.8.0 | 31               | Android 12 and below       |
| NRSDK 1.7.0 | 30               | Android 11 and below       |
| NRSDK 1.6.0 | 30               | Android 11 and below       |
| NRSDK 1.5.7 | 29               | Android 10 and below       |

It is recommended to upgrade NRSDK integrated with your Unity project to the latest in order to adapt to the newest Android version.  Alternatively, you may choose to configure `target API Level` to `API level 29`while building the application as a workaround to make your app run on newer Android systems and installed via [adb](https://developer.android.com/studio/command-line/adb) tools. However, this is not recommended as it doesn't meet Google Play's target API level requirement.



#### **3 What are supported Android phones for hand tracking?**

Hand Tracking has been fully tested on the following Android phones:

- XREAL Dev-Kit
- OnePlus：9R / 7T / 8T /  8 Pro 5G
- LG：V60 / V50S ThinQ 5G / V50 ThinQ 5G / G9 (Velvet 5G) / Wing
- SONY：Xperia 5 II / Xperia 1
- SAMSUNG：Galaxy Note20 5G / Galaxy S10+ / Galaxy S20+ 5G / Galaxy Z Fold 2 5G / Galaxy S21 5G / Galaxy Note20 Ultra / Galaxy Note10+ 5G / Galaxy A90 5G
- OPPO: Find X2 / Find x2 Pro / Find x3 Pro
- ZTE Axon 10 pro
- Black Shark 2 Pro

Hand tracking can potentially run on devices besides the above, although stability is not guaranteed. 



#### **4 How many different versions does NRSDK have? What are they?**

NRSDK has three different versions for each release. In most cases, you would get the normal version with the package name "NRSDKForUnityAndroid_x.x.x" from the [official website](https://developer.nreal.ai/download). Apart from that, NRSDK also has **Experimental** and **Enterprise** versions. 

**Experimental** version includes features under experimental phases as introduced under *EXPERIMENTAL* section in this documentation.

For the **Enterprise** version, it is possible to access glasses raw data(grayscale camera & IMU) through its APIs. 

If interested, please contact us through the [official website](https://www.nreal.ai/contact-us/) to get access.



#### **5 Through which API can I get the user's device (XREAL Light/Air) my apk is running on?**

```
NRDeviceType NRKernal.NRDeviceSubsystem.GetDeviceType()
```



#### 6 Error occurs when building an apk

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


### Todo

* 最低版本
    * AR Foundation 5.1.0
    * 2021.3.43 LTS,具体的小版本号需要测试
    
* 在sample中添加action button绑定到app/home按键的actions。

* ToDo 整理特殊接口
    * 配置API reference的自动生成工具

* development build，添加native的log。

* Migration：做成一个表格
    * 接口的迁移
    * 类名的改变
