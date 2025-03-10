---
toc_min_heading_level: 2
toc_max_heading_level: 5
---
# Frequently Asked Questions

#### **1 Which Unity version is supported by XREAL SDK?**

Unity 2021.3.x and above. The LTS(long term support) Unity version is recommended.




#### **2 The app is not being able to be opened through MyGlasses, showing "Currently, your app is not supported on this device"**
Please add the following permission in the **AndroidManifest.xml**:
```
<meta-data android:name="com.nreal.supportDevices" android:value="1|NrealLight|2|NrealAir" />
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

