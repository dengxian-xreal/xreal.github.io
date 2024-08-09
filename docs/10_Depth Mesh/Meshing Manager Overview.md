# Meshing Manager Overview

This page provides an overview of the meshing manager component and the settings that can be altered by developers.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2F3927673004-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FyXoV7SMVFQhr75lOIoQv%252Fuploads%252FgCxbdwuFctxPM9JGgkzf%252Fimage.png%3Falt%3Dmedia%26token%3D13b641a2-13c3-42bb-b6ab-12f6d01aab8f&width=768&dpr=4&quality=100&sign=9c289da4d5fadd3db4fd18b92487a018bcc1095af890a87b03b2aa0cd7838e12)

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


  <img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FNsZhuUPQUm2oAUWN1jo2%2Fimage.png&width=768&dpr=4&quality=100&sign=ceaf1bde6dfabcc39c027e818ede0303367fcd05703e1cea0452096b9fb186b6" alt="Description" style={{ width: '900px', height: 'auto' }} class="center-image"  />

---
-  **Don't render the mesh**: double click the prefab MeshObj, and you can unselect the Mesh Renderer. In this way, the mesh will not be rendered in the scene, and there will be no occlusion between it and the virtual object. 



  <img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FMwTbcuySd6UkB1Vehcbd%2Fimage.png&width=768&dpr=4&quality=100&sign=4e99690f60789f25d910868485e9d84ee4281d6c4af1623c14736afcbf5221d5" alt="Description" style={{ width: '500px', height: 'auto' }} class="center-image"/>