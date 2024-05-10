# Setting Up Photon

### 1. Install photon

Search for Photon Unity Networking in the Unity Asset Store, then download and import it into your project. (Note whether you are downloading PUN1 or PUN2. This tutorial uses PUN2, as there may be some compatibility issues with PUN1. It is recommended to use PUN2).

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FtD8LGIH4z08yUDDpdK3p%2Fimage.png&width=768&dpr=4&quality=100&sign=365a4819fb79b4bd22d84d1208c5121d09d7d1668aea81bf93b71c609315f30a)



Pay attention to resolving issues related to **assemblies**.

- Open the assembly of NRSDK.

  ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fww5PNqqp9U301NOXfTK0%2Foutput.png&width=768&dpr=4&quality=100&sign=8b75734aed5ca28f2cfa229a9f8c1a4cdb48658e647d743c035f0b3f48398c71)

- Find the "Assembly Definition References" section and click the "+" button to add a new reference. In the new reference, select the Photon assembly PhotonUnityNetworking and PhotonRealtime. Click the "Apply" button to save your changes.  

  ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FB5svt4wYKvTktFUjfE9r%2F4b1b741e-4b11-4471-87be-117081d07c7b.png&width=768&dpr=4&quality=100&sign=1d3f14bf9e7c36663260c047347aeda7a1ece21ee1511f6a4a1201301072eede)

### 2. Set up Photon in Unity

Use Photon Cloud ServerUse Self-hosted Server

1. Register and create a new application on the [official website of Photon](https://dashboard.photonengine.com/publiccloud/overview), then obtain the App ID for your application.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FHSwJu5Y1xZuBKrthFF9Z%2F6839ac72-e8fc-4d9f-98f8-55dde33b18e8.png&width=768&dpr=4&quality=100&sign=9a0aff036b9382ba2aebd2029c3848a190b4f82a6de371b5f8fc9d9f16f8aa32)

2. In Unity, open PhotonServerSettings (`Window > Photon Unity Networking`), and then enter your App ID.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FBS3tHcFzlU0nxwcjNQlM%2Foutput%2520%281%29.png&width=768&dpr=4&quality=100&sign=ee0a687d3055e7119fd1d796d67dc349877bef778a4bece8a7aa2a88d1aa4740)

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
