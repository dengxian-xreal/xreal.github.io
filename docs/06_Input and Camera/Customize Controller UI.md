# Customize Controller UI

### Introduction

You will be able to plug XREAL Light into your own Android phone and use the phone as a 3DOF controller.

![image-20240812171724008](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171724008.png)

So if you want to create unique experiences that stand out from the rest you can fully customize your MR app's phone controller interface.

**Notice**: Although this feature is for mobile phones, you could still use the computing unit and preview your customized controller interface.

### How to use a phone as controller

#### Controller Features Description

- 3DoF Tracking
- TouchpadRepresents "Trigger" button, and is also used as a touchpad. It can detect touching and swiping.
- Home ButtonClick to call "Exit App" menu. Press and hold to recenter your controller. We would advise developers to not use this button when developing apps.
- App Button Can be freely customized for your app, e.g. click to open an in-app menu or perform a special action.

#### Two ways to use

One of the great things about the XREAL phone controller is that you could easily customize its UI interface. Here are two ways to use XREAL phone controller:

- The default way Simply drag the "NRInput" prefab into your scene. Then when you run the app on your device, a default virtual controller("NRVirtualDisplayer" prefab) will be automatically loaded. It has 3 common controller buttons(Trigger, Home, App) on it. This virtual controller is very similar to XREAL Light controller.
- The custom way Drag the "NRInput" prefab into your scene. Then drag the "NRVirtualDisplayer" prefab into your scene and modify it according to your needs. For example, add some new buttons or change the style of the controller UI to match your application.

### Developer Guide

- Find the "NRVirtualDisplayer" prefab, and drag it to your scene.

  ![image-20240812171252248](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171252248.png)

- Break this prefab.

  ![image-20240812171236486](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171236486.png)

- Set the resolution of Game View in Unity Editor to 1080 x 2340.

  ![image-20240812171218976](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171218976.png)

- Double click the "NRVirtualDisplayer" object in Hierarchy to find it in Scene View, then you could design buttons or other UI as you like.

  ![image-20240812171158821](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171158821.png)

- Make sure three basic NRButton are set. If you don't need them, you could set these objects as false.

  ![image-20240812171145296](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171145296.png)

- If you want a sample scene, check the "Input-VirtualController" scene in SDK demos.

### How to Debug a custom virtual controller in Unity Editor

- Before clicking play in Unity Editor, the game view resolution should be set to normal, like 1920*1080. Then click Play, find the "NRInput" object in the scene, and enable the "EmulateVirtualDisplayInEditor" checkbox.

  ![image-20240812171127216](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171127216.png)

- When the checkbox is ticked, a virtual controller will be shown at the right-bottom corner in the Game View. You can interact with this virtual controller with your mouse.

  ![image-20240812171108176](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812171108176.png)

- Be aware that once the emulator is enabled, all the controller button events will be fired from the virtual controller on the game screen. The original way(mouse button emulate controller button) would not work.