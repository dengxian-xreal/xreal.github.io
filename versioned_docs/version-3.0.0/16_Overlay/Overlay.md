# Overlay

Composition Layers allow application developers to define areas in a scene or view that are composited separately from the normal 3D rendering. Rendering to a composition layer can provide sharper rendering compared to normal scene rendering. Device makers can also provide their own composition layers to support features like pass-through video or hardware-accelerated video.

![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/composition-layer-stack.png)

For more detailed information, please refer to https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/index.html

## Project setup

### prerequisites 

XREAL XR Plugin

### Installation

To install this package in Unity 2022.3+:

1. Open the project that you plan to use.

2. Click the following link: [com.unity.xr.compositionlayers](com.unity3d.kharma:upmpackage/com.unity.xr.compositionlayers).

   The Unity Package Manager window opens with the package name entered in the **Add package by name** dialog.

   ![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/install.png)

3. Click **Add**.

## Composition layer drawing order

The compositor in a device draws your layers in the assigned order starting from the most negative order value. In the following diagram, for example, the layers are composited in the order: -1, 0, 1, 2, 3. (The assigned values do not need to be consecutive.)

Layers are blended according to their alpha channel. A completely opaque area of a channel obscures the layers drawn before it.

Some types of composition layers have a position, orientation, and size within the scene. The compositor draws these types of layers in the assigned order without regard to their world position. Thus, if you have two quad composition layers in a scene, the quad with the higher order assigned is drawn on top of the other quad even when it is behind the other quad relative to the scene cameras.

![Layer drawing order](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/PaintersAlgorithm.png)

### Change layer order

Composition layers are drawn in order from most negative to most positive. You can set this drawing order in the Editor and modify it at runtime.

Composition layer drawing order does not depend on the camera or GameObject position. If you place two Composition Layers in a scene, the compositor draws them in the specified order no matter which layer is in front with respect to the current camera position.

Refer to [Set layer transparency](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/layer-transparency.html) for information about making layers behind the default scene layer visible. Refer to [Projection Eye Rig](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/projection-eye-rig.html) for information about making 3D objects in the scene display in layers in front of the default scene layer.

### Set the layer sort order in the Editor

The layer sort order determines the order in which layers are composited to the final display. In general, layers are composited in numerical order (most negative to most positive). Layers composited later in the order overwrite layers drawn earlier in the order. (However, a provider implementation can choose to use a different algorithm if it makes more sense for their device.)

You can set the sort order of an individual layer by editing the component’s **Layer Order** property in the **Inspector**. When you change this value, you must choose a order that isn't already used by another layer in the scene.

![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/Inspector_CompositionLayer.png)
*A cylinder layer with its \*Layer Order\* set to 6.*

Click the **Manage** button to open the **Layer Order** window, which lets you set the relative order of all of your composition layers. You can also open this window using the Unity Editor menu, **Window > XR > Composition Layers**.

![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/CompositionLayersWindow.png)
*The \*Layer Order\* window*

The Default Scene Layer is an implicit Projection Layer to which the Unity scene is rendered. It always has an order of 0. Layers with a negative order are behind the Default Scene Layer.

## Types of composition layers

To add a composition layer to a scene, you add a **Composition Layer** component to a GameObject in the scene and set its **Type** property. 

XREAL XR Plugin currently supports two composition layer types: 

- **Projection layer**: a layer represents planar projected images rendered from the eye point of each eye using a standard perspective projection. This layer requires two textures coming from the position of each eye.
- **Quad layer**: a flat, rectangular, "in-scene" display area. You can assign a texture to be rendered to this area, which could be a render texture to provide a dynamic display. Only the front face of the quad is visible.



## Source Textures component

Add a Source Textures extension component to specify textures to render to a layer. See [Add or remove a composition layer](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/add-layer.html). On Android, for Quad and Cylinder layer types, you can also specify an [Android Surface](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/source-texture-component.html#android-surface) as the source texture.

![image-20240708161115189](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240708161115189.png)
*The Source Textures component Inspector*

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

> Custom source rects and custom destination rects are not supported by composition layers of cube projection or equirect types.

:::Tip

##### NOTE

Different types of composition layers support different texture settings. Only the settings supported by the current type of layer are shown in the Inspector.

:::

## Custom source rects

You can use a custom source rect to define a rectangle subset of the source texture to use. The upper left of the source texture is coordinate (0,0) and the lower right is coordinate (1,1). Likewise, the full width and height are normalized to (1,1).

![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/SourceRect.png)
*A source rect of approximately (.3, .3, .3, .3)*

## Custom destination rects

You can use a custom destination rect to define where to place the texture within a composition layer. The upper left of the layer is coordinate (0,0) and the lower right is coordinate (1,1). Likewise, the full width and height are normalized to (1,1).

![img](https://docs.unity3d.com/Packages/com.unity.xr.compositionlayers@0.5/manual/images/DestinationRect.png)
*A destination rect of approximately (.25,.25,.5,.5)*

## Android Surface

In Unity, when you are working with Android development, you can interact with the Android Surface for rendering graphics or displaying content such as hardware decoded video. You can render Android Surface directly to a quad or cylinder composition layer by choosing Android Surface as the texture Source. You can install OpenXR package to have Android Surface supported out of the box. To obtain the Android Surface object to use for a layer, you must call OpenXR package API `GetLayerAndroidSurfaceObject` in a script.

Example script of getting the layer Surface Object using OpenXR package API - [GetLayerAndroidSurfaceObject(int layerId)](xref:UnityEngine.XR.OpenXR.CompositionLayers.OpenXRLayerUtility.GetLayerAndroidSurfaceObject(System.Int32))

```csharp
// Get Android Surface Object
IntPtr surface = IntPtr.Zero;
surface = OpenXRLayerUtility.GetLayerAndroidSurfaceObject(layer.GetInstanceID());
```

For a completed example, please see the `Sample External Android Surface Project` sample. You can import this sample into a project from the **Package Manager** window:

1. Open the **Package Manager** (menu: **Window > Package Manager**)
2. Select the **XR Composition Layers** package in the list of packages in your project.
3. Towards the bottom of the window, select the **Samples** tab.
4. Click **Import** next to the **Sample External Android Surface Project** item.

For more information about Android Surfaces, refer to:

- [Android Surface](https://developer.android.com/reference/kotlin/android/view/Surface)
- [XR_KHR_android_surface_swapchain](https://registry.khronos.org/OpenXR/specs/1.0/html/xrspec.html#XR_KHR_android_surface_swapchain)



### XREAL Static Texture Marker

The default configuration for the layer is dynamic. To switch it to a static layer, please integrate the following script.

![image-20240709110723739](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240709110723739.png)