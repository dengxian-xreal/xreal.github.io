# Perform a hit test against detected planes

In the previous step, you programmed an application that can detect planes. These planes are reflected in your game's scene. Now, you'll add interactivity with these planes by creating an aiming reticle and a car that will drive on the detected plane's surface.

The control scheme for this app involves the player pointing their phone at a surface. In order to give clear visual feedback for the designated location, you'll use an aiming reticle.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FEzFELvAUXYfKQ1L40WPo%2Fimage.png&width=768&dpr=4&quality=100&sign=5a517a3ef472dfa6a6a8edad26c517756fde10de8dc9df281bfe4fb57e11770c)

In order to "stick" this reticle to an AR plane, use a hit test. A hit test is a technique that calculates intersections when casting a ray in a given direction. You will use a hit test to detect an intersection in the direction of your controller.

### Create `ReticleBehaviour` script

1.In `Assets/Script` folder, **right click -> Create -> C# Script,** name the C# script `ReticleBehaviour`

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FOKQru13SweVqHq4WMI2N%2Fimage.png&width=768&dpr=4&quality=100&sign=4b300786ceb65849de1c74af6ff385bdbbec26daa77528348b6bd118d4f8c690)

Edit `ReticleBehaviour` as following:

```
using System.Collections;
using System.Collections.Generic;
using NRKernal;
using UnityEngine;

public class ReticleBehaviour : MonoBehaviour
{
    public GameObject Child;
    // Start is called before the first frame update
    public GameObject CurrentPlane;

    
    void Start()
    {
        Child = transform.GetChild(0).gameObject;
    }

    // Update is called once per frame
    void Update()
    {
        var handControllerAnchor = NRInput.DomainHand == ControllerHandEnum.Left ? ControllerAnchorEnum.LeftLaserAnchor : ControllerAnchorEnum.RightLaserAnchor;
        Transform laserAnchor = NRInput.AnchorsHelper.GetAnchor(NRInput.RaycastMode == RaycastModeEnum.Gaze ? ControllerAnchorEnum.GazePoseTrackerAnchor : handControllerAnchor);
        
        RaycastHit hitResult;
        if (Physics.Raycast(new Ray(laserAnchor.transform.position, laserAnchor.transform.forward), out hitResult, 10))
        {
            var hit = hitResult.collider.gameObject; 
            if ( hit != null &&
                 hit.GetComponent<NRTrackableBehaviour>()?.Trackable.GetTrackableType() == TrackableType.TRACKABLE_PLANE)
            {
                // Move this reticle to the location of the hit.
                CurrentPlane = hit;
                transform.position = hitResult.point;
                Child.SetActive(true);
            }
            else
            {
                Child.SetActive(false);
            }
        }
    }
}
```

The `ReticleBehavior` script will position the reticle on the plane that hits against the controller raycast.

### **Create the Reticle**

1. In the **Project** pane near the bottom of the screen, navigate to **Assets >** PlaneDetectionStarterPackage.
2. Place the **Reticle Prefab** into the scene by dragging it into the project's **Hierarchy pane**.
3. Select the reticle in the hierarchy.
4. In the inspector, click **Add Component**. Add the `ReticleBehaviour` script you've created.

### Test the reticle

1. Click **File > Build** to build and test your changes asyou did before.
2. You should see the reticle follow your controller's raycast movements.
