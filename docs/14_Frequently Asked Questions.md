---
toc_min_heading_level: 2
toc_max_heading_level: 5
---
# Frequently Asked Questions

#### **1 Which Unity version is supported by XREAL SDK?**

Refer to: [Getting Started with XREAL SDK](01_Getting%20Started%20with%20XREAL%20SDK.md)

#### **2 The app is not being able to be opened through MyGlasses, showing "Currently, your app is not supported on this device"**
Please add the following permission in the **AndroidManifest.xml**:
```
<meta-data android:name="com.nreal.supportDevices" android:value="1|XrealLight|2|XrealAir" />
```
#### **3 Error occurs when building an apk**

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

#### **4 How to debug the application in Unity Editor**

1. Install XR device simulator in Package Manager

<img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241128173704554.png"/>

2. Drag the Prefab into the scene you need to debug

   ![image-20241128173940783](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241128173940783.png)



![image-20241202110957307](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202110957307.png)

#### **5 URP Project**

1. Install URP package

	1.	Open Unity Editor.
	2.	Enter Menu Window > Package Manager.
	3.	In Package Manager, search for Universal RP or Universal Render Pipeline.
	4.	Click Install to install the URP package.

2. Create and configure URP render pipeline assets

	1.	Right-click any folder in the Project window and select:
Create > Rendering > URP Asset (with Universal Renderer).
	•	This will generate two files: URP Asset and Renderer Asset.
	2.	Open Edit > Project Settings > Graphics, set the Scriptable Render Pipeline Settings field to the URP Asset you just created.
	3.	Enter Edit > Project Settings > Quality, for each quality setting (e.g., Low, Medium, High), set the Render Pipeline Asset to your URP Asset.

3. Update materials to URP

URP uses different Shaders than Built-in, so materials need to be updated.

Find the materials that need to be updated (displayed as pink) in the project, select them one by one by holding down the command key.

![image-20241202143625789](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202143625789.png)

 	1.	Select Menu Edit > Rendering >Materials > Convert Selected Built-in Materials to URP
	1.	This will automatically convert the materials in the project to URP compatible materials.
	
    **Note:** You may need to manually adjust certain material effects to match the original appearance.

https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@7.1/manual/InstallURPIntoAProject.html

![image-20241202141736565](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241202141736565.png)

#### **6 Notes for Developers Using Samsung S24 for AR App Development**

##### 1. Device Compatibility

- **XREAL SDK 3.0.0** is confirmed to be compatible with the Samsung S24.
- Currently, we only test and guarantee compatibility on Samsung flagship models. Compatibility with other Android devices is not guaranteed.

##### 2. Required App

- Developers must install the **ControlGlasses app** on their Android device; otherwise, AR applications will not run properly.
- **Download link**: Download the version-matching ControlGlasses from the corresponding [SDK release notes](https://docs.xreal.com/category/release-note).

##### 3. Runtime Behavior

- Once the AR glasses are connected to the S24, the ControlGlasses app will automatically launch and switch the glasses to **3D mode** (split screen, with one half displayed per eye—this is normal).
- Developers can choose to:
  - Configure the app to auto-launch (takes effect after reconnecting the glasses)
  - Or manually start the app from the phone

##### 4. Important Setting

- Make sure to **disable Samsung DeX mode** during development, as it may affect app display and behavior.

#### **7 Capturing Debug Logs with ADB Logcat**

1. Check the WiFi IP address of your Android device / Beam Pro;  
2. Connect the device to your PC via USB
3. Open command prompt, enter the command: `adb tcpip 5555 `
4. Execute command: `adb connect [IP address]`. This IP address is the WiFi IP of your device; 
5. Disconnect your Android device; 
6. Terminate all XREAL applications; 
  	* `adb shell ps|findstr [package keywords]` (If you use Mac: adb shell ps|grep) to retrieve the target package name
  	* `adb shell am force-stop [package name] `
7. Execute: `adb logcat > logcat.txt` in terminal
8. Connect the AR glasses to your device, launch the server application, and reproduce the issue
9. Press Ctrl + C to stop log capture and provide the logcat.txt file


#### **8 How to enable developer mode on BeamPro**

In BeamPro, you can enable developer mode by clicking the glasses icon 10 times in the top left corner of MyGlasses without connecting the glasses. This will open the developer mode, enter the developer debugging page, and select "select other MR App" to specify the application here.