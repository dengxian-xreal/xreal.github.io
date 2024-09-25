# Mapping Example Scene

## MappingExample

The Mapping Example scene is a part of an SDK that provides an interactive demonstration of working with Spatial Anchors. The experience enables users to create, place, save, and reload anchors within the augmented reality environment.

To access the "MappingExample" scene, follow these steps:

1. After importing the SDK package into your Unity project, navigate to the "Scenes" folder in the Project window.
2. Locate and open the "MappingExample" scene.
3. Explore the scene hierarchy and components to understand how the `AnchorItem` script is used.
4. Run the scene in the Unity Editor or build it for your device to see the Spatial Anchor functionality in action.

### Experience Flow

<img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/anchor.gif"/>

**1.Opening the Anchor Panel** 

After entering the MappingExample scene, users can click the OpenAnchorPanel button to reveal the Anchor panel.

**2.Selecting and Placing an Anchor** 

Three anchor options will appear. Users can select any of these anchors using a hand-held controller and then position the anchor in a specific location within the real world.

**3.Scanning the Surroundings** 

Before saving the anchor, users are advised to observe the surroundings by simply looking around while wearing the headset. This step ensures that sufficient feature points are collected, enhancing the stability and accuracy of the anchor. During the process, the quality indicator will distribute some capsules evenly around the anchor. The capsules represent the quality of the feature points in different directions around the anchor.

> The color of the capsules indicates the quality:
>
> - 🟥 Red: Low quality
> - 🟨 Yellow: Medium quality
> - 🟩 Green: High quality
>
> When the process is successfully complete, the capsules will all turn to green, which indicates that the anchor is now ready to be used.

**4.Saving the Anchor** 

Once sufficient feature points have been gathered, users can click Save. Successful saving turns the anchor green, signaling that it has been anchored to that location in the real world.

**5.Exiting and Reopening the Application** 

Users may exit the application and reopen it at any time.

**6.Loading the Anchor** 

After reopening the application, clicking Load will reload the previously saved anchor. By returning to the physical location where the anchor was originally placed, users can observe the anchor successfully loading back into the scene.

### Creating Spatial Anchors with NRSDK

**1. Create a NRWorldAnchor object**

- Create a GameObject in the Unity scene.
- Add the NRWorldAnchor component to the GameObject.
- Set the necessary properties, such as UserDefinedKey.

**2. Create the anchor**

Call the `NRWorldAnchor.CreateAnchor()` method. This method takes the current position and rotation of the GameObject as the position and rotation of the anchor. NRSDK will create the anchor asynchronously and eventually notify the application of the creation result through the OnTrackingChanged event.

**3. Estimating the mapping quality**

> **Note:**
>
> The `NRWorldAnchor.SetEstimateRange()` method is deprecated since NRSDK 2.3.1. Now, you can directly call the `NRWorldAnchorStore.UpdateMapQuality()` method to estimate the mapping quality of the anchor during creation. If you want to guide users to observe the anchor within a specified range, you can set the `angle range` in the `Map Quality Indicator` component.

<img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240925200344421.png"/>

Call the `NRWorldAnchor.SetEstimateRange()` method. This medthod allows you to set the observation angle and distance used for estimating the mapping quality. The observation angle refers to the range of the area around the anchor that needs to be observed. The observation distance refers to the distance between the observer and the anchor.

```
    public enum NREstimateDistance
    {
        NR_ESTIMATE_DISTANCE_UNKNOWN = 0,
        NR_ESTIMATE_DISTANCE_NEAR = 1, //0~0.5m
        NR_ESTIMATE_DISTANCE_MEDIUM = 2, //0.5~1.5m
        NR_ESTIMATE_DISTANCE_FAR = 3 // 1.5m~2.5m
    }
```

Call the `NRWorldAnchorStore.UpdateMapQuality() `method to estimate the mapping quality of the anchor during creating. This method will return an NREstimateQuality value indicating the current mapping quality.

**4. Save the anchor**

Call the `NRWorldAnchor.SaveAnchor()` method after the anchor is created successfully. This method saves the information and related metadata of the anchor as a file to the device storage.

**5. Use the anchor**

