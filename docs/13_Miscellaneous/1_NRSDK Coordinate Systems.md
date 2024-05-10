# NRSDK Coordinate Systems

### NRSDK Coordinate Systems

This document describes the coordinate systems of the Xreal Glass used in the NRSDK for Unity. It also describes the corresponding interfaces for getting extrinsics between the glass components, camera image data, and camera intrinsics, as well as conversion to other definition of coordinate systems.Note that this document is applicable to the NRSDK for Unity only, and does not apply to other types of NRSDK.

## Unity-based Coordinate Systems

In the NRSDK for Unity, in terms of coordinate system's definition and the corresponding extrinsics, we use definition of the Unity coordinate system (left handed).

### XREAL Glass Components and Their Unity-based Coordinate Systems

- The XREAL glasses consists of the following key components

1. 2 x Grayscale Cameras
2. 2 x Display Cameras
3. Head / IMU
4. RGB Camera

- The placement of the above components and their corresponding coordinate systems, as defined in NRSDK for Unity, are as follows

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FmoBbnF78Sd4BXJJQ5UQo%2Fimage1.png&width=768&dpr=4&quality=100&sign=712f713acc39ea473652f6cf13b6d913afa35d0b439ea6cc4f5d1a509da36871)

- The global coordinate frame of the tracking system is as follows

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FQzGoZ9ahy1U6MmrpZCNc%2Fimage2.png&width=768&dpr=4&quality=100&sign=adcf13ac92f50bf516c535430ff3dbfe0628d400ea5b1982b8155d8faf5d3630)

### Interface for Head Pose

- The following Interface returns the 6dof head pose with respect to the global frame, as defined above.

```
// Get the pose of device in unity world coordinate.
// "NRCameraRig" transform in Unity.
Pose headpose = NRFrame.HeadPose;
```

### Interface for Extrinsics Between Components

- The following Interface returns the 6dof extrinsics, as a transformation matrix, of a Device's coordinate frame expressed in the Head coordinate frame.

```
public class NRFrame
{
    public static Pose GetDevicePoseFromHead(NativeDevice device);
}
```

- For example, given a vector's coordinate 𝑃𝑑*P**d* in the Device's coordinate frame, and using the extrinsic transformation matrix ℎ𝑇𝑑*h**T**d* obtained as above, we can compute the vector's coordinate 𝑃ℎ*P**h* in the Head coordinate frame, by 𝑃ℎ=ℎ𝑇𝑑∗𝑃𝑑*P**h*=*h**T**d*∗*P**d*

#### Example 1: Getting the Extrinsics of RGB Camera From Head

The following example code gets the extrinsic transformation of RGB Camera in Head, and transforms a point's coordinate from the RGB camera frame to the Head frame.

```
// Get Pose RGBCamera From Head
Pose camPos = NRFrame.GetDevicePoseFromHead(NativeDevice.RGB_CAMERA);
// Translate Pose to Matrix4x4.
Matrix4x4 Head_T_cam = Matrix4x4.TRS(camPos.position, camPos.rotation, Vector3.one);

// Transform a vector from camera space to head space
Vector3 pInCam = new Vector3(1, 0, 0);
Vector3 pInHead = Head_T_cam.MultiplyPoint(pInCam);
```

#### 

## Converting to OpenCV-based Coordinate Systems

For computer vision algorithm developers, it is often convenient to handle quantities expressed in the OpenCV coordinate system (right handed). Hereafter, we describe how to convert the aforementioned Unity coordinate systems and their corresponding extrinsics to the OpenCV convention. We also describe the definitions and interfaces for image data and camera intrinsics.

### Xreal Glass Components and Their OpenCV-based Coordinate Systems

- In the OpenCV convention, the Xreal Glass components and their corresponding coordinate systems are as follows

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FPF8O5uN0ngEyOgGQ4AOx%2Fimage3.png&width=768&dpr=4&quality=100&sign=7e0f1afd9d91c079b91a474dc65ee8396778d7a4368269f355d726fc01903708)

### Converting Extrinsics: From Unity to OpenCV

- The definition difference between Unity and OpenCV coordinate systems for a camera is as follows

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FYtgSwmv7tptAW7Wx3QO9%2Fimage4.png&width=768&dpr=4&quality=100&sign=ae6193e40a1669582cdd25ed27ae1316cbec0967bf98123ca96b9fc4bedaef84)

- Note that only the y-axis needs to be negated between these two conventions. Therefore, given an extrinsic transformation defined under the Unity coordinate systems, we can obtain the equivalent transformation defined under the OpenCV, by using the following utility function

```
public static Matrix4x4 UnityToCVMatrix(Matrix4x4 unityA_T_unityB)
{
    Matrix4x4 cv_T_unity = Matrix4x4.Scale(new Vector3(1, -1, 1));
    Matrix4x4 cvA_T_cvB = cv_T_unity * unityA_T_unityB * cv_T_unity.inverse;
    return cvA_T_cvB;
}
```

#### Example 2: Converting the Extrinsics of RGB Camera From Head to OpenCV

The following example code first gets the extrinsic transformation of RGB Camera in Head, under the Unity coordinate systems as described earlier, and then converts it to the OpenCV coordinate systems by using the above utility function.

