# NRSDK Coordinate Systems

### NRSDK Coordinate Systems

This document describes the coordinate systems of the XREAL Glass used in the NRSDK for Unity. It also describes the corresponding interfaces for getting extrinsics between the glass components, camera image data, and camera intrinsics, as well as conversion to other definition of coordinate systems.Note that this document is applicable to the NRSDK for Unity only, and does not apply to other types of NRSDK.

## Unity-based Coordinate Systems

In the NRSDK for Unity, in terms of coordinate system's definition and the corresponding extrinsics, we use definition of the Unity coordinate system (left handed).

### XREAL Glass Components and Their Unity-based Coordinate Systems

- The XREAL glasses consists of the following key components

1. 2 x Grayscale Cameras
2. 2 x Display Cameras
3. Head / IMU
4. RGB Camera

- The placement of the above components and their corresponding coordinate systems, as defined in NRSDK for Unity, are as follows

​	![NRSDK Coordinate Systems](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/NRSDK%20Coordinate%20Systems.png)

- The global coordinate frame of the tracking system is as follows

​	![NRSDK Coordinate Systems (1)](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/NRSDK%20Coordinate%20Systems%20(1).png)

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

- For example, given a vector's coordinate $P_d$ in the Device's coordinate frame, and using the extrinsic transformation matrix $^h\mathbf{T}_d$ obtained as above, we can compute the vector's coordinate $P_h$ in the Head coordinate frame, by
$$P_h = ^h\mathbf{T}_d * P_a$$

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

### XREAL Glass Components and Their OpenCV-based Coordinate Systems

- In the OpenCV convention, the XREAL Glass components and their corresponding coordinate systems are as follows

​	![NRSDK Coordinate](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/NRSDK%20Coordinate.png)

### Converting Extrinsics: From Unity to OpenCV

- The definition difference between Unity and OpenCV coordinate systems for a camera is as follows

​	![4](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/4.png)

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

​	![NRSDK Coordinate Systems (2)](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/NRSDK%20Coordinate%20Systems%20(2).png)

- The camera intrinsic matrix $\mathbf{K}$ is composed of the focal lengths $f_x$ and $f_y$, and the principal point $c_x$ and $c_y$, expressed in pixel units.

$$
\mathbf{K} = \begin{bmatrix}
f_x & 0 & c_x \\
0 & f_y & c_y \\
0 & 0 & 1
\end{bmatrix}
$$

- The distortion parameters contain radial coefficients $k_1, k_2, k_3, k_4, k_5$ and tangential coefficients $p_1, p_2$. The order of NRDistortionParams is $(k_1, k_2, p_1, p_2, k_3, k_4, k_5)$.

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
