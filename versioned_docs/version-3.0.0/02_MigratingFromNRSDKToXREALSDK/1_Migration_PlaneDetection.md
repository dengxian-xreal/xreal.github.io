

# Migrating Plane Detection

This guide focuses on migrating plane detection functionality from NRSDK to XREAL SDK.

## Prerequisites
- Completed basic XREAL SDK setup from the [main migration guide](./MigratingFromNRSDK.md)
- AR Foundation package installed

## Migration Steps

### 1. Remove NRSDK Plane Components
- Remove the PlaneDetector component from your scene
- Keep any custom plane visualization prefabs you want to reuse

### 2. Add AR Foundation Components
1. Add AR Plane Manager to XR Origin (XR Rig)
   ```csharp
   // Add component through Inspector or programmatically:
   var planeManager = xrOrigin.gameObject.AddComponent<ARPlaneManager>();
   ```

2. Configure Plane Prefab
   - You can reuse your existing plane visualization prefab
   - Or use AR Foundation's default plane prefab
   - Assign the prefab to the AR Plane Manager's "Plane Prefab" field

### 3. Code Migration

#### Old NRSDK Code
```csharp
private NRPlaneDetector m_PlaneDetector;

void Start()
{
    m_PlaneDetector = FindObjectOfType<NRPlaneDetector>();
    m_PlaneDetector.OnPlaneAdded += OnPlaneDetected;
}

private void OnPlaneDetected(NRTrackablePlane plane)
{
    // Handle new plane
}
```

#### New AR Foundation Code
```csharp
using UnityEngine.XR.ARFoundation;

private ARPlaneManager m_PlaneManager;

void Start()
{
    m_PlaneManager = FindObjectOfType<ARPlaneManager>();
    m_PlaneManager.planesChanged += OnPlanesChanged;
}

private void OnPlanesChanged(ARPlanesChangedEventArgs args)
{
    // Handle added planes
    foreach (var plane in args.added)
    {
        // Handle new plane
    }
    
    // Handle updated and removed planes if needed
    foreach (var plane in args.updated) { }
    foreach (var plane in args.removed) { }
}
```

### 4. Plane Properties Migration

| NRSDK Property | AR Foundation Equivalent |
|----------------|-------------------------|
| plane.GetCenter() | plane.center |
| plane.GetExtents() | plane.size |
| plane.GetRotation() | plane.transform.rotation |
| plane.GetTrackingState() | plane.trackingState |

## Common Issues and Solutions

### Plane Detection Not Working
- Ensure AR Plane Manager is enabled
- Check that the plane prefab is properly assigned
- Verify tracking configuration in XR Plug-in Management

### Plane Visualization Issues
- Make sure your plane prefab has an ARPlane component
- Check if the plane material is properly configured
- Verify the plane prefab's scale and orientation

## Additional Resources
- [AR Foundation Plane Detection Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@5.0/manual/features/plane-detection.html)
- [XREAL SDK Samples](https://developer.xreal.com/develop/unity/samples)