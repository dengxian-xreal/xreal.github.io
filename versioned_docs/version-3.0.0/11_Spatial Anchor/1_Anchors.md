# Anchors Scene

## Anchors

The Anchors scene is a part of an SDK that provides an interactive demonstration of working with Spatial Anchors. The experience enables users to create, place, save, and reload anchors within the augmented reality environment.

To access the "MappingExample" scene, follow these steps:

1. After importing the SDK package into your Unity project, navigate to the "Scenes" folder in the Project window.
2. Locate and open the "MappingExample" scene.
3. Explore the scene hierarchy and components to understand how the `AnchorItem` script is used.
4. Run the scene in the Unity Editor or build it for your device to see the Spatial Anchor functionality in action.



大纲

Overview

​	看完这个教程，你应该会如何create、save、remove、erase、load anchor。以及一些小的应用，比如如何在anchor上绑定虚拟物体。

### Experience Flow

⚠️等demo制作完成后，录制一个新的gif

为了快速体验anchor的效果，你可以直接下载这个APK。并按照以下步骤来体验anchor的各种操作。如果你想进一步开发，可以查看下一节的Developer Guide。

**2.Create an Anchor** 

Three anchor options will appear. Users can select any of these anchors using a hand-held controller and then position the anchor in a specific location within the real world.

**3.Scanning the Surroundings** 

Before saving the anchor, users are advised to observe the surroundings by simply looking around while wearing the headset. This step ensures that sufficient feature points are collected, enhancing the stability and accuracy of the anchor. During the process, the quality indicator will distribute some capsules evenly around the anchor. The capsules represent the quality of the feature points in different directions around the anchor.

> The color of the capsules indicates the quality:
>
> - 🟥 Red: Low quality
> - 🟨 Yellow: Medium quality
> - 🟩 Green: High quality
>
> When the process is successfully complete, the capsules will all turn to green, which indicates that the anchor is now ready to be used.

**4.Saving the Anchor** 

Once sufficient feature points have been gathered, users can click Save. Successful saving turns the anchor green, signaling that it has been anchored to that location in the real world.

**5.Exiting and Reopening the Application** 

Users may exit the application and reopen it at any time.

**6.Loading the Anchor** 

After reopening the application, clicking Load will reload the previously saved anchor. By returning to the physical location where the anchor was originally placed, users can observe the anchor successfully loading back into the scene.

## Developer Guide

### Project Setup

在使用 Spatial Anchors 之前，请确保你的项目已完成基本设置。你可以参考 Getting Started with XREAL SDK 进行相关配置。如果你已经完成了此设置，可以找到AR Feature这个sample里的Anchors场景，并自己build试试，或者在它的基础上做一些修改。

### Implementation

#### Create a Spatial Anchor



#### Estimating the mapping quality

如果在创建 Anchor 的过程中环境扫描质量不佳，那么在下次加载时，Anchor 可能会加载失败。因此，建议在创建 Anchor 时使用环境质量评估方法，确保 Anchor 周围的环境已经被充分扫描和建图，再进行保存。

Call the `NRWorldAnchor.SetEstimateRange()` method. This medthod allows you to set the observation angle and distance used for estimating the mapping quality. The observation angle refers to the range of the area around the anchor that needs to be observed. The observation distance refers to the distance between the observer and the anchor.

```
    public enum NREstimateDistance
    {
        NR_ESTIMATE_DISTANCE_UNKNOWN = 0,
        NR_ESTIMATE_DISTANCE_NEAR = 1, //0~0.5m
        NR_ESTIMATE_DISTANCE_MEDIUM = 2, //0.5~1.5m
        NR_ESTIMATE_DISTANCE_FAR = 3 // 1.5m~2.5m
    }
```

Call the `NRWorldAnchorStore.UpdateMapQuality() `method to estimate the mapping quality of the anchor during creating. This method will return an NREstimateQuality value indicating the current mapping quality.

#### Save a Spatial Anchor

Call the `NRWorldAnchor.SaveAnchor()` method after the anchor is created successfully. This method saves the information and related metadata of the anchor as a file to the device storage.

#### Use a Spatial Anchor

这里讲如何将虚拟物体绑定到anchor上

Call the `NRWorldAnchorStore.LoadwithUUID` method to load a saved anchor. The application can use the NRWorldAnchor.UUID to identify and reference a specific anchor. After loading is successful, the application can get the position and rotation of the anchor and use it for AR experiences.

> Things to note:
>
> - Creating an anchor takes time, and the application should handle the creation result in the OnTrackingChanged event.
> - The application should save the anchor at the appropriate time, such as before the user leaves the AR experience.
> - The application should check the CurrentAnchorState of the anchor before using it to make sure the anchor is available.
> - The mapping quality may change over time as the environment changes, and the application should continuously monitor the quality and update the indicator.

#### Remove a Spatial Anchor

Just remove the anchor.script component from the anchor gameObject.

