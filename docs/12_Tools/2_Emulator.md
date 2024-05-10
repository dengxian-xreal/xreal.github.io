# Emulator

The **Emulator** lets you test mixed reality applications on your PC without a real XREAL Light glasses and computing unit. With Emulator, you can speed up app development by testing, iterating and debugging without having to build and deploy the app to XREAL device. You could simply **use Unity to test your app by importing an Emulator Prefab.**

Controlling the Emulator is very similar to common 3D video games. You can use keyboard and mouse to control the head pose movement, controller rotation, trackable planes or images in 3D space.

**In this section, you will learn:**

- How to enable Unity to debug MR apps as an Emulator.
- How to simulate input events that are usually read by XREAL Light glasses and controller sensors by using your keyboard and mouse when debugging.

### Prerequisites

- Understanding NRSDK concept and working flow
- Import NRSDK into Unity
- Have the code and resources of your app ready

### Find Emulator in NRSDK package

NRSDK > Emulator

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fem1-1.jpg&width=768&dpr=4&quality=100&sign=dfe4aba2af27ba26b04abe5f13e2db24313869952b367c040d4bd88af510cc9f)

### Emulator Structure

**Emulator** folder contains all the code and resources of Emulator, here is a brief introduction for you to lookup.

- **Editor** contains the script used for modifying Unity Editor.
- **Image** contains the UI image resources to show controller state.
- **Material** contains the materials for TrackableImage and TrackablePlane in Emulator.
- **Model** contains the room model used in the sample scene.
- **Prefabs**
  - `NRTrackableImageTarget.prefab` used for simluating the detection of images.
  - `NRTrackablePlaneTarget.prefab` used for simulating the detection of planes.
- **Resources** used for dynamic loading resource.
- **Scene** contains two demos for testing TrackableImage and TrackablePlane.
- **Script**
  - `NativeEmulator.cs` used for calling low-level API.
  - `NREmulatorManager.cs` is the script for managing the life cycle of Emulator.
  - `NREmulatorController.cs` simulates the input of controller.
  - `NREmulatorHeadPose.cs` simulates the headpose movement.
  - `NRTrackableImageBehaviour.cs` is the script to simulate the trackable images.
  - `NRTrackablePlaneBehaviour.cs` is the script to simulate the trackable planes.
  - `NRTrackableObserver.cs` is the observer of trackable target.
  - `TrackableFoundTest.cs` is a testing script that.

### Simulating the 6DoF Head Pose

- Use WSAD on the keyboard to simulate the movement of the position of the head.

  > W -> move forward. S -> move backward. A -> move left. D -> move right.

- Press Space key and Use the Mouse to simulate the rotation of the head.

- Sample Code:

```
void UpdateHeadPosByInput()
{
    float mouse_x = Input.GetAxis("Mouse X") * HeadRotateSpeed;
    float mouse_y = Input.GetAxis("Mouse Y") * HeadRotateSpeed;
    Vector3 mouseMove = new Vector3(m_CameraTarget.transform.eulerAngles.x - mouse_y, m_CameraTarget.transform.eulerAngles.y + mouse_x, 0);
    Quaternion q = Quaternion.Euler(mouseMove);
 m_CameraTarget.transform.rotation = q;

    Vector3 p = GetBaseInput();
    p = p * HeadMoveSpeed * Time.deltaTime;
    Vector3 pos = p + m_CameraTarget.transform.position;
 m_CameraTarget.transform.position = pos;

    // Call api to simulate the headpose movement
    NREmulatorManager.Instance.NativeEmulatorApi.SetHeadTrackingPose(pos, q);
}
```

### Simulating 3DoF Rotation of Controller

> Sample Code: `NREmulatorController.cs`

```
// Control the rotation of controller
void UpdateControllerRotateByInput()
{
    float mouse_x = Input.GetAxis("Mouse X") * HeadRotateSpeed;
    float mouse_y = Input.GetAxis("Mouse Y") * HeadRotateSpeed;

    Vector3 mouseMove = new Vector3(m_Target.transform.eulerAngles.x - mouse_y, m_Target.transform.eulerAngles.y + mouse_x, 0);
    Quaternion q = Quaternion.Euler(mouseMove);
    m_Target.transform.rotation = q;
    NREmulatorManager.Instance.NativeEmulatorApi.SetControllerRotation(new Quaternion(q.x, q.y, q.z, q.w));

}
```

### Simulating Controller Input

#### Phone Controller

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FAfd2DvDkj5YJBY63FGzA%2Fimage.png&width=768&dpr=4&quality=100&sign=732601898b5f4976f0d16d789e7b624c9cc6963c485f1279401884391d18b3d6)

