# Controlling

This section will explore mediums users can use to convert their thoughts and actions (input) into the mixed-reality world.

As of the current version, there is a 3 Degree-of-Freedom hand-held controller as well as the 6 Degree-of-Freedom head position gaze. 

#### Phone as a 3 DoF Controller

You can use the phone as a 3 DoF controller that is essentially identical to the previously mentioned disk shaped 3 DoF controller. To make controlling even easier though, the phone utilizes its extra space for a few added swipe gestures.

#### **Features**

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252F1DRCWcoFheYW1OO6668i%252Fimage.png%3Falt%3Dmedia%26token%3D1b7cf99a-1ab8-42ed-a13a-b73060539b1e&width=768&dpr=4&quality=100&sign=318abdae2137434abcafaa8685c39fa954ffe54eaecda8ef9d35fd20a3f8fb74)

**3 DoF (rotation) hand tracking**

- Suitable for most ray-based selection and manipulation, when the ray center does not need to be controlled by hand.

**6 DoF head tracking-based ray center**

- You can translate and rotate the controller's ray center by moving your head.

**Gestures compatible touchscreen**



| Gesture                                                      | Exemplar Use Case                                            |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Tap on trackpad                                              | Select                                                       |
| Press and hold on trackpad                                   | Manipulation (Drag)                                          |
| Double tap on trackpad                                       | Manipulation (Lock-on)                                       |
| Tap on home (bottom) Swipe from either edge towards the center | Back a step                                                  |
| Long press on home (bottom)                                  | Reset laser                                                  |
| Tap on app (top)                                             | Ray reset                                                    |
| Swipe from left to right                                     | Shuffling menu items to the right [on Hover] Rotating objects to face right [Locked-on] Enlarging objects |
| Swipe from right to left                                     | Shuffling menu items to the left [on Hover] Rotating objects to face left [Locked-on] Shrinking objects |
| Swipe from bottom to top                                     | Shuffling menu items to the top [on Hover] Rotating objects to face up [Locked-on] Moving objects further away |
| Swipe from top to bottom                                     | Shuffling menu items to the bottom [on Hover] Rotating objects to face down [Locked-on] Moving objects closer |

#### **Feedbacks**

**Phone vibration**

| Common Use Case                                    | Action               | Vibration Count | Vibration Duration |
| :------------------------------------------------- | :------------------- | :-------------- | :----------------- |
| On entering a selectable object                    | --                   | single          | short              |
| Select                                             | On release           | single          | short              |
| Step backwards                                     | On release           | double          | short              |
| Ray reset                                          | On press             | single          | long               |
| Returning to launcher                              | On hold On execution | single single   | on hold short      |
| Selecting an adjacent object trough swipe or click | On execution         | single          | short              |
| Object manipulation via swipe or circle drawing    | On finger movement   | multiple        | very short         |

**Common visual feedback**

- on hover - possible feedbacks include subject enlargement, change in color, animation from static, and bounding box.
- on select - possible feedbacks include subject pulsates in size, brightness, and bounding box color.

**Common auditory feedback**

- on enter
- on select
- on step backwards
- on ray reset
- on manipulation through trackpad swipes

#### Gaze

Controlling with the position and direction that the user is facing. It is best to use gaze in coordination with controller methods to enhance user experience. However, on rare occasions where both of the user's hands are occupied, gaze can be used to provide a dependable way for targeting and selecting.

#### **Features**

**6 DoF Head Tracking**

- Suitable for areal attention directing

**6 DoF Head Tracking with vision center**

- Suitable for targeting during extremely light interactions
- Suitable for targeting when both hands are not available

#### **Feedbacks**

**Visual feedback**

- on areal attention - possible feedbacks include subject enlargement, coloration, and start of animation. This effect is created by including a "not looking" mode where the app is less pronounced when attention is not directed to it. Some apps can go to sleep when they leave attention for a given amount of time.
- on enter - possible feedbacks include subject enlargement, change in color, animation from static, and bounding box.
- on select - possible feedbacks include subject pulsates in size, brightness, and bounding box color.

**on dwell select - display timer over vision center.**

**Auditory feedback**

- on enter
- on select
