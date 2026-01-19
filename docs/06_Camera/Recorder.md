# Recorder

## Recording Flow (Overview)

- Create two cameras in the scene: `WorldCamera` and `RGBCamera`.
- Render the output of the `RGBCamera` onto a Mesh in the virtual scene (as a texture), and tile that Mesh within the `RGBCamera`'s view.
- Use the `WorldCamera` to capture the complete virtual scene — including that tiled Mesh — from the final viewpoint to produce the mixed-reality recording.

## Script Description

### XREALCameraInitializer

- Responsible for aligning the virtual camera's intrinsics and extrinsics with the specified `DeviceType`.
- By aligning camera parameters, it ensures that the virtual scene's view, position, and lens parameters maintain the same physical relationship to the glasses / `RGBCamera`, resulting in a more natural mixed-reality composition.

## Common Configuration Combinations and Effects

The `LeftDisplay` (left-eye display) field of view (FOV) is typically much smaller than the `RGBCamera`'s FOV:

### 1 Use `LeftDisplay`'s FOV as the final recording view, with the RGB image tiled within the `RGBCamera`'s view

- Result: The `RGBCamera` output will be heavily cropped in the final frame, causing much of the RGB image to be cut off.
- Use case: When you want the recording to match the user's wearing experience (the display's native view).

### 2 Use the `RGBCamera`'s FOV as the final recording view, with the RGB image tiled within the `RGBCamera`'s view

- Result: The virtual scene will appear much smaller in the overall frame (because `RGBCamera` has a larger FOV), creating a significant difference from the user's wearing experience.
- Use case: When you prioritize the RGB-captured view and want to preserve as much of the real-world image as possible.

### 3 XREAL's current compromise (default)

- Use `LeftDisplay`'s FOV as the final recording view while tiling the `RGBCamera` image inside the `LeftDisplay` view.
- Pros: Balances the wearing experience with visibility of the RGB image; simple to implement.
- Cons: Precise virtual-real alignment is sacrificed (the `RGBCamera` image must be scaled/tiled to fit the `LeftDisplay`).

## Recommendations and Solutions

- For more accurate virtual-real alignment, call `XREALCameraInitializer.SwitchToEyeParam` to select different configuration parameters.
- If you want to prioritize the wearing experience, choose combination 1; if you want to prioritize preserving RGB content, choose combination 2.
- Combinations 1 and 2 are geometrically aligned in terms of virtual/real geometry (they differ only by cropping or scaling). You can adjust FOV, scale, and translation to improve visual consistency.

## Example Code — Using Combination 2

```csharp
public void StartVideoCapture()
{
    // other code...
    m_VideoCapture.StartVideoModeAsync(cameraParameters, OnStartedVideoCaptureMode, true);
}

void OnStartedVideoCaptureMode(XREALVideoCapture.VideoCaptureResult result)
{
    // other code...
    // Combination 2
    var behaviour = m_VideoCapture.GetContext().GetBehaviour();
    behaviour.CaptureCamera
        .GetComponentInChildren<XREALCameraInitializer>(true)
        .SwitchToEyeParam(XREALComponent.XREAL_COMPONENT_RGB_CAMERA);
    behaviour.RGBCamera
        .GetComponentInChildren<XREALCameraInitializer>(true)
        .SwitchToEyeParam(XREALComponent.XREAL_COMPONENT_RGB_CAMERA);
    // other code ...
}
```

## Quality Settings

XREAL provides three supported video recording quality levels:
- High: 1920×1080
- Middle: 1280×720
- Low: 640×360
These can be obtained via `XREALVideoCaptureUtility.SupportedResolutions`, and the desired resolution can be set in `CameraParameters`.
The code snippet is from **CaptureExample.cs**.

```
private Resolution GetResolutionByLevel(ResolutionLevel level)
{
    var resolutions = XREALVideoCaptureUtility.SupportedResolutions.OrderByDescending((res) => res.width * res.height);
    Resolution resolution = new Resolution();
    switch (level)
    {
        case ResolutionLevel.High:
            resolution = resolutions.ElementAt(0);
            break;
        case ResolutionLevel.Middle:
            resolution = resolutions.ElementAt(1);
            break;
        case ResolutionLevel.Low:
            resolution = resolutions.ElementAt(2);
            break;
        default:
            break;
    }
    return resolution;
}
    
    CameraParameters cameraParameters = new CameraParameters();
    Resolution cameraResolution = GetResolutionByLevel(resolutionLevel);
    cameraParameters.cameraType = CameraType.RGB;
    cameraParameters.hologramOpacity = 0.0f;
    cameraParameters.frameRate = NativeConstants.RECORD_FPS_DEFAULT;
    cameraParameters.cameraResolutionWidth = cameraResolution.width;
    cameraParameters.cameraResolutionHeight = cameraResolution.height;
    cameraParameters.pixelFormat = CapturePixelFormat.PNG;
    cameraParameters.blendMode = blendMode;
    // ...

    m_VideoCapture.StartVideoModeAsync(cameraParameters, OnStartedVideoCaptureMode, true);
```