Selecting **Emulate Virtual Display In Editor** on **NRInput** to enable **Phone Controller** simulation that stays at the lower-right corner of the Game window.

- Mouse left on TouchPad area -> Select Button
- Mouse left on APP -> App button
- Mouse left on HOME -> Home Button

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F3JYzMmcckq2WjQCSDpKD%2Fimage.png&width=768&dpr=4&quality=100&sign=ef0eadbd756bad3056bc0f22d8e4b22d8128b7bb99458a1d35b55fdef8ed832c)

### Tutorial: Simulating Headpose, Controller & Trackable Object

#### Run the Sample

First , `Assets/NRSDk/Emulator/Scenes/TrackableImageEmulator.unity` and `Assets/NRSDk/Emulator/Scenes/TrackablePlaneEmulator.unity` are two samples for the Emulator. Developers could directly play the scene in Unity Editor or build them into apk and run on an XREAL Device.

#### Create your own

1. Make sure you have `Assets/NRSDK/Prefabs/NRCamreaRig.prefab` and `NRSDK/Prefabs/NRInput.prefab` in the scene.

> - When Unity Editor under runtime, the `NREmulatorHeadPose.prefab` will be automatically loaded by `NRCameraRig.prefab` into the scene for simulating the head pose data.
> - When Unity Editor under runtime, the`EmualatorController.Prefab` will be automatically loaded by `NRInput.prefab` into the scene for simulating the controller input data.

2. Place `Assets/NRSDK/Emulator/Prefabs/NRTrackableImageTarget.prefab` or `Assets/NRSDK/Emulator/Prefabs/NRTrackablePlaneTarget.prefab` to simulate the trackable images and planes.

> - `TrackableObserver.cs` is attached to every`NRTrackableImageTarget.prefab` and `NRTrackablePlaneTarget.prefab`. You need to register your own logic of Trackable found and lost into TrackableObserver.
>
> ![../../../_images/em1-10.jpg](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fem1-10.jpg&width=300&dpr=4&quality=100&sign=91374592c5ba9ce344c2f395ec48878e10015d0f91ae3b7a98aefcd40b1cf2e1)

3. In `/Assets/NRSDK/Emulator/Scripts/TrackableFoundTest.cs` , you could find the sample for the register event.

> - Sample Code: `TrackableFoundTest.cs`
>
> ```
> public class TrackableFoundTest : MonoBehaviour {
> 
>   // Observer of the registed event
>   public TrackableObserver Observer;
>   // Showing GameObject on the detected Trackable object
>   public GameObject Obj;
> 
>   void Start ()
>   {
>       Obj.SetActive(false);
>       Observer.FoundEvent += Found;
>       Observer.LostEent += Lost;
>   }
> 
>   private void Found(Vector3 pos, Quaternion qua)
>   {
>       Obj.transform.position = pos;
>       Obj.transform.rotation = qua;
>       Obj.SetActive(true);
>   }
>   private void Lost()
>   {
>       Obj.SetActive(false);
>   }
> }
> ```

4. If you want to use your image as a detection target, you could switch the image database in `NRTrackableImageTarget.prefab`

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fem1-11.jpg&width=768&dpr=4&quality=100&sign=47dee51458d9e1a71658627f9db33b7bedc0c3f7478adf71db79dfbda290e72f)

> - In NRSDK, we provided you with three default images for image detection. If you would like to add your own, please find `NRCameraRig.prefab`
>
>   - Find`NRKernalSessionConfig.asset` under the `NRSessionBehaviour.cs`
>
>   ![../../../_images/em1-12.jpg](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fem1-12.jpg&width=300&dpr=4&quality=100&sign=0fb72c3560f74e049a44f32a60f8f9686c3d431ae4ebd4ed0330c4f572fd8e94)
>
>   - Find TrackingImageDatabase in the `NRKernalSessionConfig.asset`, and drag your own database.asset into it.
>
>   ![../../../_images/em1-13.jpg](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fem1-13.jpg&width=300&dpr=4&quality=100&sign=8da3de3a3103b6b271e59ba22b10eae143b0a566c809c7b20fb86a64f13a58d8)
>
>   - Refer to [Image Tracking](https://nrealsdkdoc.readthedocs.io/en/latest/Docs/Unity_EN/Develop/Image Tracking.html#image-tracking) for more inforamtion
>
>   ![../../../_images/em1-14.jpg](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fem1-14.jpg&width=300&dpr=4&quality=100&sign=900130501e65a6cd255488ada5ed410f7271cbcaa9d6377b766c91acab2515a3)
