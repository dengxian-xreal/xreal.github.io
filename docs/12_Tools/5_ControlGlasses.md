## Control Glasses


## 此App用于将眼镜切换到3D模式。

整个SDK的架构是Client/server模式。ControlGlasses就是server，用户使用SDK开发的AR应用，是client。
如果你用的是BeamPro的话，其实BeamPro上的“MyGlasses”就是server，所以如果你用BeamPro，可以不用下载ControlGlasses. 两者功能类似，MyGlasses面向消费者，会有更多用户友好的功能，如果你是开发者，完全可以使用更精简、更轻量的ControlGlasses。

SDK的大部分算法库，都放在ControlGlasses中，在AR应用运行时，会从ControlGlasses中动态加载所需的算法库，这样每个AR应用的APK size会比较小，如果SDK的算法有更新，开发者也无需更新APK，仅更新ControlGlasses即可。

除此之外，ControlGlasses还提供以下功能：

1. Status Monitor：提示用户下一步应用做什么，或者目前遇到了什么问题，有什么报错

2. Firmware Management: 检测并显示眼镜目前的固件版本

3. 切换眼镜刷新率。有时候你会发现，把眼镜的刷新率设置的比较高，但是看起来还是只有60Hz。这是因为刷新率受好几个地方限制。比如如果手机屏幕的刷新率固定在60Hz，那么也会受到60Hz的最高限制。另外应用里面也有一个刷新率，那个也需要调整。只有手机屏幕刷新率、眼镜刷新率、应用内刷新率，都提高，才能正确设置刷新率。

4. Auto-launch Application
这个选项可以帮助开发者快速启动应用，在这里选择特定应用后，每次眼镜连接手机，controlGlasses都会自动将眼镜切换为3D模式，并打开此应用。






ControlGlasses User Guide


Introduction

![920shots_so](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/920shots_so.png)

ControlGlasses is the official tool for switching XREAL glasses into 3D mode.
In the overall SDK architecture, XREAL adopts a Client/Server model:
	•	Server: ControlGlasses
	•	Client: AR applications developed using the XREAL SDK

When an AR application runs, it communicates with ControlGlasses to:
	•	Access algorithm libraries
	•	Manage glasses status
	•	Enable 3D mode and system services


Relationship with BeamPro

If you are using BeamPro:

The “MyGlasses” application on BeamPro also acts as a Server.
Therefore, you do not need to install ControlGlasses on BeamPro.
* The two serve similar purposes, but with different focuses:
	•	MyGlasses is consumer-oriented, with a more user-friendly interface and richer features.
	•	ControlGlasses is more lightweight and streamlined, making it ideal for developer testing and debugging.


Distribution Scenario

When a developer distributes an AR application:
	•	If the end user uses BeamPro:
No need to install ControlGlasses. BeamPro’s built-in MyGlasses app already serves as the server.
	•	If the end user uses a compatible Android phone:
The ControlGlasses app must be installed for the AR application to run.


⸻

Architecture Overview

The SDK uses a Client/Server model:
	•	Server: ControlGlasses (or MyGlasses on BeamPro)
	•	Client: Developer-built AR applications using the XREAL SDK

Most algorithm libraries are stored within ControlGlasses rather than in every APK.
When an AR application starts, it dynamically loads the required components from ControlGlasses.

Benefits of Dynamic Loading
	•	Keeps AR application APKs significantly smaller
	•	Allows developers to update algorithm libraries simply by updating ControlGlasses
	•	No need to republish or update the AR application itself

⸻

Features of ControlGlasses

1. Status Monitor

Provides real-time system information, including:
	•	What the AR application is expected to do next
	•	Current device or system state
	•	Errors and troubleshooting hints

Useful for debugging and development.

⸻

2. Firmware Management
	•	Detects and displays the current firmware version of XREAL glasses
	•	Supports OTA firmware updates
	•	Ensures the device runs the correct firmware required by AR apps

⸻

3. Refresh Rate Management

Allows users to adjust the glasses’ refresh rate.
However, the actual achievable refresh rate depends on multiple factors:
	1.	Phone display refresh rate
(If limited to 60Hz, glasses cannot exceed 60Hz)
	2.	Glasses’ own refresh rate setting
	3.	Application’s internal refresh rate configuration

Only when all three are set higher, the glasses will operate at the intended refresh rate.

⸻

4. Auto-launch Application

A feature designed for developers to improve iteration speed:
	•	Select an AR application in ControlGlasses
	•	Each time the glasses connect to the phone:
	1.	Glasses automatically switch to 3D mode
	2.	The selected AR application launches automatically

This feature significantly streamlines the testing workflow.

