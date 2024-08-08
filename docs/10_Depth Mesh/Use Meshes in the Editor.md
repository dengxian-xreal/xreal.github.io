# Use Meshes in the Editor

This page provides a method of saving a mesh as a file and using it in the Unity Editor.

When working on a depth-mesh-based feature, it can be time-consuming to deploy to the device every time you try or change something. For this reason, the NRSDK offers a rudimentary system to save meshes as files on the device and reuse them in the editor for better debugging.

## Save Mesh Files

The demo scene mesh contains a UI button Save Mesh which can save the current mesh data into .obj files in the device's file system.




 <img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F1nTcfBhJahMmMHZRm4mD%2Fimage.png&width=300&dpr=4&quality=100&sign=7091ef9522b05d47798330ec1fd8ac2c26135c6201569ade365955e70541cba5" alt="Description" style={{ width: '400px', height: 'auto' }} class="center-image"  />

Every push of the button creates a new folder of mesh obj. It is a good idea to save multiple meshes as you scan around if you want to reproduce mesh updates in the Unity Editor.

You will find the files under `*Android/data/package_name/files/MeshSave/*`*.* Save them into your assets.


<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FgBn3p4ygIDp2M1V9lVDw%2Fimage.png&width=300&dpr=4&quality=100&sign=31b8902b549c4864b8b3bb0fafafbce4c7bc36b16d78532320be66304e8384c0" alt="Description" style={{ width: '300px', height: 'auto' }} class="center-image"  />

## Import Meshes into Unity

In your Unity scene hierarchy, create an empty `GameObject` called “Meshes”. The goal of that object will be to load saved meshes in the editor and test mesh-related logic without deploying to a device.

Then copy/paste the mesh files to a folder in the scene’s file hierarchy.

Drag the mesh obj to the Meshes directory

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FCQ6iaXj1tUpkR9Uqu1Xk%2Fimage.png&width=768&dpr=4&quality=100&sign=1e3f9440a001e2d4265b63c95b5c1b336659164ad9129514ec7bd94e396f6e87)
