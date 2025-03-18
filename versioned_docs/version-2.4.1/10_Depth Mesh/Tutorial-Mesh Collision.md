# Tutorial: Mesh Collision

### What you'll build

In this tutorial, we will enable meshing and demonstrate how to collide objects with the generated mesh.

<img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F8znbHygJkkYzqP5WJnxC%2FshootBalls.gif&width=768&dpr=4&quality=100&sign=0ef65a02d4e53d39ea0e3350068cfd55b6d9dc862dbe4630e9b040857f49c328" alt="img" />

### What you'll need

This tutorial assumes you have a working Unity scene with the NRSDK imported. Please refer to the [Getting Started with NRSDK](../02_Getting%20Started%20with%20NRSDK.md) page for more details on how to import the NRSDK package.

## 1. Create a new scene

create a new folder named `MeshCollsion`, and another folder named `Scene`, and then create a new scene named `MeshCollsion`.

![image-20240812174432287](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174432287.png)

Add the `NRCameraRig` and `NRInput` prefab into the hierarchy.

![image-20240812174448835](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174448835.png)

## 2. Add the MeshingManager

Create an empty GameObject called MeshingManager.

![image-20240812174604706](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174604706.png)

Add the following scripts to Meshing Manager:

1. NRMeshingManager.cs

2. MeshObjGenerator.cs

If you want to save the mesh for tests, you can add the `MeshSaver.cs`too.

![image-20240812174649912](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174649912.png)

## 3. Add a sphere

Right-click on the scene hierarchy and click **Game Object**> **3D Object**> **Sphere**.

![image-20240812174702136](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174702136.png)

Click on the sphere and set its size to 0.05. 

Then add a rigid body component to the sphere. This tells Unity to give the sphere physics properties so it will fall down unless it hits something. You can also apply forces to it to move it around, simulate throwing it, etc. Note that if you don't change the `Collision Detection` to **Continuous Dynamic,** sometimes your ball will pass directly through the mesh, with no collision effect.

Add a material to the sphere to make it more obvious.

![image-20240812174719495](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174719495.png)

Create a folder called Prefabs, and drag the sphere to the folder.

![image-20240812174733292](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174733292.png)

## 4. Add code to shoot the sphere

Each time the user taps the touchpad, a ball will be shooted in place of the ray cast from the phone's controller.

By attaching the following script to **NRCameraRig**, you can customize the shoot position of the sphere. This tutorial uses the ray cast position, `Model Anchor`, as the emission point.

Set the prefab Sphere you just made as the `Ball Prefab`.

![image-20240812174745612](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174745612.png)

![image-20240812174802459](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812174802459.png)

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using NRKernal;

public class Shoot : MonoBehaviour
{
    public float moveSpeed = 10f;
    public GameObject shootPos;
    public float force = 1000;
    public GameObject ballPrefab;

    Vector3 targetObjectNextPosition;

    RaycastHit hit;

    void FixedUpdate()
    {
        if (NRInput.GetButtonDown(ControllerButton.TRIGGER))
        {
            var handControllerAnchor =
                NRInput.DomainHand == ControllerHandEnum.Left
                    ? ControllerAnchorEnum.LeftLaserAnchor
                    : ControllerAnchorEnum.RightLaserAnchor;
            Transform laserAnchor = NRInput.AnchorsHelper.GetAnchor(
                NRInput.RaycastMode == RaycastModeEnum.Gaze
                    ? ControllerAnchorEnum.GazePoseTrackerAnchor
                    : handControllerAnchor
            );

            Ray ray =new Ray(laserAnchor.transform.position, laserAnchor.transform.forward);

            Rigidbody ball = Instantiate(ballPrefab, shootPos.transform.position, Quaternion.identity).GetComponent<Rigidbody>() as Rigidbody;
            ball.AddForce(force * ray.direction);
            
        }
    }

}
 
```

## 5. Destroy the sphere after a period of time

To save scene resources, use the invoke function to destroy the sphere after a specified time.

Attach the script to the sphere prefab made in Step 3.



```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class sphere : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Invoke("DelayDestroy", 10); // * destroy the prefab after 10 seconds
    }

    // Update is called once per frame
    void DelayDestroy()
    {
        Destroy(this.gameObject);
    }
}
```

## 6. Build and Run
