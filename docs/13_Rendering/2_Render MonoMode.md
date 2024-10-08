# Render MonoMode(Obsolete)

### Introduction

MonoMode is a specific mode within the AR system that enables a faux 3D viewing experience by utilizing a 2D display at a resolution of 1920*1080, where the content for the left and right eyes is mirrored, simulating a 3D effect. When this mode is not activated, attempting to launch a 3D application without switching through Nebula to the 3D mode can lead to errors. However, if MonoMode is enabled, even without shifting to the 3D mode via Nebula, the application will not exit. Instead, it will display the content in a mirrored left and right eye mode, simulating a 3D effect, although it's not genuine 3D. This allows for greater flexibility in handling 3D content without necessarily adhering to the typical process of switching modes.

### How to Open MonoMode?

To enable MonoMode in your AR application, simply toggle "Support Mono Mode" within the NRKernelSessionConfig (disabled by default).

![image-20240813172350145](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172350145.png)
