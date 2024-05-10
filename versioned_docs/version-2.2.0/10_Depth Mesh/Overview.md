# Depth Mesh

Depth mesh is the creation of triangle-based meshes surfaces detected by any XREAL glasses supporting 6DOF. The mesh is used for real-time occlusion rendering and for collision detection with digital content. Unlike Plane Detection, which only detects planar surfaces, Meshing can detect a variety of surfaces.

## Capabilities

Depth mesh expands many AR capabilities.

-  **Visualization**: Provide visual feedback as users scan their environment.

-  **Occlusion**: Effectively hides virtual objects behind real ones, particularly useful indoors.

-  **Physics**: With the help of MeshColliders, virtual objects and characters can interact more realistically with the environment and real objects.

-  **Flexible Object Placement**: Allows for more flexible addition and arrangement of virtual objects compared to plane detection.

-  **Semantics**: Employs advanced capabilities to identify and categorize mesh blocks into specific classes, including BACKGROUND, WALL, BUILDING, FLOOR, CEILING, HIGHWAY, SIDEWALK, GRASS, DOOR, and TABLE. This enhances the overall context awareness of augmented reality experiences.

## Best Practice

The mesh quality depends on the image texture, related to the scene material, lighting, motion speed, etc.

**Good quality**:

-  Uniform illumination

-  Move smoothly and slowly

-  Highly textured surfaces: carpets, wallpapers, wood floors

-  The appropriate range of distances: 0.5m to 3m

**Poor quality**:

-  Moving objects

-  Dark environments

-  Transparent/Semi-transparent or reflective surfaces

-  Thin objects: chair legs, fences

-  Textureless surface: white walls, painted desktop

## **Device compatibility**

Depth Mesh has been fully tested on the Android phones listed in[ Device Compatibility](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/xreal-devices/compatibility).
