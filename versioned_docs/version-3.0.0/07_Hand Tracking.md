# Hand Tracking

Hand Tracking in XREAL SDK 3.0.0 is based on XRI (XR Interaction Toolkit) and XR Hands. This allows for more robust and flexible hand tracking capabilities, enabling developers to create immersive and interactive AR experiences.

⚠️结构和别的feature可以改成一致的

## XRI and XR Hands Integration

XR Interaction Toolkit (XRI), created by Unity and enhanced by XREAL, is an ideal starting point for XR projects. 

This page will teach you how to get set up with XR Hands using XREAL hand tracking and also get interactions working using XRI. If you haven't already, check out Unity's [documentation here](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.0/manual/index.html).

## What is XR Hands?

Unity provides an [XR Hands API](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.2/manual/index.html) for getting started with XR Hands and how to get Hand Tracking data from various sources.

XREAL provides a custom subsystem for users to use XREAL Hand tracking. Continue reading to see how to implement this.

## What is XRI?

Unity provides a set of interaction systems under the [XR Interaction Toolkit (XRI)](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.0/manual/index.html).

XRI provides XR-focussed interactions. It allows you to make one application which works on many platforms, devices and with various input sources (hand tracking, controllers, keyboards, joysticks etc).

Some available Interactors are:⚠️

- Poke: used for interacting with interactables by poking. Pose driven by the index finger's tip.
- [Near-Far](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.0/manual/near-far-interactor.html?q=near): utilizes both near and far interaction casters, allowing seamless transitions between different interaction types, replacing the need for using the XR Direct Interactor and the XR Ray Interactor. 
- Teleport: For indirect input, far field UI controls, teleporting, and summoning⚠️

We recommend exploring the capabilities of the XRI package to determine what is most useful for your project. Unity’s documentation and guides are a great place to get started.

XRI is usually controlled by the **Input System**. The hands-focussed examples Unity provide come with some specific Input Actions which are driven by **XR Hands**.

To get started with XRI when using Ultraleap Hand Tracking, continue reading.

### Setup Guide

1. Install [XR Hands](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.2/manual/index.html), [XRI](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.0/manual/index.html) and XR Plugin Management from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html).

   ![image-20240528183600612](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528183600612.png)

   ![image-20240528183620602](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528183620602.png)

2. And you are ready to build your [XRI](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.4/manual/index.html) project! To test out the [XR Interaction Toolkit (XRI)](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.4/manual/index.html) with hand interactions, install the XR Interaction Toolkit samples and the Unity Starter Assets Sample from the Package Manager. Then, you can run the Hand Interaction Demo in HandsDemoScene.

   > *Assets > Samples > XR Interaction Toolkit > 3.0.1 > Hands Interaction Demo > Runtime > HandsDemoScene.unity*

   ![image-20240528183824081](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528183824081.png)
