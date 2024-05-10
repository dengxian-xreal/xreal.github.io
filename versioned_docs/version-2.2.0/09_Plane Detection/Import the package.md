# Import the package

### Import the Starter Package

For this tutorial, we've provided a starter package that contains prefabs and scripts that will expedite some parts of the tutorial so you can focus on how to use plane detection feature in NRSDK.

1.Download the Plane Detection Starter Package:

PlaneDetectionStarterPackage.unitypackage

2. Install the starter package by opening **Assets > Import Package > Custom Package...** and opening `PlaneDetectionStarterPackage.unitypackage`.
3. In the window that pops up, ensure everything is selected.
4. Click **Import**.
5. After importing NRSDK and plane detection starter package, your project folder should look like this:

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F10JNtyk9OepuFfzFh1R8%2Fimage.png&width=768&dpr=4&quality=100&sign=c74b797751a4d819b4ec793ea06cdd8f5e6494a0ff1dea4591642e2d1afcb631)

### Add the required scene elements

1. In `Assets > Scene` folder, rename the SampleScene to PlaneDetection

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FwbFLLH2FUad82C4pmAJU%2Fimage.png&width=768&dpr=4&quality=100&sign=52570c04f598fbe5264d5645fb53a06b466cd074585ddfbef30675a0d6877868)

2. In the project hierarchy, delete `MainCamera`, search in the project panel and drag in `NRInput` and `NRCameraRig` prefab (located in `Assets > NRSDK > Prefabs`) in the hierarchy. Your hierarchy should look like this:

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FrlsFHiuv72ezmwV6QbKV%2Fimage.png&width=768&dpr=4&quality=100&sign=1aaf5024dc5b01487716fa6508c4618a6d18f278fe611e92cb50bcba4dbdb6b2)

3. Click `NRInput `in Hierarchy,  make sure it is configured as following in the inspector. Specifically, `Raycast Mode` set to `Laser`, and `Input Source Type `to `Controller`

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FVnN9ZPlozToLRdJw5T2o%2Fimage.png&width=768&dpr=4&quality=100&sign=7815c1ececcfcef5209ef2e50e7f248177cf0b907e97122e9fdae7329b83af56)

4. Click `NRCameraRig`, then click `NRKernalSessionConfig `in `NR Session Behaviour` component to find `NRKernalSessionConfig` configuration. Click the `NRKernalSessionConfig`  file appeared in the project folder. You could also locate `NRKernalSessionConfig`  in `Assets/NRSDK`

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FShNHLD9NY5oU1X3fqBj9%2Fimage.png&width=768&dpr=4&quality=100&sign=f1212aa4cc07299da40b522f6aa8709250660be7cb8961dea021aec5b730bacc)

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FXF8C0ZAIv2FYPJxNxpbq%2Fimage.png&width=768&dpr=4&quality=100&sign=4784c054ccf4830cfaa4a238280fa888887c0fb212bc59d6353a161c0e142ed8)

5. In `NR Kernal Session Config` panel, activate `Plane Finding Mode` and `Image Tracking Mode` is activated as follows.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FrwQE2anT61RvaNkuOO5O%2Fimage.png&width=768&dpr=4&quality=100&sign=349842c7a7361a4e91f8adb8fa81b0bddf108a157462add6253417b5d49c6540)

### Verify the setup

1. Search and Drag `NRLogo` (located in `Assets/NRSDK/Demos/HelloMR/Logo/Models/NRLogo.prefab`) into the hierarchy. 

2. Ensure your Android phone is plugged in or connected through Wi-Fi for ADB debugging. 
3. Follows **Step 7** and **Step 8** in [Getting Started with NRSDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android) to test if your app built with the current environment runs properly.
4. You should see XREAL logo (`NRLogo`) appeared on the glasses.
