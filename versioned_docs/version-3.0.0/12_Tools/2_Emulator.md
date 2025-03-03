# Simulator

After integrating the Unity XR Interaction Toolkit, XREAL SDK supports using the XR Device Simulator for testing applications without physical AR glasses. This simulator provides a convenient way to test and debug your AR applications directly in the Unity Editor.

## Setup Instructions

1. Import the XR Device Simulator from the XR Interaction Toolkit samples:
   - Open Package Manager (Window > Package Manager)
   - Select "XR Interaction Toolkit" package
   - Go to "Samples" tab
   - Import "XR Device Simulator"

  ![image-20241230153527317](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241230153527317.png)

2. Enable the simulator:
   - In your scene, ensure the XR Device Simulator component is active
   - Check that the simulator is properly configured in your project settings

  ![image-20241230153829887](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241230153829887.png)

## Basic Controls

The XR Device Simulator allows you to:
- Simulate head movement (mouse + right mouse button)
- Move in the scene (WASD keys)
- Manipulate virtual controllers
- Test AR interactions without physical devices

## Best Practices
- Use the simulator during early development stages
- Test critical features with actual AR glasses before deployment
- Remember that simulator behavior might slightly differ from real device performance