Call the `NRWorldAnchorStore.LoadwithUUID` method to load a saved anchor. The application can use the NRWorldAnchor.UUID to identify and reference a specific anchor. After loading is successful, the application can get the position and rotation of the anchor and use it for AR experiences.

> Things to note:
>
> - Creating an anchor takes time, and the application should handle the creation result in the OnTrackingChanged event.
> - The application should save the anchor at the appropriate time, such as before the user leaves the AR experience.
> - The application should check the CurrentAnchorState of the anchor before using it to make sure the anchor is available.
> - The mapping quality may change over time as the environment changes, and the application should continuously monitor the quality and update the indicator.

### LocalMapExample class

#### Overview

The `LocalMapExample` class is responsible for handling world anchors in the local map. It provides functionalities for loading, saving, destroying, and adding anchors. The class also includes methods to control anchor panels and manage user interactions with anchors.

#### Properties

- `m_NRWorldAnchorStore`: Represents the NR world anchor store.
- `m_AnchorPanel`: A transform for controlling the anchor panel's visibility.
- `target`: Holds the target transform for the anchor item.
- `m_AnchorPrefabDict`: A dictionary to store and manage anchor prefabs.
- Settings: Provides access to settings of the MapQualityIndicator.

#### Methods

```
Start()
```

- Initializes the anchor items and the NR world anchor store.
- Associates anchor items with their keys.
- Disables the anchor panel initially and sets trackable anchor enabled for native configurations.

```
Update()
```

- Listens for the trigger button press on the controller and calls the `AddAnchor` method if a target is set.

```
OnApplicationPause(bool pause)
```

- Restarts anchor tracking coroutine when the application resumes.

```
SwitchAnchorPanel()
```

- Toggles the visibility of the anchor panel.

```
OnAnchorItemClick(string key, GameObject anchorItem)
```

- Handles anchor item clicks and configures the target according to the clicked anchor item.

```
OnAnchorStateChanged(NRWorldAnchor anchor, MappingState state)
```

- Handles changes in the state of an anchor and updates the MapQualityIndicator accordingly.

```
Load()
```

- Loads all anchors from the `NRWorldAnchorStore`, reinstantiating them in the scene.

```
Save()
```

- Saves all anchors to the `NRWorldAnchorStore`.

```
Destroy()
```

- Destroys the `NRWorldAnchorStore`, removing all anchors from memory.

```
Erase()
```

- Erases all saved anchors from the persistent storage.

```
AddAnchor()
```

- Instantiates a new anchor based on the current target.



### AnchorItem Class

#### Overview

The `AnchorItem` class represents individual anchor items. It provides functionalities for saving, erasing, destroying, and managing the visual appearance of anchors.

#### Properties

- `key`: Represents the key associated with the anchor item. This key **must** be unique for each spatial anchor. If two spatial anchors have the same key, it may cause unexpected behavior or bugs.
- `OnAnchorItemClick`: An action event for handling anchor item clicks.
- `canvas`: Associated canvas object for display.
- `anchorUUID`: The UUID text associated with the anchor.
- `m_NRWorldAnchor`: The associated NR world anchor.
- `anchorState`: The AnchorState text associated with the anchor. 


```
Start()
```

Initializes the NR world anchor and sets up tracking state color indicators.

```
Save()
```

Saves the anchor to the NR world anchor store.

```
Erase()
```

Erases the anchor from the NR world anchor store.

```
Destroy()
```

Destroys the NR world anchor object.

```
OnPointerClick(PointerEventData eventData)
```

Handles pointer clicks on the anchor item and invokes the `OnAnchorItemClick` action.

```
Remap()
```

Restart mapping the NR world anchor.

### NRWorldAnchorStore Class

The `NRWorldAnchorStore` class manages the storage, creation, and retrieval of spatial anchors, known as `NRWorldAnchor`, within an application. It provides a unified interface for handling anchors, including tracking their states, saving them to persistent storage, and retrieving them as required.

The class is highly tailored to work with the underlying native mapping system and the Unity editor, as seen by the conditional compilation directives. It manages the anchors' lifecycle, ensures their persistence across sessions, and facilitates their efficient retrieval and updates.

#### Properties

