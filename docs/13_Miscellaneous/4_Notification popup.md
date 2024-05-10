# Notification popup

### Ordinary prompt window

Ordinary prompt window provides information about the status of the devices, such as slam tracking state, glasses temprature level, device battery state.

![img](https://nrealsdkdoc.readthedocs.io/en/latest/_images/n1-0.png)

image0

**Enable Notification**

- Find the NRSessionConfig in your project

  

  ![image1](https://nrealsdkdoc.readthedocs.io/en/latest/_images/n1-1.png)

  

- Check the “Enable Notifiction” box

  

  ![image2](https://nrealsdkdoc.readthedocs.io/en/latest/_images/n1-2.png)

  

**Notification types**

- Currently provided notifiction windows:

  - Slam tracking lost
  - Glasses Temperature Warm
  - Glasses Temperature Hot
  - Phone Battery 30% Notification
  - Phone Battery 15% Notification

- Please refer to *NRNotificationListener* prefab under *NRSDK>Resources* and its *NRNotificationListener.cs* script to customize your notification message.

  

  ![image3](https://nrealsdkdoc.readthedocs.io/en/latest/_images/n1-3.png)

  

### Error prompt window

Error prompt window provides information for sever error. It usually pops up when the devices has been unable to run properly.

![img](https://content.gitbook.com/content/yXoV7SMVFQhr75lOIoQv/blobs/csSf8VxvUHDFmsmXyyGw/image.png)

**Customize error tips**

- Find the ***NRGlassesErrorTip\*** prefab under *NRSDK>Resources*, copy it to your project.

- Modify and save it as a new prefab, and drag it to your SessionConfig.

  ![img](https://nrealsdkdoc.readthedocs.io/en/latest/_images/n1-5.jpg)

  

  ![img](https://content.gitbook.com/content/yXoV7SMVFQhr75lOIoQv/blobs/DVt6TJK8iBv4bkeYm90s/image.png)

- Modify prompt text
