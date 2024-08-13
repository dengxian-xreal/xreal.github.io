# Sharing Anchors with Photon

### **1. Setting up the UUIDManager**

Create a script named `UUIDManager.cs`. Within the `UUIDManager` class, utilize a `PhotonView` to synchronize the UUID. In the `AnchorItem` class, when there's a need to share the UUID, call the relevant method from `UUIDManager`. The `UUIDManager` will then use Photon's RPC mechanism to send the UUID to other clients. Ensure that the `UUIDManager` class is attached to a GameObject in your scene and that this GameObject has a `PhotonView` component added to it.

![image-20240813171201781](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171201781.png)

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using NRKernal.NRExamples;

public class UUIDManager : MonoBehaviourPun
{
    public static UUIDManager instance; // 单例实例

    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
        }
        else if (instance != this)
        {
            Destroy(gameObject);
        }
    }

    [PunRPC]
    public void ShareAnchorUUID(string uuid)
    {
        photonView.RPC("ReceiveAnchorUUID", RpcTarget.Others, uuid);
    }

    [PunRPC]
    public void ReceiveAnchorUUID(string uuid)
    {
        Debug.Log("Received UUID: " + uuid);

        GameObject localMapDemo = GameObject.Find("LocalMapDemo");
        if (localMapDemo != null)
        {
            LocalMapExample localMapExample = localMapDemo.GetComponent<LocalMapExample>();
            if (localMapExample != null)
            {
                localMapExample.CloudLoad(uuid);
                Debug.Log("CloudLoad:"+uuid);
            }
            else
            {
                Debug.LogError("LocalMapExample component not found");
            }
        }
        else
        {
            Debug.LogError("LocalMapDemo GameObject not found");
        }
    }

}
```

### 2. Add a ShareUUID method to AnchorItem to receive the UUID of the anchor.

```
 public void ShareUUID()
        {
            if (m_NRWorldAnchor != null)
            {
                UUIDManager.instance.ShareAnchorUUID(m_NRWorldAnchor.UUID);
                Debug.Log("Shared anchor: " + m_NRWorldAnchor.UUID);
            }
        }
```

### 3. Add ShareUUID in the CloudSave method.

When a player in the room performs cloud storage, it will be automatically shared with other players in the room.

```
public async void CloudSave()
        {
            if (m_NRWorldAnchor != null)
            {
                bool result=await NRWorldAnchorStore.Instance.CloudSaveAnchor(m_NRWorldAnchor);
                if (result)
                {
                    NRDebugger.Info("Ready to share anchor: " + m_NRWorldAnchor.UUID);
                    Debug.Log("Ready to share anchor: " + m_NRWorldAnchor.UUID);
                    ShareUUID();
                }
                else
                {
                    Debug.LogError("Failed to save anchor");
                }
            }
            else
            {
                Debug.LogError("m_NRWorldAnchor is null, failed to save this anchor to CloudStorage");
            }
        }  
```



### **Conclusion**

Congratulations on completing this comprehensive guide on sharing anchors using Photon and Cloud Storage! You've taken significant steps in enhancing the multi-user AR experience. Thank you for dedicating your time and effort to this tutorial. Best of luck with your future AR projects!
