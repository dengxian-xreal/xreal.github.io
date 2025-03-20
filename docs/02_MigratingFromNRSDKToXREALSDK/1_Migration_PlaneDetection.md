# Migrating Plane Detection

This guide focuses on migrating plane detection functionality from NRSDK to XREAL SDK.

## Prerequisites
- Completed basic XREAL SDK setup from the [main migration guide](0_intro.md)
- AR Foundation package installed

## Migration Steps

### 1. Remove NRSDK Plane Components
- Remove the PlaneDetector component from your scene
- Remove any NRSDK plane detection related scripts
- Keep any custom plane visualization prefabs you want to reuse

### 2. Add AR Foundation Components
1. Add AR Plane Manager to XR Origin
   - Select your XR Origin in the scene
   - Add ARPlaneManager component through Inspector

2. Configure Plane Prefab
   - You can reuse your existing plane visualization prefab
     - Ensure it has an ARPlane component
   - Or use AR Foundation's default plane prefab
   - Assign the prefab to the AR Plane Manager's "Plane Prefab" field in Inspector

### 3. Code Migration

#### Old NRSDK Code
```csharp
public class PlaneDetector : MonoBehaviour
{
    public GameObject DetectedPlanePrefab;
    private List<NRTrackablePlane> m_NewPlanes = new List<NRTrackablePlane>();

    public void Update()
    {
        NRFrame.GetTrackables<NRTrackablePlane>(m_NewPlanes, NRTrackableQueryFilter.New);
        for (int i = 0; i < m_NewPlanes.Count; i++)
        {
            GameObject planeObject = Instantiate(DetectedPlanePrefab, Vector3.zero, Quaternion.identity, transform);
            planeObject.GetComponent<NRTrackableBehaviour>().Initialize(m_NewPlanes[i]);
        }
    }
}
```

#### Migration to AR Foundation
When using AR Foundation, plane detection and visualization are handled automatically by the ARPlaneManager component. If you need to respond to plane detection events, you can add the following code:

```csharp
private void SubscribePlaneEvents()
{
    var planeManager = GetComponent<ARPlaneManager>();
    planeManager.planesChanged += OnPlanesChanged;
}

private void OnPlanesChanged(ARPlanesChangedEventArgs args)
{
    foreach (var plane in args.added)
    {
        // Handle newly detected planes
    }
}
```

Key Differences:
- NRSDK requires custom scripts to manage plane detection and instantiation.
- AR Foundation automatically handles all plane detection and visualization through the ARPlaneManager component.
- There is no need to manually instantiate plane prefabs; the ARPlaneManager takes care of this automatically.

### 4. Plane Properties Migration

| NRSDK Property/Method | AR Foundation Equivalent | Description |
|----------------------|-------------------------|-------------|
| plane.GetCenterPose() | plane.transform.position/rotation | Position and orientation of the plane center |
| plane.ExtentX | plane.size.x | Plane X axis size |
| plane.ExtentZ | plane.size.y | Plane Z axis size |
| plane.GetPlaneType() | plane.alignment | Plane type |
| plane.GetBoundaryPolygon(List\<Vector3\>) | plane.boundary | Plane boundary points |

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
