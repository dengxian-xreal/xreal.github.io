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
    建议使用较新的Unity版本，可以规避大部分设置问题。以下是最低版本，或许需要手动配置AR foundation、XRI、gradle的版本。
    * Unity 2021.3.x LTS,具体的小版本号需要测试
    * AR Foundation 5.0.x  具体的小版本号需要测试 
    * XRI 2.4.x 具体的小版本号需要测试
    > (Unity2021.3较老的版本，默认的ARF和XRI版本都过老，需要手动在manifest里面修改升级，而不是从package Manager里升级)
    
* 在sample中添加action button绑定到app/home按键的actions。

* ToDo 整理特殊接口
    * 配置API reference的自动生成工具

* development build，添加native的log。

* Migration：做成一个表格
    重命名
    * 接口的迁移
    * 空间/类名的改变

* 旧项目迁移的sample，放一些特殊的类/脚本（NRDebugger/NRInput）。optional


#### 如何在Unity Editor中调试应用
1. 在Package Manager中安装XR device simulator

<img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241128173704554.png"/>

2. 将Prefab拖入需要调试的场景中

   ![image-20241128173940783](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241128173940783.png)



![image-20241202110957307](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202110957307.png)

### URP Project

1. 安装 URP 包

	1.	打开 Unity 编辑器。
	2.	进入菜单 Window > Package Manager。
	3.	在 Package Manager 中，搜索 Universal RP 或 Universal Render Pipeline。
	4.	点击 Install 安装 URP 包。

2. 创建和配置 URP 渲染管线资产

	1.	在 Project 窗口，右键点击任意文件夹，选择：
Create > Rendering > URP Asset (with Universal Renderer)。
	•	这会生成两个文件：URP Asset 和 Renderer Asset。
	2.	打开 Edit > Project Settings > Graphics，将 Scriptable Render Pipeline Settings 的字段设置为刚刚创建的 URP Asset。
	3.	进入 Edit > Project Settings > Quality，对于每一个质量设置（如 Low、Medium、High），将 Render Pipeline Asset 设置为你的 URP Asset。

3. 更新材质到 URP

URP 使用与 Built-in 不同的 Shader，因此材质需要更新。

在project中找到需要更新的材质（显示为玫红色），按下command，逐个点击选中。

![image-20241202143625789](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202143625789.png)

 	1.	选择菜单 Edit > Rendering >Materials > Convert Selected Built-in Materials to URP
	1.	•	这会自动将项目中的材质转换为兼容 URP 的材质。
	•	**注意：**可能需要手动调整某些材质效果以匹配原始外观。

https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@7.1/manual/InstallURPIntoAProject.html

![image-20241202141736565](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202141736565.png)

