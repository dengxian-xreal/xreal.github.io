# Detect planes in the real world

Now that a basic scene has been set up, you can start on developing the game. In this step, you will detect planes and draw them to the scene.

### Add an `PlaneDetector` component

An `PlaneDetector` detects and creates, updates, and removes game objects when the device's understanding of the environment changes.

1. Using the Hierarchy pane, create an empty `GameObject`.

2. Rename it to `PlaneDetector`. This component will display planes until one is selected by the player.

3. Select the new game object. Within the Inspector pane, click **Add Component** to add a `PlaneDetector`

   ![image-20240812173430497](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173430497.png)

4. Configure the `PlaneDetector`by setting the `Detected Plane Prefab` field:

- Click the button next to `None` to bring up the **Select GameObject** window.
- Select the **Assets** tab and search for **WoodenPlaneVisualizer**.

​	![image-20240812173458165](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173458165.png)

This prefab from the starter package provides a wooden floor texture that will be used as the plane decoration.

### Run the app

1. Build and deploy your app as described in **Step 7** and **8** in [Getting Started with NRSDK](../02_Getting%20Started%20with%20NRSDK.md) to test your changes

2. Point your glasses at a horizontal real-world surface and move your glasses around to improve NRSDK's understanding of the world.
3. When NRSDK has detected a plane, you should see a wood texture cover real-world surfaces. The `Plane Detector `instantiates the given `Detected Plane Prefab` for each detected plane.
