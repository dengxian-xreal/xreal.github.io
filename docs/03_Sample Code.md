# Sample Code
The XREAL SDK includes numerous sample scenes and code examples to help you understand and implement AR features in your applications. These samples demonstrate the capabilities of the SDK and provide reference implementations for various functionalities.
## Sample Code Organization

In the XREAL SDK plugin, sample code is provided in two forms:

* Demo Unity scenes that you can run directly
* C# script implementations that you can reference in your own code

The samples are organized into several categories in the plugin structure:

## Interaction Basics
Examples for input handling and interaction with virtual objects.
| Feature | Unity Scene | Sample Code |
| :------ | :---------- | :---------- |
| [Controller Basics](01_Getting%20Started%20with%20XREAL%20SDK.md) | HelloMR | HelloMR |
| [Display Stability Optimization](13_Rendering/0_Warping.md) | FocusPlane | FocusPlanePanel |
| [Render Metrics](13_Rendering/3_Render%20Metrics.md) | Metrics | MetricsPanel |
| RayLaser | XREALLaser | XREALLaserReticle<br />XREALLaserVisual |
| StereoVideo| StereoVideo | StereoVideoDemo |

## AR Features
Examples demonstrating core AR capabilities such as tracking, detection, and meshing.
| Feature | Unity Scene | Sample Code |
| :------ | :---------- | :---------- |
| [Image Tracking](08_Image%20Tracking/intro.md) | BasicImageTracking | TrackedImageInfoManager |
| [Plane Detection](09_Plane%20Detection.md) | PlaneDetection | ARFeatheredPlaneMeshVisualizer |
| [Mesh Classification](10_Depth%20Mesh/MeshClassification.md) | MeshClassification | MeshClassificationFracking |
| [Basic Meshing](10_Depth%20Mesh/NormalMesh.md) | NormalMesh | MeshSaver<br />MeshSaveUtility<br />MeshBlockInfo<br />MeshChangeStateInfo |
| [Spatial Anchor](11_Spatial%20Anchor/0_intro.md) | Anchors | Anchors.5(For ARF 5.0)<br />Anchors.6(For ARF 6.0)<br />AnchorInfo<br />ConfirmDialog<br />MapQualityBar<br />MapQualityIndicator |
| [RGBCamera](06_Camera/Access%20RGB%20Camera.md) | RGBCamera | ARFoundationCameraSample |
## Camera Features
Examples for accessing and utilizing the RGB camera.
| Feature | Unity Scene | Sample Code |
| :------ | :---------- | :---------- |
| [Video Recording & Photo Capture](06_Camera/Access%20RGB%20Camera.md)  | RGBCameraAndCapture | CaptureExample |
| [Accessing RGB Camera Data](06_Camera/Access%20RGB%20Camera.md) | RGBCameraAndCapture | RGBCameraExample |
| [First Person View](12_Tools/1_First%20Person%20View.md) | FirstPersonViewStreamingCast | FirstPersonStreammingCast |

## Other Examples
Additional demos and experimental features.
| Feature | Unity Scene | Sample Code |
| :------ | :---------- | :---------- |
| [XREAL Marker](08_Image%20Tracking/Marker.md) | MarkerTracking | MarkerImageExampleController |


## Accessing the Sample Code

To access these sample projects in your Unity environment:

1. Open your Unity project

2. Go to Window > Package Manager

3. Find and select XREAL XR Plugin from the package list

4. Navigate to the Samples tab

5. Click the Import button next to any sample you want to use in your project

![image-20250305165653216](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250305165653216.png)

You can import individual samples based on the specific feature you want to implement, or import all samples to explore the full range of XREAL SDK capabilities.



## Using the Sample Code

To use these samples:
- Open the XREAL SDK in Unity
- Navigate to the relevant scene in the project panel
- Run the scene to see the feature in action
- Review the attached scripts to understand the implementation
Each sample demonstrates a specific feature or capability of the XREAL SDK and can serve as a starting point for implementing similar functionality in your own applications.
For detailed information on specific features, refer to the corresponding documentation sections linked in the table above.