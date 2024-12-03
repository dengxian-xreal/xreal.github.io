# Gaze

Gaze其实是Unity的 XR Interaction Toolkit提供的标准功能，本节仅作简单介绍。XRI的demoScene中就支持Gaze交互方式，可以直接打包出来进行测试。

本节简单介绍下如何在HelloMR中也实现此功能。

要实现交互，需要有Interactor和Interactable, Gaze比较特殊。
XR Gaze Interactor 与其他可交互组件（如 XR Simple Interactable 和 XR Grab Interactable）协同工作，实现凝视交互。这些可交互组件并不需要添加额外的“Gaze Interactable”组件，而是通过启用其上的“Allow Gaze Interaction”选项来支持凝视交互。

Gaze Interactor比较简单，只需要把Camera Offset中的两个预制体勾选上即可。

这个面板就可以用gaze交互了。




## Further reading
https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.3/manual/xr-gaze-interactor.html