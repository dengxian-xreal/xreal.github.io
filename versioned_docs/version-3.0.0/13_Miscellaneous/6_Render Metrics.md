# Render Metrics

### **Setup**

1. Locate the `NRCameraRig` object in your Unity scene.
2. Attach the `NRMetrics` script to `NRCameraRig`.

![img](https://content.gitbook.com/content/yXoV7SMVFQhr75lOIoQv/blobs/eQTdKuDF52FZT2HcNAeA/image.png)

### **Log Examples**

```
FrameMetrics: FPS=60, frNum=61, UpdPrd=39198222, prd=30078850, postPrd=28850795, sdkPrd=39802247, FPC=1.081967, EFC=0, early=0, drop=8 frNumA=753, UpdPrdA=41190049, prdA=32105576, postPrdA=30656161, sdkPrdA=41785068, FPCA=1.092961, EFCA=0.1288181, earlyA=70, dropA=76
```

This log is recorded once every second.

The log is divided into two parts. The first half,

> FrameMetrics: FPS=60, frNum=61, UpdPrd=39198222, prd=30078850, postPrd=28850795, sdkPrd=39802247, FPC=1.081967, EFC=0, early=0, drop=8"represents the records within the past 1 second.

Meanwhile,

> "frNumA=753, UpdPrdA=41190049, prdA=32105576, postPrdA=30656161, sdkPrdA=41785068, FPCA=1.092961, EFCA=0.1288181, earlyA=70, dropA=76

refers to the cumulative records from the start to the current time. Below are the meanings of each metric:

**FPS**: Actual frame rate

**frNum/frNumA:** Number of frames counted/Total accumulated number of frames counted.

**Prediction time:**Prediction time is the absolute time between when the app queries the pose before rendering, and the time the frame is displayed on the screen. This should almost always be a fixed number between 40 and 50 ms, depending on your engine and display refresh rate. i.e. GetPredictedDisplayTime - CurrentTime

**Prd/PrdA (Prediction time during Unity's Prerender):**Prediction time calculated during Unity's PreRender phase.

**updPrd/updPrdA (Prediction time during Unity's Update):**Prediction time calculated during Unity's Update phase

**postPrd/postPrdA:** Prediction time calculated during Unity's PostRender Phase

***Timewarp:\***In Augmented Reality (AR) technology, the screen's display refresh rate is not directly tied to the frame rendering speed of the application. This is because there's an intermediate step known as "TimeWarp." The primary role of TimeWarp is to adjust the orientation of the last frame rendered by the application to match the user's head movement and then present it on the physical display. This ensures that even if the application hasn't rendered a new frame in real-time, the user still sees an image that aligns with their head movement.

**drop/dropA**: When TimeWarp expects to present the latest frame rendered by the application at a specific time, but that frame isn't ready yet, TimeWarp has to resort to the previous frame. Since this previous frame might be relatively outdated and no longer matches the current head movement of the user, this situation is referred to as "dropping a frame" or simply "drop."

**tear/tearA**:  "tear" refers to the number of frames that experience screen tearing per second. Screen tearing occurs when the application's frame rate is lower than the display's refresh rate, resulting in visual artifacts or inconsistencies in the displayed image. "TearA" represents the total number of frames that experienced screen tearing throughout an application's lifecycle or a single running session.

**early/earlyA**: If the application renders frames at a very fast pace, it might complete the rendering of a frame before it's actually needed. Such frames are termed "early frames." Occasional early frames are acceptable, but if there's a consistent occurrence of a large number of early frames, it might indicate that the settings for the CPU or GPU are set higher than necessary, leading to potential resource wastage.

**FPC:** single frame display count

Number of times a single frame is displayed on the screen, i.e, Number of frames on the glasses/Number of frames rendered by Unity. This value is always greater than 1. 
