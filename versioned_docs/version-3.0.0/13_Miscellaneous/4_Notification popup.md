# Notification Popup

### Ordinary prompt window

Ordinary prompt window provides information about the status of the devices, such as slam tracking state, glasses temprature level, device battery state.

![img](https://nrealsdkdoc.readthedocs.io/en/latest/_images/n1-0.png)

**Enable Notification**

- Find the NRSessionConfig in your project

- Check the “Enable Notifiction” box


**Notification types**

- Currently provided notifiction windows:

  - Slam tracking lost
  - Glasses Temperature Warm
  - Glasses Temperature Hot
  - Phone Battery 30% Notification
  - Phone Battery 15% Notification

- Please refer to *NRNotificationListener* prefab under *NRSDK>Resources* and its *NRNotificationListener.cs* script to customize your notification message.


### Error prompt window

Error prompt window provides information for sever error. It usually pops up when the devices has been unable to run properly.

**Customize error tips**

- Find the ***NRGlassesErrorTip\*** prefab under *NRSDK>Resources*, copy it to your project.

- Modify and save it as a new prefab, and drag it to your SessionConfig.

- Modify prompt text
