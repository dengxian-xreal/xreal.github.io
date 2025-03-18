# Overlay

Composition Layers allow developers to define areas in a scene or view that are composited separately from normal 3D rendering, providing sharper rendering. XREAL XR Plugin supports Composition Layers, enabling features like video in stereo and mono modes, interactive WebViews, and WebXR integration.

![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/composition-layer-stack.png)

*Image source:* [*Unity Documentation*](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/index.html)*.*

For detailed information about Composition Layers in Unity, refer to [Unity Composition Layers Documentation](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/index.html).

## Project setup

### prerequisites 

* XREAL XR Plugin
* [Unity Composition Layers](com.unity3d.kharma:upmpackage/com.unity.xr.compositionlayers)

### Installation

To install the necessary Unity package:

1. Open your project in Unity 2022.3+.

2. Click the following link: [com.unity.xr.compositionlayers](com.unity3d.kharma:upmpackage/com.unity.xr.compositionlayers).

   The Unity Package Manager window opens with the package name entered in the **Add package by name** dialog.

   ![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/install.png)

3. Click **Add**.

4. Import the sample `Composition Layers`.

   ![image-20240902141838052](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240902141838052.png)

## Using Composition Layers with XREAL XR Plugin

XREAL XR Plugin currently supports the following composition layer types:

* **Projection layer**: Used for rendering planar projected images from each eye’s perspective.
* **Quad layer**: Used for rendering textures onto a flat, rectangular area in the scene.

## Working with Textures

To specify textures for rendering to a layer, use the **Source Textures** component in your XREAL project. Refer to the Unity documentation for detailed instructions on adding and configuring this component.

![image-20240708161115189](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240708161115189.png)
*The Source Textures component Inspector*

:::Tip

**NOTE**

Different types of composition layers support different texture settings. Only the settings supported by the current type of layer are shown in the Inspector.

:::

| Property:                                                    | Function:                                                    |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Source                                                       | Specify the source of the texture - Local Texture or Android Surface. |
| Target Eye                                                   | Specify whether one texture is used for both eyes or an individual texture is used for each eye. Only shown for layer types that support stereo. |
| Texture (Local Texture Only)                                 | Specify a texture to use. Click Select to choose a texture or drag-and-drop a texture onto the control with your mouse. |
| Resolution (Android Surface Only)                            | Specify the resolution for the Android Surface with X for width, and Y for height. |
| Maintain Aspect Ratio (Quad/Cylinder Layer/Android Surface Only) | Crop the layer to fit the aspect ratio of the texture.       |
| In-Editor Emulation (Projection Layer Only)                  | Specify whether the left or right eye texture is shown in the Unity Editor. |
| Custom Rects                                                 | Enable to specify custom rects within the source and destination textures. |
| Source Rects1                                                | Specifies a rectangle within the source texture to copy to the destination rather than copying the entire texture. Use your mouse to set the rect values or enter them into the x, y, w, and h fields. |
| Destination Rects1                                           | Specifies a target rectangle within the destination texture to which to write the source texture rather than filling the entire destination texture. Use your mouse to set the rect values or enter them into the x, y, w, and h fields. |

## XREAL Static Texture Marker

The default configuration for the layer is dynamic. To switch it to a static layer, you can integrate the XREAL Static Texture Marker script. 

![image-20240709110723739](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240709110723739.png)

## Samples

Below are examples of how to use different Overlay components in your projects. These samples demonstrate the basic setup and usage of each feature.

| Sample Name             | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **Overlay RGBCamera**   | Captures RGB data and overlays it within your AR/VR environment. |
| **Overlay StereoVideo** | Plays stereo videos that are displayed separately for each eye. |
| **Overlay Texture**     | Applies textures to surfaces within your scene.              |
| **Overlay Video**       | Plays video content as an overlay in your scene.             |
| **Overlay WebView**     | Displays web content in your AR/VR environment.              |
| **Overlay WebXR**       | Extends `OverlayWebView` with XR interaction capabilities.   |



