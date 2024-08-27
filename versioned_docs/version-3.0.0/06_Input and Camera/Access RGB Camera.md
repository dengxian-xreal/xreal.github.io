# Access RGB Camera

## Device Compatibility

Currently, only the **XREAL Light** glasses are equipped with an RGB Camera.

## Developer Guide

### Import the XREAL SDK and Sample 

Ensure your environment is configured as per the [Getting Started with XREAL SDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android).

Import the **Camera Features** sample from the Package Manager.

![image-20240826182345288](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240826182345288.png)

### Open the Sample Scene

Navigate to the RGBCamera sample in the Unity Project window: `Assets > Samples > XERAL XR Plugin > 3.0.0 >Camera Features > RGBCamera`

### **How to Access **RGB and YUV Camera Images

The RGB camera supports two image formats: **RGB_888** and **YUV_420_888**. You can switch between these formats based on your needs.

**Retrieving RGB_888 Format**

To retrieve the image texture in RGB_888 format, use the following code:

```
var texture = m_RGBCameraTexture.GetRGBFormatTexture();
if (texture != null)
{
    m_RGBImage.texture = texture;
}
```

**Retrieving YUV_420_888 Format**

For the YUV_420_888 format, use the code below to access and display the Y, U, and V textures:

```
var yuvTextures = m_RGBCameraTexture.GetYUVFormatTextures();
if (yuvTextures[0] != null)
{
    m_YUVImage.material.SetTexture("_MainTex", yuvTextures[0]);
    m_YUVImage.material.SetTexture("_UTex", yuvTextures[1]);
    m_YUVImage.material.SetTexture("_VTex", yuvTextures[2]);
}
```



### 如何使用RGB Camera录制视频

```
```



### Inspect the Sample Code

- See `CameraCaptureController.cs` , located in `Assets/NRSDK/Demos/RGBCamera/Scripts/CameraCaptureController.cs` for an example on how to get the texture of RGB Camera.

```
public RawImage CaptureImage;

 private void Start()
 {
     RGBCamTexture = new NRRGBCamTexture();
     CaptureImage.texture = RGBCamTexture.GetTexture();
     RGBCamTexture.Play();
 }
```

- See `VideoCapture2LocalExample.cs`, located in `Assets/NRSDK/Demos/Record/Scripts`for an example on how to implement video capture

### Build and Run the Sample App

- Audio record needs the permission of “android.permission.RECORD_AUDIO”, Add it to your “AndroidManifest.xml” file in “Assets/Plugin”.
- The **Previewer** is used to preview live images in real time, for debugging purposes. Click the **APP** key of the controller to show or hide it.
- Click the **Start** button to start video capture.
- Click the **Stop** button to stop video capture. It will save the video file to **“Application.persistentDataPath”** path.
