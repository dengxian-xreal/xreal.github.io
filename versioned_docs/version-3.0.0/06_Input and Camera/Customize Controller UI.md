# Customize Controller UI

### Introduction

When we release the XREAL glasses to consumers, the product will only include the glasses themselves, without any controllers or computing units. Users can connect the XREAL glasses to their own Android phones or Beam Pro, which can then serve as 3DOF controllers.

So if you want to create unique experiences that stand out from the rest you can fully customize your MR app's controller interface.

### How to use a phone as controller

#### Controller Features Description

- **3DoF Tracking**
- **Touchpad**: Represents the "Trigger" button and is also used as a touchpad. It can detect touching and swiping.
- **Home Button**: Click to call the "Exit App" menu. Press and hold to recenter your controller. It is advised not to use this button for app-specific functions.
- **App Button**: Can be freely customized for your app, e.g., click to open an in-app menu or perform a special action.

#### Two Ways to Use

One of the great things about the XREAL phone controller is that you can easily customize its UI interface. Here are two ways to use the XREAL phone controller:

1. **The Default Method**: When you run the XREAL app on your Android device, a default virtual controller (the "**XREALVirtualController**" prefab) will be automatically loaded without requiring any additional setup. This default controller includes three common buttons: Trigger, Home, and App.
2. **The Custom Way**: Drag the "XREALVirtualController" prefab into your scene. Then you can modify it according to your needs. For example, add new buttons or change the style of the controller UI to match your application.

### Developer Guide

1. **Add the Prefab to Your Project**
   * In Project panel, find the "XREALVirtualController" prefab, and drag it to your Assets folder.

![image-20240607155115460](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155115460.png)

2. **Customize the Controller**
   * Double click the "XREALVirtualController" object in Project. You can then design buttons or other UI elements as you like.

![image-20240607155339714](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155339714.png)

3. **Add a New Button**

   - To add a new button, add it under the "Buttons" GameObject in the hierarchy. Then in the Inspector panel, click "Add Component", search for "XREAL Button", and add it.

     ![image-20240607155823946](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155823946.png)

4. **Set the Button Type**

   - In the Inspector panel, set the Button type of your custom button.

     ![image-20240607155843090](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155843090.png)

     ![image-20240607155805147](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155805147.png)

5. **Configure Input Actions**
   * Find "XRI Default Input Actions" in the Project panel and double-click to open it.

![image-20240607170320095](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607170320095.png)

6. **Create a New Action Map**
   * Create a new action map by clicking the "+" button.

![image-20240607170536010](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607170536010.png)

7. **Add a Binding to the Action**
   * Click  `No Binding`, go to Path in Binding Properties -> Binding, and choose XR Controller -> XREAL Controller.

![image-20240607171809682](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607171809682.png)

![image-20240607171837125](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607171837125.png)

8. **Select a Button**

* Choose a button, for example, ButtonId7

![image-20240607171952662](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607171952662.png)

9. **Assign Custom Button**

   - Then, in the Button type of your custom button, choose Custom Button 7.

     ![image-20240607172941152](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607172941152.png)

![image-20240612142840005](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612142840005.png)

10. **Implement Custom Button Functionality**
    * Create a script to handle the button action. Here's an example script that changes the color of a sphere when the custom button is pressed:

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;


public class CustomButtonActionHandler : MonoBehaviour
{
    public InputActionReference buttonAction; // Drag your InputAction here in the Inspector
    public GameObject sphere; // Drag your sphere GameObject here in the Inspector
    public Color targetColor = Color.red; // Color to change to when button is pressed

    private Renderer sphereRenderer;
    private Color originalColor;

    private void Awake()
    {
        if (sphere != null)
        {
            sphereRenderer = sphere.GetComponent<Renderer>();
            originalColor = sphereRenderer.material.color;
        }
    }

    private void OnEnable()
    {
        buttonAction.action.performed += OnButtonPressed;
        buttonAction.action.Enable();
    }

    private void OnDisable()
    {
        buttonAction.action.performed -= OnButtonPressed;
        buttonAction.action.Disable();
    }

    private void OnButtonPressed(InputAction.CallbackContext context)
    {
        if (sphereRenderer != null)
        {
            sphereRenderer.material.color = targetColor;
        }
    }
}
```



11. **Build and run**
    
    Unfortunately, you are unable to debug your costom controller in Unity Editor. You can build your app then test it on your android phone or Beam pro.