# Meshing Manager Overview

This page provides an overview of the meshing manager component and the settings that can be altered by developers.

![image-20240812174837506](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174837506.png)

-  **Meshing Radius**: The range of meshing, measured in meters. 

-  **Meshing Submit Rate**: The rate at which meshing data is submitted, measured in submissions per second (n/s).

### Meshing Classification Fracking

Classified Mesh Filter Prefabs: Used to define the available semantic labels and the prefabs that will be used to represent each classified mesh.

Available Semantic Labels:



```
public enum NRMeshingVertexSemanticLabel : byte
{
    Background = 0,
    Wall = 1,
    Building = 2,
    Floor = 4,
    Ceiling = 5,
    Highway = 6,
    Sidewalk = 7,
    Grass = 8,
    Door = 10,
    Table = 11,
}
```

### Mesh Obj Generator 

-  **Use Override Material**: Select whether use a customized mesh.

-  **Override Material**: The material of the customized mesh.

## Invisible Mesh

There are two ways to implement a transparent mesh.

-  **Use a transparent material**: A transparent material is built into the Package. Use this material to replace the existing mesh material so that the mesh will not be displayed in the scene, but the occlusion effect between mesh and virtual object still exists.


  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174913267.png" alt="Description" style={{ width: '900px', height: 'auto' }} class="center-image"  />

---
-  **Don't render the mesh**: double click the prefab MeshObj, and you can unselect the Mesh Renderer. In this way, the mesh will not be rendered in the scene, and there will be no occlusion between it and the virtual object. 

  <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174949262.png" alt="Description" style={{ width: '500px', height: 'auto' }} class="center-image"/>