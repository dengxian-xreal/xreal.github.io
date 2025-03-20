# Anchors

The **Anchors** scene within the XREAL SDK offers an interactive demonstration of how to work with Spatial Anchors using AR Foundation. This experience allows users to create, position, save, and reload anchors within an augmented reality environment, providing a practical understanding of anchoring virtual content to real-world positions.

### Experience Flow

To quickly experience the functionality of anchors, download the provided APK and follow the steps below to explore various anchor operations. For those interested in further development, please refer to the Developer Guide in the next section.

**1.Create an Anchor** 

When users click the Create button, an anchor will appear. They can then use a phone or Beam Pro as a controller to position the anchor anywhere within the real world.

**2.Scanning the Surroundings** 

Before saving the anchor, users are advised to observe the surroundings by simply looking around while wearing the headset. This step ensures that sufficient feature points are collected, enhancing the stability and accuracy of the anchor. During the process, the quality indicator will distribute some capsules evenly around the anchor. The capsules represent the quality of the feature points in different directions around the anchor.

> The color of the capsules indicates the quality:
>
> - 🟥 Red: Low quality
> - 🟨 Yellow: Medium quality
> - 🟩 Green: High quality
>
> When the process is successfully complete, the capsules will all turn to green, which indicates that the anchor is now ready to be used.

**3.Saving the Anchor** 

Once sufficient feature points have been gathered, users can click `Save`. Successful saving turns the anchor green, signaling that it has been anchored to that location in the real world.

**4.Exiting and Reopening the Application** 

Users may exit the application and reopen it at any time. By clicking Load All Anchors, you’ll find that the anchors you previously saved reappear exactly where they were.

## Developer Guide

This guide will walk you through implementing spatial anchors using the XREAL SDK in combination with AR Foundation. The guide covers project setup, anchor creation, mapping quality estimation, saving, using, loading, removing, and erasing spatial anchors.

### Project Setup

Before using Spatial Anchors, ensure your project is properly configured. Refer to the [**Getting Started with XREAL SDK**](../02_Getting%20Started%20with%20XREAL%20SDK.md) guide for the necessary setup. If you’ve completed this setup, locate the “AR Feature” sample, specifically the **Anchors** scene, and build it. You can also modify this sample to suit your needs.

### Implementation

#### Create a Spatial Anchor

To create a spatial anchor:

1. Define the anchor’s position and rotation relative to the camera’s transform.

2. Instantiate an ARAnchor prefab at the desired location. 

```
public void OnNewButtonClick()
{
    var targetPos = m_Camera.transform.position + m_Camera.transform.forward * 1f;
    var targetRotation = m_Camera.transform.rotation;
    var anchor = Instantiate(m_ARAnchorPrefab, targetPos, targetRotation);
}
```

#### Estimating the mapping quality(Optional)

When creating an anchor, it’s important to assess the environment’s scanning quality to ensure reliable anchor loading in the future. Use environment quality assessment methods during anchor creation.

```
public void OnNewButtonClick()
{
    //...
    var anchor = Instantiate(m_ARAnchorPrefab, targetPos, targetRotation);
    
    MapQualityIndicator.SetCurrentAnchor(anchor, false);
    MapQualityIndicator.ShowMappingGuide();
    
    Debug.Log($"[Anchors] Created Anchor at {targetPos}");
}
    
```

#### Save a Spatial Anchor

After creating an anchor, save it using the SaveAnchor() method to store its information and metadata on the device.

```
public void AddSavedAnchorEntry(TrackableId trackableId, SerializableGuid persistentGuid)
{
    if (m_SavedAnchorEntryDict.TryGetValue(trackableId, out var savedAnchorEntry))
    {
        savedAnchorEntry.PersistentGuid = persistentGuid;
    }
    else
    {
        m_SavedAnchorEntryDict.Add(trackableId, new SavedAnchorEntry
        {
            TrackableId = trackableId,
            PersistentGuid = persistentGuid
        });
    }
}
```

#### Remap a Spatial Anchor

When environmental conditions change—such as variations in lighting, shifts in object positions, or alterations in the surroundings—the spatial anchor data may no longer accurately correspond to the current environment. In these cases, it is necessary to update the anchor’s associated information by re-scanning and re-mapping the environment. This process can be achieved using the Remap method.

![image-20240815145540092](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240815145540092.png)

```
    private void OnRemapClick()
    {
        Log($"[AnchorInfo] OnRemapClick begin");
        if (m_AnchorManager.subsystem is XREALAnchorSubsystem subsystem)
        {
            bool success = m_AnchorManager.TryRemap(m_Anchor.trackableId);
            MapQualityIndicator.SetCurrentAnchor(m_Anchor, true);
            MapQualityIndicator.ShowMappingGuide();
            Log($"[AnchorInfo] OnRemapClick result={success}");
        }
    }
```

#### Remove a Spatial Anchor

To remove an anchor from the scene without deleting it permanently: 

Just remove the script `Anchors` from the anchor gameObject.

#### Load a Spatial Anchor

Load previously saved anchors into the scene:

```
public void OnLoadAllButtonClick()
{
    LoadAllAnchors();
}
```

#### Erase a Spatial Anchor

To permanently delete an anchor, ensuring it cannot be restored:

```
public void OnEraseAllButtonClick()
{
    var anchors = FindObjectsByType<ARAnchor>(FindObjectsSortMode.None);
    foreach (var anchor in anchors)
    {
        EraseAnchor(anchor.trackableId);
    }
}
```

### Further Reading

For more detailed information on working with anchors, refer to the official [AR Foundation Anchors Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@6.0/manual/features/anchors.html).
