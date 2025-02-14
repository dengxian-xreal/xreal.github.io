# Migrating Meshing

## Overview

NRSDK and XREAL SDK have some differences in the implementation of the Meshing feature. This guide will introduce how to migrate the Meshing feature of NRSDK to the XREAL SDK.

## Key Changes

1. Manager class changes
   - NRSDK: `NRMeshingManager` 
   - XREAL SDK: `ARMeshManager` (from AR Foundation)

2. Mesh processing interface changes
   - NRSDK: `IMeshInfoProcessor` interface
   - XREAL SDK: `ARMeshesChangedEventArgs` event

3. Mesh state enumeration changes
   - NRSDK: `NRMeshingBlockState`
   - XREAL SDK: `MeshChangeState`

## Migration Steps

### 1. Replace the manager component

```csharp
// Old code
NRMeshingManager meshingManager;

// New code
ARMeshManager meshManager;
```

### 2. Mesh update processing

```csharp
// Old code - IMeshInfoProcessor implementation
void UpdateMeshInfo(ulong identifier, NRMeshInfo meshInfo) {
    switch(meshInfo.state) {
        case NRMeshingBlockState.NR_MESHING_BLOCK_STATE_NEW:
        case NRMeshingBlockState.NR_MESHING_BLOCK_STATE_UPDATED:
            // Process the added and updated mesh
            break;
        case NRMeshingBlockState.NR_MESHING_BLOCK_STATE_DELETED:
            // Process the deleted mesh
            break;
    }
}

// New code - ARMeshesChanged event subscription
void OnEnable() {
    meshManager.meshesChanged += OnMeshesChanged;
}

void OnMeshesChanged(ARMeshesChangedEventArgs args) {
    // Process the added mesh
    foreach(var mesh in args.added) {
        // Process the new mesh
    }
    
    // Process the updated mesh
    foreach(var mesh in args.updated) {
        // Update the mesh
    }
    
    // Process the deleted mesh
    foreach(var mesh in args.removed) {
        // Clean up the mesh
    }
}
```

### 3. Mesh Configuration Settings

```csharp
// Old code
meshingManager.m_MeshingRadius = 5.0f;
meshingManager.m_MeshingSubmitRate = 1.0f;

// New code
meshManager.density = 0.5f;  // Mesh density [0-1]
meshManager.normals = true;  // Whether to generate normals
meshManager.tangents = false;  // Whether to generate tangents
meshManager.textureCoordinates = false;  // Whether to generate UVs
```

### 4. Mesh Classification Processing

If you need to handle mesh classification functionality, you can refer to the implementation of `MeshClassificationFracking`:

```csharp
// Get the mesh classification information
XRMeshSubsystem meshSubsystem = meshManager.subsystem as XRMeshSubsystem;
var faceClassifications = meshSubsystem.GetFaceClassifications(meshId, Allocator.Persistent);

// Process the classification information
using (faceClassifications) {
    if (faceClassifications.Length > 0) {
        // Process the mesh based on the classification information
    }
}
```

## Notes

1. The XREAL SDK uses the AR Foundation's mesh system, so ensure that the project is correctly configured with the AR Foundation package.

2. The mesh update event has changed from a proactive retrieval to an event notification mechanism, requiring adaptation of the code structure.

3. The mesh identifier has changed from `ulong` to `TrackableId`, so related code needs to be updated.

4. Some advanced features (such as mesh classification) have API changes, requiring the use of new interfaces.

## Important: Component Hierarchy Structure

### Special Hierarchy Requirements
Unlike other AR features (such as ARPlaneManager, ARRaycastManager, etc.), ARMeshManager has special hierarchy requirements:

- Other AR Managers: Should be placed directly on the XROrigin GameObject.
- ARMeshManager: Must be a child of the XROrigin.

```
Scene
└── XROrigin
    ├── Camera Offset
    │   └── Main Camera
    ├── ARMeshManager    👈 Must be a child of the XROrigin
    └── Mesh Prefab
```

### Error Handling
If you place the ARMeshManager directly on the XROrigin, Unity will display an error dialog and automatically remove the component:
```csharp
void OnValidate()
{
    if (!IsValid())
    {
        // Display error dialog
        EditorUtility.DisplayDialog(
            "Hierarchy not allowed",
            "An ARMeshManager must be a child of an XROrigin.",
            "Remove Component");
        
        // Automatically remove the component
        DestroyImmediate(this);
    }
}
```

### Migration Suggestions
1. Create an empty GameObject as a child of the XROrigin
2. Name this GameObject "AR Mesh Manager"
3. Add the ARMeshManager component to this GameObject
4. Configure Mesh Prefab and other related settings
