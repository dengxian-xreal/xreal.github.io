# Reset Camera

### Introduction

If you're building a seated or standing experience, you can recenter Unity's world origin at the user's current position and orientation by calling the API `NRHMDPoseTracker.ResetWorldMatrix` . The **HelloMR-ResetCamera** sample scene demonstrates how to reset the camera with this API in an app. 

The main script is `CameraResetController.cs` which uses a boolean to support reset camera with pitch as well.

### Developer Guide

1. Create a new project in Unity with NRSDK. Refer to [Getting Started with NRSDK](https://app.gitbook.com/o/n9Gz0qLyZFcBAT9F8hDM/s/yXoV7SMVFQhr75lOIoQv/nrsdk-fundamentals/quickstart-for-android) for more setting up instructions.

2. Create a canvas and a button;

3. Drag the script CameraSmoothFollow.cs to the inspector of canvas for sticking the menu in your view so you can click your reset button easily. You can adjust the speed of the button moving with your view with `Follow Speed`.                   

   ![img](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172422883.png)

   

4. Drag the script CameraResetController.cs and CanvasRaycastTarget.cs to the inspector of canvas;

5. Set the OnClick() event of your button, drag the canvas to the event;

   ![img](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172426982.png)

   

6. Choose the function `CameraResetController` -> `ResetCameraToOrigin(bool)`

   ![img](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172430624-20240813172435799.png)

   

7. That's it. You can build your app and test the recenter effect. If you want to reset the camera with pitch, just repeat the upper steps and choose the check box.  

   ![img](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172441140.png)

   
