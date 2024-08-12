# Camera

### Introduction

The XREAL XR Plugin utilizes Unity's XR Interaction Toolkit (XRI) for handling camera setups. This toolkit simplifies the process of setting up and configuring the camera for XR experiences, ensuring that the virtual environment is properly aligned with the real world.

### Installation and Configuration

1. **Install XR Interaction Toolkit**
   - Open the Unity Package Manager (`Window > Package Manager`).
   - Search for `XR Interaction Toolkit` and click `Install`.
2. **Enable XR Management**
   - Go to `Edit > Project Settings > XR Plug-in Management`.
   - Install and enable the necessary XR plug-in providers for your target platform (e.g., OpenXR, Oculus, etc.).

### Setting Up the XR Origin

1. **Add XR Origin**
   - In your scene, add an `XR Origin` object (`GameObject > XR > XR Origin`).
   - The `XR Origin` object will include components for managing the camera and tracking spaces.
2. **Configuring the Main Camera**
   - Ensure the `Main Camera` is a child of the `XR Origin` object.
   - The `Main Camera` should have its `Tag` set to `MainCamera`.

### Adjusting Camera Settings

1. **Camera Component Settings**
   - Select the `Main Camera` and configure its parameters:
     - **Field of View (FOV)**: Set according to the desired perspective.
     - **Clipping Planes**: Adjust the near and far clipping planes to control the rendering range.
     - **Clear Flags**: Choose how the background should be cleared (e.g., Skybox, Solid Color).
2. **Adding Components for XR Interaction**
   - Add `Tracked Pose Driver (Input System)` to the `Main Camera` to ensure it follows the head movements accurately.
   - Configure the `Tracked Pose Driver` to use the appropriate pose source.



### Further Reading

- [XR Interaction Toolkit Documentation](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest)
- [Unity Camera Documentation](https://docs.unity3d.com/Manual/class-Camera.html)