# Add a car

The player will control a toy car that will drive towards the location of the reticle. A model for this car is provided in the Plane Detection Starter Package.

![image-20240812173354012](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240812173354012.png)

### Define Car Behaviour

1. Create a `CarBehaviour` script in `Assets/PlaneDetectionStarterPackage`. The script defines how a car moves in relation to the hit point (reticle).

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarBehaviour : MonoBehaviour
{
    public ReticleBehaviour Reticle;
    public float Speed = 1.2f;

    private void Update()
    {
        var trackingPosition = Reticle.transform.position;
        if (Vector3.Distance(trackingPosition, transform.position) < 0.2)
        {
            return;
        }

        var lookRotation = Quaternion.LookRotation(trackingPosition - transform.position);
        transform.rotation =
            Quaternion.Lerp(transform.rotation, lookRotation, Time.deltaTime * 10f);
        transform.position =
            Vector3.MoveTowards(transform.position, trackingPosition, Speed * Time.deltaTime);
    }

}
```

2. Double click `Car Prefab` in `Assets/PlaneDetectionStarterPackage` to edit the prefab. Add the `CarBehaviour` you've created as a component of this prefab. 

### Create `CarManager` script

Create a `CarManager` in your project's scripts folder (`Assets/Scripts`) as the following. The `CarManager` defines when and how the car is initialized.

```
using System.Collections;
using System.Collections.Generic;
using NRKernal;
using UnityEngine;

public class CarManager : MonoBehaviour
{
    public GameObject CarPrefab;
    public ReticleBehaviour Reticle;
    public CarBehaviour Car;

    private GameObject LockedPlane;

    private void Update()
    {
        if (Car == null && WasTapped() && Reticle.CurrentPlane != null)
        {
            // Spawn our car at the reticle location.
            var obj = Instantiate(CarPrefab);
            Car = obj.GetComponent<CarBehaviour>();
            Car.Reticle = Reticle;
            Car.transform.position = Reticle.transform.position;
        }
    }

    private bool WasTapped()
    {
        return NRInput.GetButtonDown(ControllerButton.TRIGGER);
    }
}// Some code
```

### Add a `CarManager` to your scene

1. In the **Hierarchy**, create a new empty `GameObject`.
2. Rename it to `Car Spawner`.
3. Select the object you created. In the **Hierarchy** pane, click **Add Component** to add the `CarManager` component.
4. Set up `CarManager`'s dependencies by clicking on the chooser for each field:
   - **Car Prefab**: In **Assets**, select **Car Prefab**.
   - **Reticle**: In **Scene**, select **Reticle Prefab**.

### Test driving

1. Click **File > Build** to test your changes.
2. When you tap on a plane, you should see a small car appear at that location. This car will follow the reticle.
