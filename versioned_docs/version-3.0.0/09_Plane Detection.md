# Plane Detection

## Introduction

Plane detection is an essential feature in AR applications, allowing the recognition and tracking of real-world surfaces where virtual objects can be placed. Using Unity's XR Interaction Toolkit and AR Foundation, developers can easily implement plane detection to enhance their AR experiences.

## Capabilities

The plane detection feature provides the following capabilities:

- **Real-Time Plane Detection**: Recognizes horizontal and vertical planes in real-time.
- **Surface Tracking**: Continuously tracks the detected planes as the device moves.
- **Visual Feedback**: Visualizes detected planes with custom prefabs.
- **Interaction Support**: Enables interaction with detected planes for placing and manipulating virtual objects.

## Requirements

To implement plane detection, ensure you have the following setup:

- **Unity Editor**: Version 2021.3 or later.
- Packages

  - XR Interaction Toolkit
  - AR Foundation

## Developer Guide

### 1. Basic Setup

1. Create a new project in Unity.

> Need help setting up? Try [Getting Started with NRSDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android) first ⚠️

2. Install AR Foundation from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html).

![image-20240529200949957](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240529200949957.png)

3. Install XR Interaction Toolkit from the Unity Registry in the Package Manager and import Starter Assets in Samples tab.

   ![image-20240531111307809](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111307809.png)

4. Create a new scene 

5. Add an `XR Origin(XR Rig)` GameObject to the scene: 

   In the **Project** window, find Assets/Samples/XR Interaction Toolkit/3.0.1/Starter Assets/Prefabs/XR Origin (XR Rig).prefab, and drag it to **Hierarchy** window. This will add the necessary components for AR interactions.

   ![image-20240531111129519](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240531111129519.png)

6. Add an `AR Session` GameObject to the scene: in the **Hierarchy** window, right-click and select **XR** > **AR Session**. This will add an **AR Session** component necessary for managing the AR lifecycle.

7. Go to **Edit > Project Settings > XR Plug-in Management**, enable the XREAL XR plug-in.

### 2. Set Up Plane Detection

#### Configure Plane Detection

1. Select the **XR Origin(XR Rig)** in the **Hierarchy** window.
2. Click **Add Component** in the **Inspector** window.
3. Search for and add the **AR Plane Manager** component.
4. In the **AR Plane Manager** component, you can set the **Plane Prefab** to a custom prefab for visualizing detected planes.

5. For a quick test, you can use the [prefab](./assets/AR%20Feathered%20Plane.prefab) provided in the [arfoundation-samples repository](https://github.com/Unity-Technologies/arfoundation-samples). 

    ![image-20240605161125169](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240605161125169.png)

### 3. Scripting Plane Detection(Optional)

Create a new C# script to handle plane detection and AR interactions.

```
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class PlaneDetection : MonoBehaviour
{
    private ARPlaneManager arPlaneManager;

    void Start()
    {
        arPlaneManager = GetComponent<ARPlaneManager>();
    }

    void Update()
    {
        foreach (ARPlane plane in arPlaneManager.trackables)
        {
            // Perform actions with detected planes
            Debug.Log($"Detected plane: {plane.trackableId}");
        }
    }
}
```

#### Attach Script to AR Session Origin

1. Select the **AR Session Origin** in the **Hierarchy** window.
2. Click **Add Component** in the **Inspector** window.
3. Attach the `PlaneDetection` script to the **AR Session Origin**.

### 4. Testing Plane Detection

1. Connect your compatible device.
2. Switch the build target to android (File > Build Settings).
3. Build and run the project on your device.

You should now see detected planes visualized in your AR application. You can use these planes to place virtual objects or interact with the real-world environment.

## Conclusion

This guide covers the basics of setting up plane detection using the XR Interaction Toolkit and AR
