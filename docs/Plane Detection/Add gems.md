# Add gems

Now that the player can control an entity in the scene, give the player a destination to drive towards.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FNan57JfW0muxKIpN1jJj%2Fimage.png&width=768&dpr=4&quality=100&sign=606db91c37f42d891608f14885a66271adea7d9157820a9b5346b32a9d110312)

### Create `GemSpawner`

1. In **Assets/Scripts,** create a new script named `GemSpawner.` This script defines how the gems are generated randomly on the current plane.

```
using NRKernal;
using NRKernal.NRExamples;
using UnityEngine;

public class GemSpawner : MonoBehaviour
{
    public GemBehaviour Gem;
    public GameObject GemPrefab;
    public ReticleBehaviour Reticle;

    public static Vector3 RandomInTriangle(Vector3 v1, Vector3 v2)
    {
        float u = Random.Range(0.0f, 1.0f);
        float v = Random.Range(0.0f, 1.0f);
        if (v + u > 1)
        {
            v = 1 - v;
            u = 1 - u;
        }

        return (v1 * u) + (v2 * v);
    }

    public Vector3 FindRandomLocation(GameObject plane)
    {
        // Select random triangle in Mesh
        var mesh = plane.GetComponent<PolygonPlaneVisualizer>().m_PlaneMesh;
        var triangles = mesh.triangles;
        var triangle = triangles[(int) Random.Range(0, triangles.Length - 1)] / 3 * 3;
        var vertices = mesh.vertices;
        var randomInTriangle = RandomInTriangle(vertices[triangle], vertices[triangle + 1]);
        var randomPoint = plane.transform.TransformPoint(randomInTriangle);
        randomPoint.y = Reticle.CurrentPlane.GetComponent<NRTrackableBehaviour>().Trackable.GetCenterPose().position.y;
        return randomPoint;
    }

    public void SpawnGem(GameObject plane)
    {
        var gemClone = Instantiate(GemPrefab);
        gemClone.transform.position = FindRandomLocation(plane);

        Gem = gemClone.GetComponent<GemBehaviour>();
    }

    private void Update()
    {
        if (Reticle.CurrentPlane != null)
        {
            if (Gem == null)
            {
                SpawnGem(Reticle.CurrentPlane);
            }
        }
    }
}
```

### Add the game element

1. Create a new empty `GameObject` in the Hierarchy.
2. Rename it to `Gem Spawner`.
3. Select the object you created. In the **Hierarchy** pane, click **Add Component** to add the `GemSpawner` component to it.
4. Set up `GemSpawner`'s dependencies by clicking on the chooser for the following field:
   - **Gem Prefab**: In **Assets**, select **Gem Prefab**.
   - **Reticle:** In **Scene,** select **Reticle Prefab.**

### Create `GemBehaviour`

1. Create a script named `GemBehaviour` in PlaneDetectionStarterPackage folder. You needn't add anything else to this script.
2. Associate `GemBehaviour`  with **Gem Prefab** by editing **Gem Prefab,** clicking **Add Component,**  and choose `GemBehaviour` you've created.

### Modify Car Behaviour

In `CarBehaviour` you've previously created, add the following event function which defines the action when the car hits the gem. 

```
    private void OnTriggerEnter(Collider other)
    {
        var Gem = other.GetComponent<GemBehaviour>();
        if (Gem != null)
        {
            Destroy(other.gameObject);
        }
    }
```

### Test the game

1. Click **File > Build** to test your changes. 2, After you create a car, a gem should spawn.
2. Drive your car to the gem.
3. A new one will appear at a random location.
