# NRInput

To enable input support for XREAL device (Controller and Hand tracking), simply drag **NRInput** prefab into your scene hierarchy. It is used to query virtual or raw controller state, such as buttons,  triggers, and capacitive touch data.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fszbk36JxKfbwZz2iXL32%2Fimage.png&width=768&dpr=4&quality=100&sign=cc03f577c7dbf8c45039e6083ee1d51765309e7de484c5c44873b812401e03bf)

**Raycast Mode:** Choose between Laser / Gaze interaction. **Laser** is the default raycasting mode most apps will be based on. In this mode, the ray will start from the center of the controller.

**Input Source Type:** Choose between Controller / Hands. **Hands** will enable hand tracking capability.

You may leave other fields unchanged.

### Raycasters in NRInput

The raycaster class inherits from Unity's BaseRaycaster class. A chosen raycaster's farthest raycasting distance can be modified directly from the Inspector window. You can also define which objects are interactable by changing the parameter of their Mask.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcontroller06.jpg&width=768&dpr=4&quality=100&sign=a110a2d99e18fabb5a57238422c37d9d6cc9a8b450dbc848daa57f97f6b5cd27)

### Handle Controller State Change

The primary usage of NRInput is to access controller button state through `Get()`, `GetDown()`, and `GetUp()`.

- `Get()` queries the current state of a controller.
- `GetDown()` queries if a controller was pressed this frame.
- `GetUp()` queries if a controller was released this frame.

**Sample Usages:**

```csharp
//returns true if a Trigger button is currently being pressed
NRInput.GetButton(ControllerButton.TRIGGER);

//returns true if a Trigger button was pressed down this frame
NRInput.GetButtonDown(ControllerButton.TRIGGER);

//returns true if a Trigger button was released this frame
NRInput.GetButtonUp(ControllerButton.TRIGGER);
```

You could also add listeners to controller buttons:

**Sample Usages:**

```csharp
//Add button down listeners for right controller's trigger button
NRInput.AddDownListener(ControllerHandEnum.Right, ControllerButton.TRIGGER, () => { Debug.Log("do sth"); });

//Add pressing listeners for right controller's trigger button
NRInput.AddPressingListener(ControllerHandEnum.Right, ControllerButton.TRIGGER, () => { Debug.Log("do sth"); });

//Add button up listeners for right controller's trigger button
NRInput.AddUpListener(ControllerHandEnum.Right, ControllerButton.TRIGGER, () => { Debug.Log("do sth"); })
```

#### Other Controller Events:

```csharp
/// Event invoked whenever a controller device is connected.
public static Action OnControllerConnected;

/// Event invoked whenever a controller device is disconnected. 
public static Action OnControllerDisconnected;

///  Event invoked before controller devices are going to recenter. <
public static Action OnBeforeControllerRecenter;

///  Event invoked whenever controller devices are recentering. 
internal static Action OnControllerRecentering;

///  Event invoked whenever controller devices are recentered. 
public static Action OnControllerRecentered;

/// Event invoked whenever controller devices states are updated. 
public static Action OnControllerStatesUpdated;
```

### Change Controller Behaviour

```csharp
//Set interaction method to Gaze
NRInput.RaycastMode = RaycastModeEnum.Gaze;        

//Hide Reticle Visual 
NRInput.ReticleVisualActive = false;

//Hide Laser Visual
NRInput.LaserVisualActive = false;

//Hide Controller Model
NRInput.ControllerVisualActive = false;

//Disable Controller Vibrationn
NRInput.HapticVibrationEnabled = false;

//Trigger Haptic Vabration of 0.1s 
NRInput.TriggerHapticVibration(0.1f);

//Recenter controller Raycast
NRInput.RecenterController();
```

### Getting Controller Data

**Sample Usages:**