- **m_NativeMapping:** The native interface for mapping operations.
- **m_AnchorDict:** A dictionary containing the anchors, indexed by unique 64-bit identifiers.
- **m_Anchor2ObjectDict:** A dictionary mapping anchor UUIDs to user-defined keys.
- **Instance:** A singleton instance of the NRWorldAnchorStore.
- **CreatingAnchorHandle**: The handle of anchor under creating. 
- **RemappingAnchorHandle**: The handle of anchor under remapping. 
- **IsCreatingNewAnchor**: The flag indicating whether a new anchor is being created. 
- **IsRemapping**: The flag indicating whether an anchor is being remapped.
- **MapFolder:** The constant folder name where the anchor maps are stored.
- **MapPath:** The absolute path to the anchor maps folder.
- **Anchor2ObjectFile:** The constant filename for anchor-to-object mapping.

#### Methods

```
NRWorldAnchorStore()
```

Initializes the NRWorldAnchorStore. It sets up the mapping path and reads existing anchors if any.

```
Dispose()
```

Cleans up the WorldAnchorStore and releases memory.

```
OnUpdate()
```

Executes the 'update' action for native mapping and tracking of anchors.

```
CreateAnchor(NRWorldAnchor anchor): bool
```

Creates an NRWorldAnchor and returns true if successful.

```
BindAnchor(NRWorldAnchor anchor, UInt64 handle)
```

Binds a specified anchor with a given handle.

```
UpdateMapQuality(NRWorldAnchor anchor, Pose pose): NREstimateQuality
```

Update the mapping quality of an anchor by observer pose.

```
Remap(NRWorldAnchor anchor): bool
```

Rebuild the feature map of the anchor.

> **Note:**
>
> The `SetEstimateRange()` method is deprecated since NRSDK 2.3.1. 

```
SetEstimateRange(UInt64 anchor_handle, float angle, NREstimateDistance distance): bool
```

Set the estimate range of the anchor.

> **Note:**
>
> The `GetEstimateRange()` method is deprecated since NRSDK 2.3.1. 

```
GetEstimateRange(UInt64 anchor_handle, ref float angle, ref NREstimateDistance distance): bool
```

Get the estimate range of the anchor.

```
SaveAnchor(NRWorldAnchor anchor): bool
```

Saves the provided NRWorldAnchor with the UserDefinedKey. Returns true if successful.

```
SaveAllAnchors(): bool
```

Saves all NRWorldAnchor and returns true.

```
DestroyAnchor(NRWorldAnchor anchor): bool
```

Destroys a specified NRWorldAnchor from the store and returns true if successful.

```
Destroy()
```

Clears all NRWorldAnchors.

```
EraseAnchor(NRWorldAnchor anchor): bool
```

Erases a specified NRWorldAnchor from disk and returns true if successful.

```
LoadwithUUID(string uuid, Action<UInt64> action)
```

Loads a NRWorldAnchor from disk for the given identifier and executes the provided action if successful.

```
GetLoadableAnchorUUID(): Dictionary<string, string>
```

Returns a dictionary of UUIDs and user-defined keys that can be loaded.

### **Loading Spatial Anchor**

In the `MappingExample`, special care is required when loading previously saved Spatial Anchors in the subsequent Session. The Anchor to be loaded (referred to as `AnchorItem` in the example) must exist in the scene, and its key value must be consistent with the key value at the time of saving. Even though the active state of the AnchorItem should be false, or the GameObject placed at a great distance beyond the Camera's display range to ensure it is not visible, it is essential that the AnchorItem be present in the scene.

The logic behind this requirement lies within `LocalMapExample.cs`. During scene initialization, the method `FindObjectsOfType<AnchorItem>()` is employed to find all `AnchorItem` objects within the scene and assign them to `m_AnchorPrefabDict`. This dictionary is further utilized to reinstantiate the actual `AnchorItem` objects appearing in the scene.

Here's a part of the code that demonstrates this:

```
private void Start()
{
    var anchorItems = FindObjectsOfType<AnchorItem>();
    foreach (var item in anchorItems)
    {
        item.OnAnchorItemClick += OnAnchorItemClick;
        m_AnchorPrefabDict.Add(item.key, item.gameObject);
    }
    ...
}
```
