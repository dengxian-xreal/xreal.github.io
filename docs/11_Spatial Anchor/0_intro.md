# Spatial Anchor

### Introduction

Spatial Anchors are fixed reference points in the AR environment that provide a stable position and orientation for virtual objects, allowing them to remain consistent across different sessions.

By creating a spatial anchor at a specific 6DoF pose (position and orientation), virtual content can be placed relative to it. This allows for the resumption of AR sessions and the restoration of content to the exact real-world locations where users left them. This plays a crucial role in providing users with a consistent and reliable AR experience, as they can see the persistently present virtual content at the same location, no matter when they return or restart the application. The XREAL SDK provides Spatial Anchor functionality for XREAL glasses, enabling developers to easily create and manage spatial anchors in their Unity projects.

![img_v3_02du_0e56d7a1-01e6-4ba9-bb06-7a19b9f7cbfg](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/img_v3_02du_0e56d7a1-01e6-4ba9-bb06-7a19b9f7cbfg.jpg)

### Main Features

- Easily create and manage spatial anchors in Unity
- Save and load spatial anchors
- Support user interactions, such as clicking on spatial anchors
- Show mapping quality during spatial anchor creation.

### Best Practice

1. After adding a spatial anchor, it is essential to observe the surrounding environment thoroughly, with the spatial anchor as the focal point. This procedure ensures that the added anchor can be reliably located in multiple sessions.
   1. Characteristics of a high-quality observation environment include:
      1. Adopting the anchor as the observational center and moving in various directions, such as forward, backward, left, and right, to ensure an ample observational perspective.
      2. Maintaining smooth and slow movement.
      3. Allotting an observation time between 5 and 15 seconds.
   2. Factors that can degrade the quality of the observation environment:
      1. Rapidly changing the viewpoint after adding the anchor, causing the anchor to leave the field of vision.
      2. Quick movements or turning of the head.
      3. Saving the anchor immediately after adding it, without adequately observing the environment.
   3. Elements of a high-quality visual environment are:
      1. Even lighting.
      2. Rich textural detail.
      3. Appropriate distance between 0.5 and 3 meters.
   4. Characteristics of a low-quality visual environment include:
      1. Poor lighting conditions.
      2. Transparent, semi-transparent, or reflective surfaces.
      3. Absence of texture, such as white walls.
2. Avoid attaching object to spatial anchors that are more than 3 meters away. Please create a new spatial anchor for the attachment of object. Any inaccuracies in the pose are magnified when an object is distanced from the spatial anchor.
3. Utilize parent-child relationships to create a transformation hierarchy between the tightly arranged virtual object and their corresponding spatial anchors. This helps to maintain consistent relative positioning of the virtual object.
4. To optimize system performance, destroy unused spatial anchors and only load the spatial anchors that are needed.
