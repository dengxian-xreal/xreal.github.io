# Mesh Classification

The **Mesh Classification** feature within the XREAL SDK enables the segmentation and classification of real-world surfaces into predefined categories (such as floors, walls, or ceilings) using AR Foundation. This capability is essential for applications that require contextual awareness of their environment, allowing for more accurate placement and interaction of virtual objects.

## Developer Guide

This guide will walk you through implementing Mesh Classification using the XREAL SDK in combination with AR Foundation. The guide covers project setup, mesh scanning, classification, interaction, reclassification, and clearing classified meshes.

### Project Setup

Before using Mesh Classification, ensure your project is properly configured. Refer to the [**Getting Started with XREAL SDK**](../02_Getting%20Started%20with%20XREAL%20SDK.md) guide for the necessary setup. Once set up, locate the “AR Feature” sample, specifically the **Mesh Classification** scene, and build it. You can also modify this sample to suit your needs.

### Implementation

#### Classified Mesh Filter Prefabs

The Classified Mesh Filter Prefabs define the available semantic labels and the prefabs used to represent each classified mesh. These labels help in categorizing different parts of the environment, allowing the system to recognize and interact with various surfaces accurately.

![image-20240815181751732](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240815181751732.png)

**Available Semantic Labels:**

The following semantic labels are defined in the `NRMeshingVertexSemanticLabel` enum. Each label corresponds to a different type of surface or object that the meshing system can classify:

```csharp
public enum NRMeshingVertexSemanticLabel : byte
{
    Background = 0,   // General background surfaces
    Wall = 1,         // Vertical surfaces like walls
    Building = 2,     // Structural surfaces part of a building
    Floor = 4,        // Horizontal surfaces like floors
    Ceiling = 5,      // Overhead surfaces like ceilings
    Highway = 6,      // Road surfaces
    Sidewalk = 7,     // Pavement or sidewalk surfaces
    Grass = 8,        // Natural surfaces covered with grass
    Door = 10,        // Door surfaces
    Table = 11,       // Furniture surfaces like tables
}
```

Each semantic label can be associated with a different prefab to visually represent the classified mesh in the scene. By assigning specific prefabs to these labels, you can easily differentiate between different types of surfaces within the AR environment.

#### Start Mesh Classification

To start the mesh classification process, initialize the AR environment and start scanning for surfaces. The scanned meshes will automatically be classified into predefined categories.

```csharp
public void StartClassification()
{
    // Begin scanning and classifying the environment
    m_MeshClassifier.StartScanning();
}
```

#### Display Classification Results

Once the meshes are classified, you can display the results to the user. Each classified surface type can be rendered in a different color or material for easy identification.

```csharp
public void DisplayClassifiedMeshes()
{
    foreach (var mesh in m_MeshClassifier.ClassifiedMeshes)
    {
        ApplyColorBasedOnClassification(mesh);
    }
}

private void ApplyColorBasedOnClassification(ClassifiedMesh mesh)
{
    switch (mesh.ClassificationType)
    {
        case ClassificationType.Floor:
            mesh.Renderer.material.color = Color.green;
            break;
        case ClassificationType.Wall:
            mesh.Renderer.material.color = Color.blue;
            break;
        case ClassificationType.Ceiling:
            mesh.Renderer.material.color = Color.yellow;
            break;
        // Add more cases as needed
    }
}
```



#### Reclassify Meshes

If the environment has changed or you want to update the classifications, re-trigger the classification process.

```csharp
public void ReclassifyMeshes()
{
    m_MeshClassifier.ClearClassifications();
    StartClassification();
}
```

#### Clear Classified Meshes

To clear all classified meshes from the scene:

```csharp
public void ClearAllClassifications()
{
    m_MeshClassifier.ClearClassifications();
}
```

### Further Reading

For more detailed information on working with mesh classification and related AR features, refer to the official [AR Foundation Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@6.0/manual/index.html).
