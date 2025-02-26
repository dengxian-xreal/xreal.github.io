# Use Meshes in the Editor

This page provides a method of saving a mesh as a file and using it in the Unity Editor.

When working on a depth-mesh-based feature, it can be time-consuming to deploy to the device every time you try or change something. For this reason, the NRSDK offers a rudimentary system to save meshes as files on the device and reuse them in the editor for better debugging.

## Save Mesh Files

The demo scene mesh contains a UI button Save Mesh which can save the current mesh data into .obj files in the device's file system.

![image-20250224161158699](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250224161158699.png)

Every push of the button creates a new folder of mesh obj. It is a good idea to save multiple meshes as you scan around if you want to reproduce mesh updates in the Unity Editor.

You will find the files under `*Android/data/package_name/files/MeshSave/*`*.* Save them into your assets.

![image-20250224170904217](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250224170904217.png)

## Import Meshes into Unity

In your Unity scene hierarchy, create an empty `GameObject` called “Meshes”. The goal of that object will be to load saved meshes in the editor and test mesh-related logic without deploying to a device.

Then copy/paste the mesh files to a folder in the scene’s file hierarchy.

Drag the mesh obj to the Meshes directory

![image-20250224171626765](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250224171626765.png)
