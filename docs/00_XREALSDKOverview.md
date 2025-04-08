---
slug: /
---
# XREAL SDK Overview

By utilizing the XREAL SDK, innovative mixed reality experiences are developed. Using a simple development process and a high-level API, XREAL SDK offers a set of powerful MR features and enables your XREAL glasses to understand the real world.

By leveraging the integration with Unity’s XR subsystem, the XREAL SDK has transitioned into a more robust and versatile framework compared to the previous NRSDK approach. Unlike NRSDK, which relied on proprietary APIs for development, the XREAL SDK now operates under the Unity XR Plugin umbrella. This integration allows developers to utilize the standard [XR Interaction Toolkit](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.0/manual/index.html) for handling interaction logic and [AR Foundation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@6.0/manual/index.html) to manage AR features effectively. Such a setup not only streamlines the development process by using high-level APIs but also significantly enhances cross-platform portability, enabling developers to create more sophisticated and versatile AR applications across various devices.

<img src="https://raw.githubusercontent.com/dengxian-xreal/Images/main/image-20240607142536106.png"  height = "500"  />

XREAL SDK supports the development environment of **Unity 2021.3.X and above**.

The core features provided by XREAL SDK are Spatial Computing, Optimized Rendering, and Interactions.

- **Spatial Computing** includes motion tracking, plane detection, image anchoring, and hand tracking, allowing the glasses to track their real-time position and orientation relative to the world and to understand the environment around them.

- **Optimized Rendering** is automatically applied to the applications and runs in the bacground to minimize latency and reduce judder, enhancing the overall user experience.

- **Intuitive Interactions** provide intuitive way of interactions.


### Spatial Computing

**6DoF Tracking** technology uses the two SLAM cameras located on both sides of the XREAL glasses to identify feature points, tracking how these points move over time. Combining the movement of these points with readings from the glasses’ IMU sensors, XREAL SDK accurately tracks both the position and orientation of the glasses as it moves through environment. 6DoF tracking also provides developers with real-time mapping constructions and 3D point clouds, giving the applications information on the physical structures of the environment.

<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnreal-public.nreal.ai%2Fdeveloper%2Fimg%2Fcorefeature01.gif&width=300&dpr=4&quality=100&sign=478bb33af5dd3fef519c963cfa870c6af3dc8714633bf8b78ac7241f560a4450" alt="https://nreal-public.nreal.ai/developer/img/corefeature01.gif" width="500" height = "300" />

**Plane Detection** enables Xreal glasses to detect flat surfaces (both horizontal and vertical) in the environment, such as a table or a wall. The transformation of the plane is continuously updated. When the glasses move around, the plane can be extended, and multiple planes can merge into one when they overlap.

<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnreal-public.nreal.ai%2Fdeveloper%2Fimg%2Fcorefeature02.gif&width=300&dpr=4&quality=100&sign=fd54d3c57e53478a3efc13a99869039a3656772999f41ca10b18867514401b6c" alt="https://nreal-public.nreal.ai/developer/img/corefeature02.gif" width="500" height = "300"  />

**Image Tracking** allows apps to recognize images and build augmented reality experiences around them. By adding additional images to the database, multiple images can be detected in a session, including the customized ones.

<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnreal-public.nreal.ai%2Fdeveloper%2Fimg%2Fcorefeature03.gif&width=300&dpr=4&quality=100&sign=8b194ff3de826873e38da04703f6cae700f11e43e82ba9cc6dc0d3474f9dcb48" alt="https://nreal-public.nreal.ai/developer/img/corefeature03.gif" width="500" height = "300"  />

**Hand Tracking** recognizes gestures and tracks joint poses of hands in real-time. Sharing the same coordinate systems with the glasses tracking, joint pose data accurately matches actual joint positions and orientations, allowing interactions with virtual objects in a highly immersive manner.

**Depth Mesh** utilizes advanced visual algorithms and tracking cameras to generate a 3D representation of the environment. By analyzing the visual data, it calculates the depth and geometry of objects, constructing continuous mesh matching a diverse array of surfaces of the environment. Depth mesh enhances the level of interactions between virtual objects and the real world, providing a significant boost to real-time occlusion rendering and collision detection between virtual and physical contents. As the glasses move, the mesh is dynamically updated, reflecting changes in the environment and offering real-time spatial awareness for applications.

**Spatial Anchor** provides the ability to create anchors that can be shared across different sessions and devices. These anchors are used to accurately place and maintain virtual objects at physical locations, even if the user relaunches the application.

### Optimized Rendering

XREAL SDK optimizes the rendering performance in the backend to minimize the latency of the entire system and to reduce judder. It provides a smooth and comfortable user experience devoid of dizziness and sickness. You do not need to enable or tune rendering specifications as they are automatically applied.

**Warping:** Instead of polling tracking data at the very beginning of each frame to render the image, XREAL SDK uses dynamically predicted poses of the glasses to warp the rendered image, reprojecting the warping frames to the displaybefore every VSync.

### Intuitive Interactions

**XREAL Phone Controller (3DoF)**: An Android mobile phone can serve as a 3DoF controller for XREAL SDK applications. The phone screen supports gestures and various other touchscreen actions to provide interaction options.

For more interaction models, please refer to the [Design Guide](https://docs.xreal.com/category/design-guide).
