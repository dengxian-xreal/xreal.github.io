# Tutorial: Mesh Collision

### What you'll build

In this tutorial, we will enable meshing and demonstrate how to collide objects with the generated mesh.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F8znbHygJkkYzqP5WJnxC%2FshootBalls.gif&width=768&dpr=4&quality=100&sign=0ef65a02d4e53d39ea0e3350068cfd55b6d9dc862dbe4630e9b040857f49c328)

### What you'll need

This tutorial assumes you have a working Unity scene with the NRSDK imported. Please refer to the [Getting Started with NRSDK](../02_Getting%20Started%20with%20NRSDK.md) page for more details on how to import the NRSDK package.

## 1. Create a new scene

create a new folder named `MeshCollsion`, and another folder named `Scene`, and then create a new scene named `MeshCollsion`.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FaqDdKVjIsE5OV50yHvP7%2Fimage.png&width=768&dpr=4&quality=100&sign=cab588982790a5a88d6661822c9339a5d8fc496ac391eae854ed99675497bbb7)

Add the `NRCameraRig` and `NRInput` prefab into the hierarchy.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FCNt41cfEiDzcMyI3rU53%2Fimage.png&width=768&dpr=4&quality=100&sign=77117e5b32d947ec4972723ef1228f178c344c6514e242fb3385fd2a62c2ad74)

## 2. Add the MeshingManager

Create an empty GameObject called MeshingManager.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F2uR3GoBsoliMcpGSqW6d%2Fimage.png&width=768&dpr=4&quality=100&sign=4e55c7909f8d0b524c760f17d90c3b016f35b56ad027d8e222c124b7ecde852c)

Add the following scripts to Meshing Manager:

1. NRMeshingManager.cs

2. MeshObjGenerator.cs



If you want to save the mesh for tests, you can add the `MeshSaver.cs`too.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FWpuxUgKX3QY5MC5PWyur%2Fimage.png&width=768&dpr=4&quality=100&sign=33b6fa13b71bfd64544928f82dc0927386f1d878e3aa3f6d962795361da4eeed)

## 3. Add a sphere

Right-click on the scene hierarchy and click **Game Object**> **3D Object**> **Sphere**.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FllJy8cS9p027MaJx9s5P%2Fimage.png&width=768&dpr=4&quality=100&sign=de04b5dcee6aa4c0938c6e181694cbc9fa59dd7b7f1ba033a2b76378411a85c4)

Click on the sphere and set its size to 0.05. 

Then add a rigid body component to the sphere. This tells Unity to give the sphere physics properties so it will fall down unless it hits something. You can also apply forces to it to move it around, simulate throwing it, etc. Note that if you don't change the `Collision Detection` to **Continuous Dynamic,** sometimes your ball will pass directly through the mesh, with no collision effect.

Add a material to the sphere to make it more obvious.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FZ0c9FhZyO5HaUbBsVLvl%2Fimage.png&width=768&dpr=4&quality=100&sign=f9e54b1751397f55783513f8fc4677a6707c124e42b0e334fa81dcf7810e8f50)

Create a folder called Prefabs, and drag the sphere to the folder.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FwcyCVkRr3zcAEuiKpuGC%2Fimage.png&width=768&dpr=4&quality=100&sign=1488c8b025ed4aa01d32e2ec20c7900855f7e62a4cf8de8efe19bbda6683649d)

## 4. Add code to shoot the sphere

Each time the user taps the touchpad, a ball will be shooted in place of the ray cast from the phone's controller.

By attaching the following script to **NRCameraRig**, you can customize the shoot position of the sphere. This tutorial uses the ray cast position, `Model Anchor`, as the emission point.

Set the prefab Sphere you just made as the `Ball Prefab`.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FzHR6cx6UgqmVYJHk8eaT%2Fimage.png&width=768&dpr=4&quality=100&sign=73e08897d726ded33ac7abf76d08a7bf88a9aeedfe1b43d04f197343b89b002c)

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fju5B8UqOzN4ByLIM2EAc%2Fimage.png&width=768&dpr=4&quality=100&sign=8bbae81532e1fc3e35e8aebf091abe33833d72a1ca5d7bd6e27177457a25a101)

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
