# Tutorial: Sharing Anchors

### **Introduction**

Sharing anchors between devices is essential for multi-user AR experiences. This tutorial will guide you through the process of sharing anchors by using Photon to transmit anchor UUIDs in real-time and cloud storage to persistently store the anchor data.

At a high level, the process works as follows:

1. When a user creates an anchor, its UUID is sent to other users in the same Photon room.
2. The anchor data is then stored in a cloud storage solution.
3. Other users in the room, upon receiving the UUID, access the cloud storage to download the anchor data.
4. Once downloaded, the anchor is loaded into their AR scene, effectively sharing the anchor across devices.

For the cloud storage part, any cloud storage provider that allows file upload and download can be used. In this tutorial, we provide examples for two cloud storage solutions: 

- Firebase  
- Alibaba Cloud OSS. 

The methods for other providers should be similar, and developers are encouraged to explore the options that best suit their needs.

### **Prerequisites**

- Unity with NRSDK 2.1 installed.
- Photon Unity Networking 2 (PUN 2) package.
- Firebase Unity SDK.

### All Materials Needed in This Tutorial

:::tip

The following package includes all the necessary scene and the majority of the scripts required for this tutorial. However, it's important to note that developers will still need to complete the steps related to [photon](1_SettingUpPhoton.md) and cloud storage themselves.

Additionally, due to the tutorial's involvement with modifications to the built-in scripts of NRSDK, specifically NRWorldAnchor.cs and NRWorldAnchorStore.cs, these changes cannot be included within this package. Please refer to the tutorial's content, specifically in the section on '[Implementing Cloud Save and Load](./4_CloudSaveandLoad.md),' to make the necessary modifications.



[ShareAnchor.unitypackage](https://content.gitbook.com/content/yXoV7SMVFQhr75lOIoQv/blobs/Na0wdzJVeSsXVViY4Nn3/ShareAnchor.unitypackage)

:::

