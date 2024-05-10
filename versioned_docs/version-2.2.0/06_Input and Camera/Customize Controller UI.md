# Customize Controller UI

### Introduction

When we release the XREAL Light glasses to consumers, this will only include the glasses and not the computing unit that was part of the dev kit. You will be able to plug XREAL Light into your own Android phone and use the phone as a 3DOF controller.

![../../../_images/cpc1.jpg](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc1.jpg&width=300&dpr=4&quality=100&sign=f94348e418cf8be11d06aa9fee55d4ab349167d2a2d0a92b513e6e56bc604f54)

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

  ![../../../_images/cpc2.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc2.png&width=300&dpr=4&quality=100&sign=160f28cb751afff50a3f1bf29570f36543507e91ea263c094d11bc8fa96dcd34)

- Break this prefab.

  ![../../../_images/cpc3.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc3.png&width=300&dpr=4&quality=100&sign=ab26e53eff0b9f9a6313eac5f992c3d7fc00e3685092073462502257b876d4c4)

- Set the resolution of Game View in Unity Editor to 1080 x 2340.

  ![../../../_images/cpc4.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc4.png&width=300&dpr=4&quality=100&sign=76917fe81581a91baac6c3d8aaca0da10426d19c87a1d026514de92712505e8d)

- Double click the "NRVirtualDisplayer" object in Hierarchy to find it in Scene View, then you could design buttons or other UI as you like.

  ![../../../_images/cpc5.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc5.png&width=300&dpr=4&quality=100&sign=7965ca437016e708e029970c7b813daaa975ca94ca47cef52be41610326eb32d)

- Make sure three basic NRButton are set. If you don't need them, you could set these objects as false.

  ![../../../_images/cpc6.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc6.png&width=300&dpr=4&quality=100&sign=8afa0c73ebf3bff74e1408d3b8eba23f4d3988e8170804c14414871ce2ad35b3)

- If you want a sample scene, check the "Input-VirtualController" scene in SDK demos.

### How to Debug a custom virtual controller in Unity Editor

- Before clicking play in Unity Editor, the game view resolution should be set to normal, like 1920*1080. Then click Play, find the "NRInput" object in the scene, and enable the "EmulateVirtualDisplayInEditor" checkbox.

  ![../../../_images/cpc7.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc7.png&width=300&dpr=4&quality=100&sign=8c58c43a751809607ac3f90af2a67b8154a5d24bb34acce64ecbac770690c770)

- When the checkbox is ticked, a virtual controller will be shown at the right-bottom corner in the Game View. You can interact with this virtual controller with your mouse.

  ![../../../_images/cpc8.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fcpc8.png&width=300&dpr=4&quality=100&sign=2a7be030615d26f4e0dc50ff640f9c4aac26e026b6b159708f5a3bb893ec9edb)

- Be aware that once the emulator is enabled, all the controller button events will be fired from the virtual controller on the game screen. The original way(mouse button emulate controller button) would not work.