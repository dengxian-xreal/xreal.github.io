# Detect planes in the real world

Now that a basic scene has been set up, you can start on developing the game. In this step, you will detect planes and draw them to the scene.

### Add an `PlaneDetector` component

An `PlaneDetector` detects and creates, updates, and removes game objects when the device's understanding of the environment changes.

1. Using the Hierarchy pane, create an empty `GameObject`.

2. Rename it to `PlaneDetector`. This component will display planes until one is selected by the player.
3. Select the new game object. Within the Inspector pane, click **Add Component** to add a `PlaneDetector`

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FWcGvZ52Yyv2Ry90jjra5%2Fimage.png&width=768&dpr=4&quality=100&sign=a1df6f715d91d456337d7b16b75557ba6ec31e82393ff68c6d100a5e2fa35504)

4. Configure the `PlaneDetector`by setting the `Detected Plane Prefab` field:

- Click the button next to `None` to bring up the **Select GameObject** window.
- Select the **Assets** tab and search for **WoodenPlaneVisualizer**.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FGM2FWesVpzxJmnKsYly3%2Fimage.png&width=768&dpr=4&quality=100&sign=ec2587635f2c52a3103a1224f7129c07486b8a89fac470638f477839b4f2f561)

This prefab from the starter package provides a wooden floor texture that will be used as the plane decoration.

### Run the app

1. Build and deploy your app as described in **Step 7** and **8** in [Getting Started with NRSDK](../02_Getting%20Started%20with%20NRSDK.md) to test your changes

2. Point your glasses at a horizontal real-world surface and move your glasses around to improve NRSDK's understanding of the world.
3. When NRSDK has detected a plane, you should see a wood texture cover real-world surfaces. The `Plane Detector `instantiates the given `Detected Plane Prefab` for each detected plane.
