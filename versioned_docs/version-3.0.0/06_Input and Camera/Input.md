# Input

### Introduction

The XREAL XR Plugin now utilizes [Unity's Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.8/manual/index.html) for handling input. This system provides a high-level API, making it simpler and more efficient to manage inputs from controllers and headsets.

### Installation and Configuration

1. **Install Unity Input System**
   - Open the Unity Package Manager (`Window > Package Manager`).
   - Search for `Input System` and click `Install`.
2. **Enable the New Input System**
   - Go to `Edit > Project Settings > Player`.
   - Under `Other Settings`, find `Active Input Handling` and select `Both` or `Input System Package (New)`.
   - Restart the Unity Editor to apply the changes.

## Enable input actions used for input

1. **Create Input Actions Asset**
   - Right-click in the Project window and select `Create > Input Actions`.
   - Name the newly created Input Actions asset, for example, `XREALInputActions`.
2. **Edit Input Actions**
   - Double-click the `XRI Default Input Actions` asset to open the Input Actions editor. ⚠️我们应该是用的默认的
   - Add input actions for controllers and headsets. For example, create an `Action Map` called `XRController` and add actions such as `Select`, `Activate`, `UIPress`, etc.
3. **Generate C# Class**
   - In the Input Actions editor, click `Generate C# Class` and name the class, for example, `XREALInputActions`.
   - The generated C# script will appear in the Project window.

### Configuring Controller Input

1. **Add XR Controller Components**
   - In your scene, add an `XR Origin` object (`GameObject > XR > XR Origin`).
   - On the child objects of `XR Origin` (e.g., `LeftHand Controller` and `RightHand Controller`), add `XR Controller` components.
2. **Bind Input Actions to Controllers**
   - Attach the generated `XREALInputActions` script to the controller objects.
   - In the `XR Controller` components' `Actions` section, bind the actions from the `XREALInputActions` asset to the corresponding controller inputs.

### Example Code

Below is a simple example demonstrating how to use Unity's Input System to handle controller input:

```
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.XR.Interaction.Toolkit;

public class XREALInputHandler : MonoBehaviour
{
    public XRController leftController;
    public XRController rightController;
    private XREALInputActions inputActions;

    void Awake()
    {
        inputActions = new XREALInputActions();
    }

    void OnEnable()
    {
        inputActions.Enable();
    }

    void OnDisable()
    {
        inputActions.Disable();
    }

    void Start()
    {
        // Bind input actions to controller
        rightController.selectAction.action = inputActions.XRController.Select;
    }

    void Update()
    {
        // Example: Handle controller input

        if (rightController.selectAction.action.ReadValue<float>() > 0.1f)
        {
            Debug.Log("Right controller select pressed");
        }
    }
}
```

### Further Reading

- [Unity Input System Documentation](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest)