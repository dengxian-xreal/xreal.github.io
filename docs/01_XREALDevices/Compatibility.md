# Compatibility

### Version Compatibility

Please refer to the following diagram for software compatibility among different versions of server app (MyGlasses or ControlGlasses), XREAL SDK, and Android. Any combination along a vertical line (for example, MyGlasses 1.7.0, XREAL SDK 3.0.0, Android 12 and below with target API 31) remains a compatible combination.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

  <TabItem value="MyGlasses 1.7.0 & ControlGlasses 1.1.0" label="MyGlasses 1.7.0 & ControlGlasses 1.1.0">
  ![image-20250303161933651](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250303161933651.png)
  </TabItem>




</Tabs>





You could find settings for Target API level in **Project Settings -> Player -> Target API Level**.

### Feature Compatibility

#### XREAL Glasses

NRSDK runs on multiple Android devices and different types of XREAL glasses (Air / Light). The following tables list the NRSDK features that are supported by XREAL Light / Air, and the Android phone models that support XREAL Light / Air.



| Features                            | XREAL One Series  (with RGB Camera)         | XREAL Air/Air 2/Air 2 Pro | XREAL Air 2 Ultra |
| :---------------------------------- | :-------------------- | :------------------------ | :---------------- |
| Head Tracking                       | 3DoF                  | 3DoF                      | 6DoF              |
| Plane Tracking                      | No                   | No                        | Yes               |
| Image Tracking                      | No                   | No                        | Yes               |
| Hand Tracking                       | No                   | No                        | Yes               |
| Depth Mesh                          | No                   | No                        | Yes               |
| Spatial anchor                      | No                   | No                        | Yes               |
| First Person View  | Application & Reality  | Application               | Application       |
| Controller                          | 3DoF                  | 3DoF                      | 3DoF              |
| Customize Phone Controller UI       | Yes                   | Yes                       | Yes               |
| Emulator Testing                    | Yes                   | Yes                       | Yes               |
| Notification Popup                  | Yes                   | Yes                       | Yes               |


It is worth noting that **XREAL Air, Air 2, and Air 2 Pro have no camera, hence no tracking features other than rotations**. 




#### Android Phones

To focus on developing better features and ensuring the usability and stability of our glasses, we have released our own XR spatial computing device, **BeamPro.** Starting from NRSDK 2.3.0, we will be reducing the list of supported phone models. Beyond BeamPro, we will only continue to support Samsung flagship models, as detailed in the list below.

Moreover, compatibility with **Air 2 Ultra** also means that features such as hand tracking, plane detection, meshing, image tracking, and spatial anchor will work seamlessly on these phones.

| Brand   | Chip                                   | Model Name         | Model Number | Android Version |
| :------ | :------------------------------------- | :----------------- | :----------- | :-------------- |
| Samsung | Qualcomm Snapdragon 8 Gen 3            | galaxy S24         | SM-S9210     | Android 14      |

---