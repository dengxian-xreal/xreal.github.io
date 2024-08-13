# Setting Up Photon

### 1. Install photon

Search for Photon Unity Networking in the Unity Asset Store, then download and import it into your project. (Note whether you are downloading PUN1 or PUN2. This tutorial uses PUN2, as there may be some compatibility issues with PUN1. It is recommended to use PUN2).

  <img src="https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FtD8LGIH4z08yUDDpdK3p%2Fimage.png&width=768&dpr=4&quality=100&sign=365a4819fb79b4bd22d84d1208c5121d09d7d1668aea81bf93b71c609315f30a" alt="Description" style={{ width: '700px', height: 'auto' }}   />

Pay attention to resolving issues related to **assemblies**.

- Open the assembly of NRSDK.

  ![assembly](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/assembly.png)

- Find the "Assembly Definition References" section and click the "+" button to add a new reference. In the new reference, select the Photon assembly PhotonUnityNetworking and PhotonRealtime. Click the "Apply" button to save your changes.  

  ![image-20240813142059576](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813142059576.png)

### 2. Set up Photon in Unity

Use Photon Cloud ServerUse Self-hosted Server

1. Register and create a new application on the [official website of Photon](https://dashboard.photonengine.com/publiccloud/overview), then obtain the App ID for your application.

​	![image-20240813142117367](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813142117367.png)

2. In Unity, open PhotonServerSettings (`Window > Photon Unity Networking`), and then enter your App ID.

​	![2](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/2.png)

### 3. Joining a room

A crucial prerequisite for sharing an anchor among different users is that they are in the same room. Therefore, we need to set up a script to allow them to join the same room.

The `joinedRoomIndicator` is used to indicate a successful room joining. The method used here is to change the color of the join button after successfully joining.

```
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;

public class JoinRoomButton : MonoBehaviourPunCallbacks
{
    public Button joinedRoomIndicator;

    public void OnButtonClick()
    {
        // Connect to the Photon master server
        if (!PhotonNetwork.IsConnected)
        {
            PhotonNetwork.ConnectUsingSettings();
        }
        else
        {
            TryJoinRoom();
        }
    }

    public override void OnConnectedToMaster()
    {
        Debug.Log("Connected to Photon master server");
        TryJoinRoom();
    }

    private void TryJoinRoom()
    {
        // Try to join the room "MyRoom"
        PhotonNetwork.JoinRoom("MyRoom");
    }

    public override void OnJoinedRoom()
    {
        Debug.Log("Joined room: " + PhotonNetwork.CurrentRoom.Name);
        
        joinedRoomIndicator.image.color = Color.green;
    }

    public override void OnJoinRoomFailed(short returnCode, string message)
    {
        Debug.Log("Failed to join room");
        // If we failed to join the room, it might not exist, so let's try to create it
        PhotonNetwork.CreateRoom("MyRoom");
    }

    public override void OnCreatedRoom()
    {
        Debug.Log("Created room: " + PhotonNetwork.CurrentRoom.Name);
    }

    public override void OnCreateRoomFailed(short returnCode, string message)
    {
        Debug.Log("Failed to create room");
    }
}
```
