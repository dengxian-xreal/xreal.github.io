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

![../../../_images/ht1-1.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-1.png&width=300&dpr=4&quality=100&sign=62618d5f173e80dc75b409ce9f523fb3a52ceaf2a49fab14f50532c2e2e2fed1)

#### Select Gesture

![../../../_images/ht1-2.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-2.png&width=300&dpr=4&quality=100&sign=6974a1520deebde1d3b2a0ee9e1b300caf6fa54ada36ed29a98495ce4b019dc7)

- As long as the index finger and thumb pinch together (regardless of the pose of other fingers), it is considered a pinch pose.
- Gestures above will all be recognized as pinch/select.

#### System Gesture

![../../../_images/ht1-3.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-3.png&width=300&dpr=4&quality=100&sign=1f995f2f4e4dcd2fed45ae8f2d23cdc4d5c7c41482a9802b3413bcd8db1df6ff)

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

![../../../_images/ht1-4.png](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-4.png&width=300&dpr=4&quality=100&sign=165138e8043507741314c73f2cd4746dd0c1d7dcc3357a07b33993d950393cb7)

### Requirements & Limits

**Device compatibility**

To ensure optimal algorithm performance, it is recommended to use specific smartphone models and versions, as different manufacturers and Android versions may affect the algorithm's effectiveness.

- **Samsung S22**: OneUI 5.1
- **Samsung S23**: OneUI 5.1, OneUI 6.0
- **HUAWEI P60 Pro**: HarmonyOS 4.0.0
- **OPPO Find X6 Pro**: Android 13

Hand tracking can also run on devices besides the above, the stability however is not guaranteed. For the full compatibility list, please refer to[ Device Compatibility](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/xreal-devices/compatibility).

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

1. Create a new project in Unity with NRSDK. Refer to [Getting Started with NRSDK](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/quickstart-for-android) for more setting up instructions.
2. Delete the `Main Camera` from the scene hierarchy.
3. Find `NRCameraRig` and `NRInput` prefab from `Assets>NRSDK>Prefabs>NRCameraRig`. Drag them to the scene hierarchy.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-5.png&width=768&dpr=4&quality=100&sign=4290b47ae27f4d90b59fc88c535330ea0b6b5d2951eee121afdb7f8d52868a5d)

4. Select the `NRInput` GameObject in the `Hierarchy` window to open the `Inspector` window, and choose `Hands` as `Input Source Type`.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-6.png&width=768&dpr=4&quality=100&sign=840a099b4456aad1d9244ca19377720e2644adbd6ec994ffb0bdf16df94ec4da)

5. Find `NRHand_R` and `NRHand_L` from `Assets>NRSDK>Prefabs>Hands`. Add them as child GameObjects of `Left` and `Right` anchor in `NRInput` correspondingly. 

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fnrealsdkdoc.readthedocs.io%2Fen%2Flatest%2F_images%2Fht1-7.png&width=768&dpr=4&quality=100&sign=6c08049dc8ff32d440478f4f9cd43c4ab4954da622e3c0b2aa58627e5c393ce9)

6. Now you are ready for hand tracking, refer to [Tutorial: Manipulating an Object](https://xreal.gitbook.io/nrsdk/development/input-and-camera/interact-with-unity-ui-tutorial) for adding more interactions with objects.

Samples are included in the Unity package. Please refer to `Assets>NRSDK>Demos>HandTracking` for details.
