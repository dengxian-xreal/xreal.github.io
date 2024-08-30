# Hand Tracking

### Introduction

NRSDK’s Hand Tracking capability tracks the position of key points of your hands and recognizes hand poses in real-time. Hand poses are shown in the first-person view and used to interact with virtual objects immersively in-world.

**Capabilities:**

- The NRSDK can track hands through the world coordinate frame and annotated the position and orientation of twenty-three key points；
- The NRSDK currently supports six hand poses from either hand;
- While tracking hand poses, the NRSDK also returns to a state of whether there are hands being tracked;
- Left/Right hand detection is available in NRSDK;
- When using hands as input, the hand’s pose drives a laser cursor-pointer that behaves like the standard controller cursor.

### Gestures

#### General Gesture

  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/Hand%20Tracking%20AVIF.png" alt="Description" style={{ width: '600px', height: 'auto' }} class="center-image"  />

#### Select Gesture

  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/Hand%20Tracking%20AVIF2.png" alt="Description" style={{ width: '600px', height: 'auto' }} class="center-image"  />

- As long as the index finger and thumb pinch together (regardless of the pose of other fingers), it is considered a pinch pose.
- Gestures above will all be recognized as pinch/select.

#### System Gesture

  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/111.png" alt="Description" style={{ width: '600px', height: 'auto' }} class="center-image"  />

- Keep this gesture for 1.2s to evoke the home menu.
- Both left and right hands will be recognized.

### Hand Pointer

Similar to a controller, NRSDK provides a pointer for each hand to interact with targets. The pointer pose and whether the pointer pose is being tracked can be obtained from `HandState` of each hand.

The pointer pose must meet the following conditions to be correctly tracked:

- The hand is recognized
- The palm direction is pointing forward

A basic hand pointer style is included in `NRHand_R` and `NRHand_L` prefabs located in `Assets>NRSDK>Prefabs>Hands`. You can also customize the style of Hand Pointer based on the pointer pose and related data, combined with some data in NRPointerRaycaster.

### Joint

The NRSDK hand tracking system identifies the position of 23 key points on the hand for every recognized hand pose(position and orientation).

#### Index


| Index | API Name        |
| :---- | :-------------- |
| 0     | Wrist           |
| 1     | Palm            |
| 2     | ThumbMetacarpal |
| 3     | ThumbProximal   |
| 4     | ThumbDistal     |
| 5     | ThumbTip        |
| 6     | IndexProximal   |
| 7     | IndexMiddle     |
| 8     | IndexDistal     |
| 9     | IndexTip        |
| 10    | MiddleProximal  |
| 11    | MiddleMiddle    |
| 12    | MiddleDistal    |
| 13    | MiddleTip       |
| 14    | RingProximal    |
| 15    | RingMiddle      |
| 16    | RingDistal      |
| 17    | RingTip         |
| 18    | PinkyMetacarpal |
| 19    | PinkyProximal   |
| 20    | PinkyMiddle     |
| 21    | PinkyDistal     |
| 22    | PinkyTip        |


#### Joint Orientation

![1](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/1.png)

### Requirements & Limits

**Device compatibility**

To ensure optimal algorithm performance, it is recommended to use specific smartphone models and versions, as different manufacturers and Android versions may affect the algorithm's effectiveness.

- **Samsung S22**: OneUI 5.1
- **Samsung S23**: OneUI 5.1, OneUI 6.0
- **HUAWEI P60 Pro**: HarmonyOS 4.0.0
- **OPPO Find X6 Pro**: Android 13

Hand tracking can also run on devices besides the above, the stability however is not guaranteed. For the full compatibility list, please refer to[ Device Compatibility](./01_XREALDevices/Compatibility.md).

**Influence of Unity Packaging on APK:**

The current gesture recognition application supports **only Android SDK Target API 29**. Higher versions of the API may activate enhanced security restrictions, which can affect access to SNPE resources.

**Backgrounds & Camera**

- Hand tracking SDK uses on-board camera(s) to detect hands, so make sure hands are visible from the camera.
- Avoid complicated backgrounds, solid backgrounds are preferred;
- Avoid backlight or low light, or unbalanced lighting conditions in camera frame；

**Gesture**

- Avoid stacked or interlaced fingers for either hand；
- Avoid the hands of different people;
- Avoid fast-moving;
- There are chances that the orientations of the joints are recognized converted. If so, please move your hands out of the visible fields and move them back again.

### Developer Guide

#### Common Usage Of Hand Tracking

**Sample Use Case:**

```
//returns true if input source switch to hand tracking success
  bool switchToHandTracking = NRInput.SetInputSource(InputSourceEnum.Hands);

  //returns true if input source switch to controller success bool
  switchToController = NRInput.SetInputSource(InputSourceEnum.Controller);

  //returns true if hand tracking is running bool isRunning =
  NRInput.Hands.IsRunning;

  //returns the NRHand of right-handness NRHand hand =
  NRInput.Hands.GetHand(HandEnum.RightHand);

  //returns true if user is now performing system gesture bool
  isPerformingSystemGesture = NRInput.Hands.IsPerformingSystemGesture();
```

**Details Of HandState:**

```
  //returns the HandState of  right-handness
  HandState handState = NRInput.Hands.GetHandState(HandEnum.RightHand);

  //returns the handness of this hand
  HandEnum handEnum = handState.handEnum;

  //returns true if this hand is tracked
  bool isTracked = handState.isTracked;

  //returns the start pose of hand ray pointer
  Pose pointerPose = handState.pointerPose;

  //returns ture if hand ray pointer pose is valid
  bool pointerValid = handState.pointerPoseValid;

  //returns true if this hand is performing pinching
  bool isPinching = handState.isPinching;

  //returns the current pinch strength value of hand. The range is from 0 to 1
  float pinchStrength = handState.pinchStrength;

  //returns the current gesture of hand
  HandGesture handGesture = handState.currentGesture;

  //returns the pose which contains position and orientation of thumb tip joint
  Pose thumbTipPose = handState.GetJointPose(HandJointID.ThumbTip);
```

#### Enabling Hand Tracking

1. Create a new project in Unity with NRSDK. Refer to [Getting Started with NRSDK](./02_Getting%20Started%20with%20NRSDK.md) for more setting up instructions.

2. Delete the `Main Camera` from the scene hierarchy.

3. Find `NRCameraRig` and `NRInput` prefab from `Assets>NRSDK>Prefabs>NRCameraRig`. Drag them to the scene hierarchy.

   ![image-20240812172438111](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812172438111.png)

4. Select the `NRInput` GameObject in the `Hierarchy` window to open the `Inspector` window, and choose `Hands` as `Input Source Type`.

   ![image-20240812172454370](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812172454370.png)

5. Find `NRHand_R` and `NRHand_L` from `Assets>NRSDK>Prefabs>Hands`. Add them as child GameObjects of `Left` and `Right` anchor in `NRInput` correspondingly. 

   ![image-20240812172509939](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812172509939.png)

6. Now you are ready for hand tracking, refer to [Tutorial: Manipulating an Object](./06_Input%20and%20Camera/Interact%20with%20Unity%20UI.md) for adding more interactions with objects.

Samples are included in the Unity package. Please refer to `Assets>NRSDK>Demos>HandTracking` for details.
