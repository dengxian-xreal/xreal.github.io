# Hand Tracking

Hand Tracking in NRSDK 3.0.0 is based on XRI (XR Interaction Toolkit) and XR Hands. This allows for more robust and flexible hand tracking capabilities, enabling developers to create immersive and interactive AR experiences.

## XRI and XR Hands Integration

XR Interaction Toolkit (XRI), created by Unity and enhanced by Ultraleap, is an ideal starting point for XR projects. Designed for dual hand and controller usage (via Unity's XRHands feature), we strongly recommend leveraging XRI with OpenXR for a seamless experience.

This page will teach you how to get set up with XRHands using Ultraleap tracking and also get interactions working using XRI. If you haven't already, check out Unity's [documentation here](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.4/manual/index.html).

## What is XR Hands?

Unity provides an [XRHands API](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.2/manual/index.html) for getting started with XR Hands and how to get Hand Tracking data from various sources.

XREAL provides a custom subsystem for users that can not, or do not wish to use OpenXR for Hand tracking. Continue reading to see how to implement this.

## What is XRI?

Unity provides a set of interaction systems under the [XR Interaction Toolkit (XRI)](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.3/manual/index.html).

XRI provides XR-focussed interactions. It allows you to make one application which works on many platforms, devices and with various input sources (hand tracking, controllers, keyboards, joysticks etc).

Some available Interactors are:

- Direct - For triggering events or grabbing objects
- Ray - For indirect input, far field UI controls, teleporting, and summoning
- Poke - For direct UI (3D and 2D) and triggering events

We recommend exploring the capabilities of the XRI package to determine what is most useful for your project. Unity’s documentation and guides are a great place to get started.

XRI is usually controlled by the **Input System**. The hands-focussed examples Unity provide come with some specific Input Actions which are driven by **XRHands**.

To get started with XRI when using Ultraleap Hand Tracking, continue reading.

### Setup Guide

1. Install [XR Hands](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.2/manual/index.html), [XRI](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.4/manual/index.html) and XR Plugin Management from the Unity Registry in the [Package Manager](https://docs.unity3d.com/Manual/upm-ui.html).

   ![image-20240528183600612](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528183600612.png)

   ![image-20240528183620602](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528183620602.png)

2. And you are ready to build your [XRI](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.4/manual/index.html) project! if you want to test out [XRI](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.4/manual/index.html) with your hands, we recommend installing the XR Interaction Toolkit samples from the package manager then playing the Hand Interaction Demo.

3. In order to use the Hands Interaction Demo Sample, you will also need to install the Unity Starter Assets Sample

   ![image-20240528183824081](https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240528183824081.png)

   > *Assets > Samples > XR Interaction Toolkit > 3.0.1 > Hands Interaction Demo > Runtime > HandsDemoScene.unity*