```csharp
//Getting available features for current controller, such as 
//magenetometer, remaining battery, haptics, etc.
NRInput.GetControllerAvailableFeature();

//Get controller's position. For current XREAL device, this 
//will always return Vector3.Zero
NRInput.GetPosition();

//Get controller's rotation
NRInput.GetRotation();

//Get controller type: Phone controller or computing unit controller
ControllerType controllerType = NRInput.GetControllerType();

//Whether the controller's touch pad is being touched
NRInput.IsTouching();

//Getting a Vector2 touch value. Vector2.Zero if not touched
NRInput.GetTouch();

//Get controller's gyroscope data
NRInput.GetGyro();

//Get controller's accelerometer data
NRInput.GetAccel();

//Get controller's magnetometer data
NRInput.GetMag();

//Get controller's remaining battery
NRInput.GetControllerBattery();

//Getting the dominant hand
ControllerHandEnum domainHand = NRInput.DomainHand;

//You could pass in a dominant hand for most of the functions above
NRInput.GetRotation(NRInput.DomainHand);
        
//Whether the feature is supported by controller
NRInput.GetControllerAvailableFeature(ControllerAvailableFeature.CONTROLLER_AVAILABLE_FEATURE_POSITION);
NRInput.GetControllerAvailableFeature(ControllerAvailableFeature.CONTROLLER_AVAILABLE_FEATURE_GYRO);
```

### Get Frequently Used Anchors

The NRInput provides an easy way to get frequently used root node for gaze and laser quickly.

**Sample Usage:**

```csharp
//Obtain the root of gaze
var gazeAnchor = NRInput.AnchorsHelper.GetAnchor(ControllerAnchorEnum.GazePoseTrackerAnchor);

//Obtain the root of right laser
var rightLaserAnchor = NRInput.AnchorsHelper.GetAnchor(ControllerAnchorEnum.RightLaserAnchor);

//Obtain the root of right model
var rightModelAnchor = NRInput.AnchorsHelper.GetAnchor(ControllerAnchorEnum.RightModelAnchor);
```

### Interact with GameObject

Please inspect `CubeInteractiveTest.cs` which handles Unity events when interacting with gameObject this script attached to. Be aware that the gameObject must has a **Collider** component in order to receive the event. For a full list of supported Unity Event, please refer to: https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/SupportedEvents.html

```
public class CubeInteractiveTest : MonoBehaviour, IPointerClickHandler, IPointerEnterHandler, IPointerExitHandler, IDragHandler
{
    private MeshRenderer m_MeshRender;
    void Awake()
    {
        m_MeshRender = transform.GetComponent<MeshRenderer>();
    }
    //when pointer clicks, set the cube color to random color
    public void OnPointerClick(PointerEventData eventData)
    {
        m_MeshRender.material.color = new Color(Random.Range(0f, 1f), Random.Range(0f, 1f), Random.Range(0f, 1f));
    }
    //when pointer hover, set the cube color to green
    public void OnPointerEnter(PointerEventData eventData)
    {
        m_MeshRender.material.color = Color.green;
    }
    //when pointer exit hover, set the cube color to white
    public void OnPointerExit(PointerEventData eventData)
    {
        m_MeshRender.material.color = Color.white;
    }
}
```

### Interact with Unity UI

Integration with Unity's EventSystem supports user interaction with UI System. Please be aware in order for the Unity UI to respond to raycast and receive unity events, you **must** remove the default **Graphic Raycaster** component and attach **Canvas Raycast Target** component on Canvas.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FimFfQH282wdz1WhSo6vX%2Fimage.png&width=768&dpr=4&quality=100&sign=8a7f2b54a08e9c0d822c833cd613c24a493e819225dd1820765baf3b75ea89f6)

In this way, you may add event callbacks on Unity UI elements such as Button, Image, Toggle, Slider, etc. For example, On Click() on button:

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fcbo6iHsuuTMW4sKi66yA%2Fimage.png&width=768&dpr=4&quality=100&sign=9d5e9622079e75d1639b54d67f99221da6a42f65f9f6138ab19b7bfb80758c04)