```
// Get Pose RGBCamera From Head
Pose camInHead = NRFrame.GetDevicePoseFromHead(NativeDevice.RGB_CAMERA);
// Translate Pose to Matrix4x4.
Matrix4x4 unityHead_T_unitycam = 
        Matrix4x4.TRS(camInHead.position, camInHead.rotation, Vector3.one);
// Convert from Unity to OpenCV
Matrix4x4 cvHead_T_cvcam = UnityToCVMatrix(unityHead_T_unitycam);
```

#### Example 3: Getting the Extrinsics of Right Grayscale Camera From Left Grayscale Camera in OpenCV

The following example code shows how to get the extrinsic transformation between the two Grayscale cameras and convert it to the OpenCV coordinate systems.

```
// Get Extrinsic Left Grayscale Camera From Head
Pose lCamPos = NRFrame.GetDevicePoseFromHead(NativeDevice.LEFT_GRAYSCALE_CAMERA);
Matrix4x4 Head_T_Lcam = Matrix4x4.TRS(lCamPos.position, lCamPos.rotation, Vector3.one);
// Get Extrinsic Right Grayscale Camera From Head
Pose rCamPos = NRFrame.GetDevicePoseFromHead(NativeDevice.RIGHT_GRAYSCALE_CAMERA); 
Matrix4x4 Head_T_Rcam = Matrix4x4.TRS(rCamPos.position, rCamPos.rotation, Vector3.one);
// Calculate Extrinsic Right Camera From Left
Matrix4x4 unityLcam_T_unityRcam = Head_T_Lcam.inverse * Head_T_Rcam;
// Convert Unity Extrinsic to CV
Matrix4x4 cvLcam_T_cvRcam = UnityToCVMatrix(unityLcam_T_unityRcam);

// Transform a vector from right camera to left camera
Vector3 pInRCam = new Vector3(1, 0, 0);
Vector3 pInLCam = cvLcam_T_cvRcam.MultiplyPoint(pInRCam);
```

### Image Pixel Coordinate System and Camera Intrinsics in OpenCV

- The definition of the image pixel coordinates and the camera intrinsics in the NRSDK follows the OpenCV convention.
- The image data is stored row-wise in memory as follows

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FyVI6gOwuKJJK6nKVtvnj%2Fimage5.png&width=768&dpr=4&quality=100&sign=c021ff592f96d60f1aa0488f501cdb1e39c9471a658d669524ac10faf681b4ff)

- The camera intrinsic matrix 𝐾*K* is composed of the focal lengths 𝑓𝑥*f**x* and 𝑓𝑦*f**y*, and the principal point 𝑐𝑥*c**x* and 𝑐𝑦*c**y*, expressed in pixel units. 

𝐾=[𝑓𝑥0𝑐𝑥0𝑓𝑦𝑐𝑦001]*K*=*f**x*000*f**y*0*c**x**c**y*1

- The distortion parameters contain radial coefficients 𝑘1,𝑘2,𝑘3,𝑘4,𝑘5*k*1,*k*2,*k*3,*k*4,*k*5 and tangential coefficients 𝑝1,𝑝2*p*1,*p*2. The order of NRDistortionParams is (𝑘1,𝑘2,𝑝1,𝑝2,𝑘3,𝑘4,𝑘5)(*k*1,*k*2,*p*1,*p*2,*k*3,*k*4,*k*5).

### Interface for Camera Image Data

- Raw image data can be obtained through NRRGBCamTexture or NRGrayCameraTexture for the RGBCamera or GrayCamera, respectively.

#### Example 4: Getting the RGB Camera's Image as Raw Byte Array

In the current version of NRSDK, one can use Texture2D to get the raw image data. The following example code uses GetRawTextureData to get raw data by accessing Texture2D from NRRGBCamTexture. The output raw data array stores the image pixel data row-wise as described above.

```
// Here are parts of the example code for using RGB camera, you can find the 
// complete code in the CameraCaptureController file of NRSDK.
public class CameraCaptureController : MonoBehaviour
{
    // Save the reference for Texture2D from NRRGBCamTexture.
    Texture2D mTex2d;
    // The instance of NRRGBCamTexture.
    NRRGBCamTexture mCamTex;
    void Start()
    {
        // Create an instance of NRRGBCamTexture
        mCamTex = new NRRGBCamTexture();
        // Get Texture2D target and save it.
        mTex2d = mCamTex.GetTexture();
        mCamTex.Play();
    }

    void LateUpdate()
    {
        // Get raw data from Texture2D per frame.
        byte[] rawData = mTex2d.GetRawTextureData();
    }
}
```

### Interface for Camera Intrinsics and Distortion

- The interfaces for getting camera intrinsics, distortion parameters, and resolution are as follows

```
public class NRFrame
{
    // Get the intrinsic matrix of device.
    public static NativeMat3f GetDeviceIntrinsicMatrix(NativeDevice device);
    // Get the distortion coefficients of device.
    public static NRDistortionParams GetDeviceDistortion(NativeDevice device);
    // Get the resolution of device.
    public static NativeResolution GetDeviceResolution(NativeDevice device);
}
```

#### Example 5: Getting the RGB Camera's Intrinsic Parameters

The following example code gets the RGB camera's intrinsic matrix and distortion parameters as described above.

```
// Get the rgb camera's intrinsic matrix
NativeMat3f mat = NRFrame.GetDeviceIntrinsicMatrix(NativeDevice.RGB_CAMERA);
// Get the rgb camera's distortion coeffcients
NRDistortionParams distort = NRFrame.GetDeviceDistortion(NativeDevice.RGB_CAMER
```
