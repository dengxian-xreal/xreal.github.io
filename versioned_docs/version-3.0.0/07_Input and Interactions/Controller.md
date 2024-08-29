# Controller

## Introduction

When we release the XREAL glasses to consumers, the product will only include the glasses themselves, without any controllers or computing units. Users can connect the XREAL glasses to their own Android phones or Beam Pro, which can then serve as 3DOF controllers.

So if you want to create unique experiences that stand out from the rest you can fully customize your MR app's controller interface.



Overview, 我们的Input是通过Android手机或者BeamPro来作为一个XR Controller，所以只需要按照

![image-20240829173525097](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240829173525097.png)

### Controller Features Description

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcontroller04.png&width=768&dpr=4&quality=100&sign=0d3e08268e1aac95c61b6f8d824df03a08d0827fcb8bbf0e39abf248088f282e)

- **3DoF Tracking**
- **Touchpad**: Represents the "Trigger" button and is also used as a touchpad. It can detect touching and swiping. Customizable for your app, e.g. scrolling.
- **Home Button**: Press and hold to recenter your controller. Press can be customized for in-app action, e.g. return to the previous step.
- **App Button**: Press and hold to recenter your controller. Can be freely customized for your app, e.g., click to open an in-app menu or perform a special action.

### Two Ways to Use

One of the great things about the XREAL phone controller is that you can easily customize its UI interface. Here are two ways to use the XREAL phone controller:

1. **The Default Method**: When you run the XREAL app on your Android device, a default virtual controller (the "**XREALVirtualController**" prefab) will be automatically loaded without requiring any additional setup. This default controller includes three common buttons: Trigger, Home, and App.

2. **The Custom Way**: To customize your virtual controller, drag the **XREALVirtualController** prefab into your scene. This prefab serves as a flexible foundation for building your application’s input interface.

   You have the option to enhance the Virtual Controller by incorporating two types of buttons:

   ​	1.**Input Action Buttons**: These are linked to specific actions within Unity’s Input System, enabling you to handle inputs from various devices seamlessly. Utilize these buttons for in-game actions such as movement and interaction.

   ​	2.**UI Buttons**: These on-screen interactive elements are part of the Unity UI system. Use them for menu navigation and application control to provide users with an intuitive and accessible interface.

   

   For detailed instructions on adding and configuring these buttons, please refer to the Developer Guide below. Customize the style and functionality of the controller UI to align with your application’s unique requirements.

## How to Customize Controller UI

#### **1. Add the Prefab to Your Project**

* In Project panel, find the "XREALVirtualController" prefab, and drag it to your Assets folder.

![image-20240607155115460](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155115460.png)

#### **2. Customize the Controller**

* Double click the "XREALVirtualController" object in Project. You can then design buttons or other UI elements as you like. 

![image-20240607155339714](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155339714.png)

#### 3. **Add a New Input Action Button**

1. To add a new button, add it under the "Buttons" GameObject in the hierarchy. Then in the Inspector panel, click "Add Component", search for "XREAL Button", and add it.

![image-20240607155823946](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155823946.png)

2. **Set the Button Type**

   In the Inspector panel, set the Button type of your custom button.

    ![image-20240607155843090](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155843090.png)

    ![image-20240607155805147](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607155805147.png)

3. **Configure Input Actions**

   Find "XRI Default Input Actions" in the Project panel and double-click to open it.

![image-20240607170320095](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607170320095.png)

4. **Create a New Action Map**

 	Create a new action map by clicking the "+" button.

 ![image-20240607170536010](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607170536010.png)

5. **Add a Binding to the Action**

- Click  `No Binding`, go to Path in Binding Properties -> Binding, and choose XR Controller -> XREAL Controller.

![image-20240607171809682](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607171809682.png)

![image-20240607171837125](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607171837125.png)

6. **Select a Button**

   Choose a button, for example, ButtonId7

![image-20240607171952662](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607171952662.png)

7. **Assign Custom Button**

​	Then, in the Button type of your custom button, choose Custom Button 7.

  	<img src="https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607172941152.png" alt="Description" style={{ width: '400px', height: 'auto' }}   />

![image-20240612142840005](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240612142840005.png)

8. **Implement Custom Button Functionality**

   Create a script to handle the button action. Here's an example script that changes the color of a sphere when the custom button is pressed:

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

9. **Build and run**
   Unfortunately, you are unable to debug your custom controller with input action buttons in Unity Editor. You can build your app then test it on your android phone or Beam pro.

#### 4. **Add a New UI Button**

Adding a UI button to the Virtual Controller is straightforward compared to an Input Action Button. Simply place it under the “Buttons” section of the Virtual Controller and implement the necessary logic.

:::tip

**Important:** Pay attention to the order of the buttons. Ensure that any new buttons are added at the end to prevent overlap issues, such as the Trigger button obstructing the new button and rendering it unclickable.

![image-20240812113102174](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240812113102174.png)

:::

Below is a simple example to illustrate the process:

**Objective:** Add a UI button to the Virtual Controller that, when clicked, changes the color of a cube in the scene.

**Step-by-Step Guide:**

1. **Add a Button to the Prefab:**

   * Open the **XREAL Virtual Controller** prefab.

   * Add a new Button component under the “Buttons” section.

2. **Create a Cube with a Color-Switching Script:**

   * In your scene, add a Cube.

   * Attach a script to the Cube that will change its color when invoked.

     ```
       using UnityEngine;
     
       public class ChangeColorOnClick : MonoBehaviour
       {
           // Define an array of colors to choose from
           public Color[] colors;
     
           // Reference to the Renderer component
           private Renderer ballRenderer;
     
           // Index to track current color
           private int currentColorIndex = 0;
     
           void Start()
           {
               // Get the Renderer component of the GameObject
               ballRenderer = GetComponent<Renderer>();
     
               // Initialize the colors array if it's empty
               if (colors == null || colors.Length == 0)
               {
                   colors = new Color[] { Color.red, Color.green, Color.blue, Color.yellow };
               }
     
               // Set initial color
               ballRenderer.sharedMaterial.color = colors[currentColorIndex];
           }
     
           public void OnMouseDown()
           {
               // Change to the next color in the array
               currentColorIndex = (currentColorIndex + 1) % colors.Length;
     
               // Update the color of the material
               ballRenderer.sharedMaterial.color = colors[currentColorIndex];
           }
       }
     ```

3. **Manage the Button’s Interaction:**

   * Since the Virtual Controller is not instantiated into the scene at runtime, you’ll need to create a ButtonManager to control the interaction.

   * This manager should be responsible for finding the Cube in the scene and executing the color change logic.

     ```
     using System.Collections;
     using System.Collections.Generic;
     using Unity.VisualScripting;
     using UnityEngine;
     
     public class Manager : MonoBehaviour
     {
         // Start is called before the first frame update
         ChangeColorOnClick cube;
         void Start()
         {
             cube = FindObjectOfType<ChangeColorOnClick>();
         }
     
         // Update is called once per frame
         void Update()
         {
             
         }
     
         public void changeColor()
         {
             cube.OnMouseDown();
         }
     
     }
     ```

4. **Set Up the Button’s OnClick() Callback:**

   * On the newly added button, set up an OnClick() event.

   * Connect this event to the method in your ButtonManager that handles the color change of the Cube.

     ![image-20240812114640977](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240812114640977.png)

5. **Test in the Editor:**

   * Drag the **XREAL Virtual Controller** prefab into the scene.

   * Enter Play mode in the Editor to test the button functionality.

     ![CleanShot 2024-08-12 at 11.49.41](https://raw.githubusercontent.com/dengxian-xreal/Images/main/CleanShot%202024-08-12%20at%2011.49.41.gif)



### Further Reading

- [Unity Input System Documentation](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest)