# NRSDK 2.2.0



:::info

**Download** [**NRSDKForUnity_Release_2.2.0.unitypackage**](https://public-resource.xreal.com/download/NRSDKForUnity_2.2.0_Release_20240301/NRSDKForUnity_Release_2.2.0.unitypackage)

:::

### What's New


- Loader

  Added a new Loader mode in the SDK. When this mode is selected, the algorithm library is loaded from the server (Nebula), significantly reducing the APK size. Furthermore, if there are no updates in Unity, the app can leverage the latest Nebula version to access new AR features without needing to re-import the SDK for updates.

* Dual Screen Display
  - Added dual-screen display mode. This mode allows for different displays on the main screen (phone) and the secondary screen (glasses). When the AR app is sent to the background, the glasses continue to display the AR application, while the phone screen can show any 2D app.


- HandTracking

  - Added recognition of the thumbs-up gesture.
  


- No longer support 32 bit application from this version.
- The minimum API Level required for the application to run is now Android API Level 29.
- Mono mode is now obsolete.

### Improvements


- 6 DoF Tracking
- The SLAM algorithm has been updated, resulting in more stable 6 DoF tracking.


- Hand Tracking

  - The latency of hand tracking has been minimized, ushering in a heightened level of responsiveness and contributing to an overall smoother user experience.
  - Marked advancements have been achieved in enhancing the stability of gesture tracking trajectories, effectively mitigating issues such as jitter and abrupt jumps.
  - The precision of gesture tracking has been significantly elevated, allowing for the meticulous recognition and tracking of intricate hand movements.
  - The algorithm governing gesture laser has undergone refinement, resulting in improved directionality and decreased latency. This modification ensures a more responsive and accurate representation of gesture lasers.
  - To use the hand tracking algorithm effectively, there are specific requirements for Android versions and device models. For details, please see [Requirements & Limits](https://app.gitbook.com/o/n9Gz0qLyZFcBAT9F8hDM/s/yXoV7SMVFQhr75lOIoQv/development/hand-tracking#requirements-and-limits).


- Meshing

  - The process of generating mesh has been optimized for greater speed and accuracy, enhancing the overall development experience.
- Introduced semantic labeling to our meshing feature, now capable of identifying and classifying mesh segments into 10 distinct categories: BACKGROUND, WALL, BUILDING, FLOOR, CEILING, HIGHWAY, SIDEWALK, GRASS, DOOR, and TABLE.


- Spatial Anchor

  - The addition of the anchor creation workflow enhances the visual appeal and user-friendliness of the system. This improvement allows for instant visual feedback, making the process of constructing reliable anchors more efficient and effective.
- Boosted the success rate of anchor detection and re-localization for a more stable AR experience.

### Bug Fixes


- Stability Issue with Ray Position in Hand Tracking Demo. Resolved an issue where the ray would deviate during the grab gesture simulation, ensuring consistent positioning throughout.

### Known Issues


- In the grab gesture execution, the system may first incorrectly recognize a pinch before identifying it as a grab.


- Under certain angles, performing pinch and grab gestures may cause the hand model to disappear.
