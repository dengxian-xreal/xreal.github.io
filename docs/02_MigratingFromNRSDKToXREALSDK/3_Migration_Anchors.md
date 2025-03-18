# Migrating Anchors

This guide focuses on migrating anchor functionality from NRSDK to XREAL SDK.

## Understanding the Differences

### NRSDK Anchor System
NRSDK provides two types of anchors:
1. **NRAnchor**
   - Used to track the position of trackable objects
   - Automatically updates position each frame
   - Mainly used for temporary spatial positioning

2. **NRWorldAnchor**
   - Used to fix object positions in physical space
   - Supports persistent storage (save/load)
   - Contains UUID for cross-session identification
   - Provides tracking state change events

### AR Foundation Anchor System
AR Foundation uses a unified ARAnchorManager to manage anchors:
- Provides unified ARAnchor component
- Supports creating, updating, and deleting anchors
- Notifies anchor changes through event system

## Migration Steps

### 1. Remove NRSDK Anchor Components
- Remove LocalMapExample script
- Remove all NRWorldAnchor components
- Remove all NRAnchor components
- Keep anchor prefabs that need to be reused

### 2. Add AR Foundation Components
1. Add ARAnchorManager to XR Origin
   ```csharp
   var anchorManager = xrOrigin.gameObject.AddComponent<ARAnchorManager>();
   ```

2. Configure Anchor Prefab
   - Can reuse existing anchor prefabs
   - Ensure prefab has ARAnchor component
   - Set "Anchor Prefab" in ARAnchorManager Inspector

### 3. Code Migration

#### Old NRSDK Code (LocalMapExample)
```csharp
public class LocalMapExample : MonoBehaviour
{
    private NRWorldAnchorStore m_NRWorldAnchorStore;

    public void AddAnchor()
    {
        var go = Instantiate(prefab);
        NRWorldAnchor anchor = go.AddComponent<NRWorldAnchor>();
        anchor.UserDefinedKey = key;
        bool success = anchor.CreateAnchor();
    }

    public void Save()
    {
        m_NRWorldAnchorStore.SaveAllAnchors();
    }

    public void Load()
    {
        var list = m_NRWorldAnchorStore.GetLoadableAnchorUUID();
        foreach (var item in list)
        {
            m_NRWorldAnchorStore.LoadwithUUID(item.Key, (handle) => {
                // Handle anchor loading
            });
        }
    }
}
```

#### Migration to AR Foundation
```csharp
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class AnchorManager : MonoBehaviour
{
    private ARAnchorManager m_AnchorManager;

    void Awake()
    {
        m_AnchorManager = GetComponent<ARAnchorManager>();
    }

    void OnEnable()
    {
        m_AnchorManager.anchorsChanged += OnAnchorsChanged;
    }

    void OnDisable()
    {
        m_AnchorManager.anchorsChanged -= OnAnchorsChanged;
    }

    public void AddAnchor(Vector3 position, Quaternion rotation)
    {
        var pose = new Pose(position, rotation);
        var anchor = m_AnchorManager.AddAnchor(pose);
    }

    private void OnAnchorsChanged(ARAnchorsChangedEventArgs args)
    {
        foreach (var anchor in args.added)
        {
            // Handle newly added anchors
        }

        foreach (var anchor in args.updated)
        {
            // Handle updated anchors
        }

        foreach (var anchor in args.removed)
        {
            // Handle removed anchors
        }
    }
}
```

Key differences:
- NRSDK requires manual management of anchor creation and lifecycle
- AR Foundation automatically manages anchors through ARAnchorManager
- NRSDK uses NRWorldAnchorStore for persistence, AR Foundation 5.0 requires XREAL SDK extension for persistence, 6.0+ natively supports persistence
- AR Foundation provides more complete anchor lifecycle management (add, update, remove)

### 4. Anchor Properties Migration

| NRSDK Property/Method | AR Foundation Equivalent | Description |
|----------------------|-------------------------|-------------|
| anchor.UUID | anchor.trackableId | Anchor unique identifier |
| anchor.CurrentTrackingState | anchor.trackingState | Tracking state |
| anchor.CreateAnchor() | anchorManager.AddAnchor() | Create anchor |
| anchor.UpdatePose() | Automatically handled | Update position |

## Common Issues
- Ensure ARAnchorManager is enabled
- Verify sufficient feature points in the scene
- Check if anchor creation pose is correct

## Anchor Persistence
### AR Foundation 5.0
- Does not directly provide persistence functionality
- XREAL SDK provides extension methods for saving and loading anchors

### AR Foundation 6.0+
Natively supports anchor persistence with the following APIs:
- TryGetSavedAnchorIdsAsync: Get all saved anchor IDs
- TryLoadAnchorAsync: Load specific anchor
- TryEraseAnchorAsync: Delete specific anchor

Note: Ensure sufficient environmental feature data is saved for relocation

## Additional Resources
- [AR Foundation Anchor Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@5.1/manual/features/anchors.html)
- [AR Foundation 6.0 Persistent Anchors](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@6.1/manual/features/anchors/persistent-anchors.html)
