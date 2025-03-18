# Gaze

Gaze interaction is a standard feature provided by Unity's XR Interaction Toolkit (XRI). This section provides a comprehensive overview of implementing gaze-based interactions in your XR applications. Unity's XRI demo scenes already support gaze interaction out of the box for testing purposes.

This guide will explain how to implement gaze functionality in the HelloMR.

## Understanding Gaze Interaction

To implement any XR interaction, two core components are required: Interactors and Interactables. Gaze interactions have some unique characteristics compared to other interaction methods.

The XR Gaze Interactor works in conjunction with standard interactable components (such as XR Simple Interactable and XR Grab Interactable). Unlike other interaction types, these interactables don't require a specific "Gaze Interactable" component. Instead, they support gaze interaction by enabling the "Allow Gaze Interaction" option on the interactable components.

## Implementation Steps

Setting up a Gaze Interactor is straightforward:
1. Locate your Camera Offset object in the hierarchy
2. Enable the preconfigured gaze interaction prefabs

   ![image-20250310161257805](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250310161257805.png)
3. Ensure your interactables have "Allow Gaze Interaction" enabled

   ![image-20250310160943833](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250310160943833.png)

Once properly configured, your UI panels and other interactable objects will be responsive to gaze input.

## Usage Considerations

- Gaze interactions are particularly useful for accessibility features
- They work well in combination with other interaction methods like controllers
- Consider appropriate visual feedback to indicate when an object is being gazed at
- Set appropriate timeout values for gaze activation to prevent accidental interactions

## Further Reading
- [Unity XR Interaction Toolkit - Gaze Interactor Documentation](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.3/manual/xr-gaze-interactor.html)