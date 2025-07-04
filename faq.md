XREAL Smart Glass SDK & Compatibility Q&A

Questions & Answers

1. 除了 S24 和 BP，还有其他安卓设备（如 Google Pixel 7）能用吗？

还没测试过其他安卓设备，但你可以自行尝试。

2. 有推荐的最低 Android API 或 UI 版本吗？

请参考官方文档：配置项目设置 ↗

3. 能否实时叠加自定义动态 UI 元素（文本/图标/颜色）？

可以，但可能会有抖动，建议用 DOTween 平滑处理。

4. 能检测特定物体吗？

SDK 没有官方物体检测功能，但用 One+Eye 可以访问 RGB 摄像头数据，自行实现或用开源算法。

5. 能直接在眼镜或手机上运行计算机视觉模型，或者外部推流吗？

可以在手机或远程服务器上跑 CV 模型，SDK 没有限制。眼镜本身只是显示器，没有算力。

6. 能通过眼镜扬声器或手机触发语音播报吗？

可以，把眼镜当作标准麦克风访问音频。

7. 从检测到叠加/音频输出的延迟是多少？有性能数据吗？

暂无测试数据可提供。

8. 用户可以通过手势或手机 UI 控制叠加/音频吗？Multi-Resume 支持 AR 应用后台运行吗？

交互方式详见：输入与交互 ↗（仅 Ultra 支持手势）。Multi-Resume 详见：多屏显示 ↗

9. 有不用实体硬件测试叠加的仿真工具或 Unity 示例场景吗？

参考：Unity 编辑器调试应用 ↗

10. 有文档、Sample Build 或 SDK Demo 吗？

可在这里下载 SDK Demo 和 Sample Build：XREAL SDK 3.0.0 ↗