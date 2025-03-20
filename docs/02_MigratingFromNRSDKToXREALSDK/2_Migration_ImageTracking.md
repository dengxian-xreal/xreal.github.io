# Migrating Image Tracking

This guide focuses on migrating image tracking functionality from NRSDK to XREAL SDK.

## Prerequisites
- Completed basic XREAL SDK setup from the [main migration guide](0_intro.md)
- AR Foundation package installed

## Migration Steps

### 1. Remove NRSDK Image Tracking Components
- Remove the TrackingImageExampleController component from your scene
- Remove any NRSDK image tracking related scripts
- Keep any custom image visualization prefabs you want to reuse

### 2. Add AR Foundation Components
1. Add AR Tracked Image Manager to XR Origin
   - Select your XR Origin in the scene
   - Add ARTrackedImageManager component through Inspector

2. Configure Image Library
   - Create an XR Reference Image Library asset
   - Add your reference images to the library
   - Assign the library to ARTrackedImageManager's "Serialized Library" field
   - Optionally set "Max Number of Moving Images" if needed

3. Configure Tracked Image Prefab
   - You can reuse your existing image visualization prefab
     - Ensure it has an ARTrackedImage component
   - Or create a new prefab for tracked images
   - Assign the prefab to ARTrackedImageManager's "Tracked Image Prefab" field

### 3. Code Migration

#### Old NRSDK Code
```csharp
public class TrackingImageExampleController : MonoBehaviour
{
    public TrackingImageVisualizer TrackingImageVisualizerPrefab;
    private Dictionary<int, TrackingImageVisualizer> m_Visualizers = new Dictionary<int, TrackingImageVisualizer>();
    private List<NRTrackableImage> m_TempTrackingImages = new List<NRTrackableImage>();

    public void Update()
    {
        NRFrame.GetTrackables<NRTrackableImage>(m_TempTrackingImages, NRTrackableQueryFilter.New);
        foreach (var image in m_TempTrackingImages)
        {
            TrackingImageVisualizer visualizer = null;
            m_Visualizers.TryGetValue(image.GetDataBaseIndex(), out visualizer);
            if (image.GetTrackingState() != TrackingState.Stopped && visualizer == null)
            {
                visualizer = Instantiate(TrackingImageVisualizerPrefab, image.GetCenterPose().position, image.GetCenterPose().rotation);
                visualizer.Image = image;
                m_Visualizers.Add(image.GetDataBaseIndex(), visualizer);
            }
        }
    }
}
```

#### Migration to AR Foundation
When using AR Foundation, image tracking and visualization are automatically handled by the ARTrackedImageManager. If you need to respond to image tracking events, you can add the following code:

```csharp
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class ImageTrackingExample : MonoBehaviour
{
    private ARTrackedImageManager m_TrackedImageManager;

    void Awake()
    {
        m_TrackedImageManager = GetComponent<ARTrackedImageManager>();
    }

    void OnEnable()
    {
        m_TrackedImageManager.trackedImagesChanged += OnTrackedImagesChanged;
    }

    void OnDisable()
    {
        m_TrackedImageManager.trackedImagesChanged -= OnTrackedImagesChanged;
    }

    private void OnTrackedImagesChanged(ARTrackedImagesChangedEventArgs args)
    {
        foreach (var trackedImage in args.added)
        {
            // Handle newly detected images
            Debug.Log($"Detected image: {trackedImage.referenceImage.name}");
        }

        foreach (var trackedImage in args.updated)
        {
            // Handle updated images
        }

        foreach (var trackedImage in args.removed)
        {
            // Handle removed images
        }
    }
}
```

Key Differences:
- NRSDK requires custom scripts to manage image tracking and visualization
- AR Foundation automatically handles all image tracking and visualization through the ARTrackedImageManager component
- AR Foundation provides a more complete image lifecycle management (added, updated, removed)
- Image library management is different, AR Foundation uses XRReferenceImageLibrary resources

### 4. Image Properties Migration

| NRSDK Property/Method | AR Foundation Equivalent | Description |
|----------------------|-------------------------|-------------|
| image.GetCenterPose() | trackedImage.transform | Image position and direction |
| image.GetTrackingState() | trackedImage.trackingState | Tracking state |
| image.GetDataBaseIndex() | trackedImage.referenceImage.guid | Image unique identifier |
| NRTrackableQueryFilter.New | ARTrackedImagesChangedEventArgs.added | Newly detected images |

## Common Issues and Solutions

### Image Tracking Not Working
- Ensure AR Tracked Image Manager is enabled
- Verify reference image library is properly configured
- Check that images meet the minimum quality requirements, see [Image Tracking Requirements](../08_Image%20Tracking/intro.md#requirements)

### Image Detection Issues
- Ensure proper lighting conditions
- Verify image size and contrast
- Check if the physical image matches the reference image

## Additional Resources
- [AR Foundation Image Tracking Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@5.0/manual/features/image-tracking.html)
