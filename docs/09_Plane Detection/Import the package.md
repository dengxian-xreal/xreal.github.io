# Import the package

### Import the Starter Package

For this tutorial, we've provided a starter package that contains prefabs and scripts that will expedite some parts of the tutorial so you can focus on how to use plane detection feature in NRSDK.

1.Download the Plane Detection Starter Package:

PlaneDetectionStarterPackage.unitypackage

2. Install the starter package by opening **Assets > Import Package > Custom Package...** and opening `PlaneDetectionStarterPackage.unitypackage`.
3. In the window that pops up, ensure everything is selected.
4. Click **Import**.
5. After importing NRSDK and plane detection starter package, your project folder should look like this:

![image-20240812173706112](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173706112.png)

### Add the required scene elements

1. In `Assets > Scene` folder, rename the SampleScene to PlaneDetection

​	![image-20240812173720372](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173720372.png)

2. In the project hierarchy, delete `MainCamera`, search in the project panel and drag in `NRInput` and `NRCameraRig` prefab (located in `Assets > NRSDK > Prefabs`) in the hierarchy. Your hierarchy should look like this:

   ![image-20240812173739386](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173739386.png)

3. Click `NRInput `in Hierarchy,  make sure it is configured as following in the inspector. Specifically, `Raycast Mode` set to `Laser`, and `Input Source Type `to `Controller`

   ![image-20240812173757034](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173757034.png)

4. Click `NRCameraRig`, then click `NRKernalSessionConfig `in `NR Session Behaviour` component to find `NRKernalSessionConfig` configuration. Click the `NRKernalSessionConfig`  file appeared in the project folder. You could also locate `NRKernalSessionConfig`  in `Assets/NRSDK`

​	![image-20240812173821588](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173821588.png)

​	![image-20240812173839269](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173839269.png)

5. In `NR Kernal Session Config` panel, activate `Plane Finding Mode` and `Image Tracking Mode` is activated as follows.

​	![image-20240812173858281](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173858281.png)

### Verify the setup

1. Search and Drag `NRLogo` (located in `Assets/NRSDK/Demos/HelloMR/Logo/Models/NRLogo.prefab`) into the hierarchy. 

2. Ensure your Android phone is plugged in or connected through Wi-Fi for ADB debugging. 
3. Follows **Step 7** and **Step 8** in [Getting Started with NRSDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android) to test if your app built with the current environment runs properly.
4. You should see XREAL logo (`NRLogo`) appeared on the glasses.
