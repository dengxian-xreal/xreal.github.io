# Camera

### Introduction

The XREAL XR Plugin utilizes Unity's XR Interaction Toolkit (XRI) for handling camera setups. This toolkit simplifies the process of setting up and configuring the camera for XR experiences, ensuring that the virtual environment is properly aligned with the real world.

### Setting Up the XR Origin 

If you add the XR Origin using Unity's default method, you may need to configure additional components manually. To simplify this process, we have provided two prefabs, `XR Interaction Setup` and `XR Interaction Hands Setup`, in the **Interaction Basics** sample. These prefabs include XR Origin and all necessary components such as the Event System and Input Action Manager, so you can choose the one that fits your input preferences.

You can find these prefabs in Project -> Assets -> Samples -> XREAL XR Plugin -> 3.0.0 -> Interaction Basics -> Prefabs.

*  Use the XR Interaction Setup prefab if you plan to use controllers only.

*  Use the XR Interaction Hands Setup prefab if you want to support hand gestures (with or without controllers).

![image-20240828172340919](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240828172340919.png)

### **Camera Component Settings**

Compared to default main camera in XR Origin, the one we provide has the following adjustments for more a immersive experience in AR applications:

* Clear Flags: Skybox -> Solid Color
* Background Color: Black
* Field of View: 60 -> 25
* Clipping Planes: 0.3 -> 0.1

![image-20240828173206394](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240828173206394.png)

### Reset Camera

If you're building a seated or standing experience, you can recenter Unity's world origin at the user's current position and orientation by calling the API `XREALUtility.GetInputSubsystem()?.TryRecenter()` . The **HelloMR** sample scene demonstrates how to reset the camera with this API in an app. 

### Further Reading

- [XR Interaction Toolkit Documentation](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest)
- [Unity Camera Documentation](https://docs.unity3d.com/Manual/class-Camera.html)