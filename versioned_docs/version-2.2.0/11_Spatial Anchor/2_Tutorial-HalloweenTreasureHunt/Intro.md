# Tutorial: Halloween Treasure Hunt

### What You'll Build

In this tutorial, we'll guide you through the process of creating a Halloween-themed treasure hunt game using Unity and the NRSDK. The game will feature two roles: a treasure hider and a treasure seeker. The hider will place treasures (or "anchors") in the game world and leave clues for the seeker. The seeker will then use these clues to find the treasures. The game will utilize the Spatial Anchor feature of the NRSDK to place and find the treasures.

At the end of this tutorial, you will have a fully functional game where players can hide and seek treasures in a Halloween-themed environment.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fo6alsA8Wc1HSCUMS4Oy3%2FCleanShot%25202023-07-24%2520at%252016.34.51.gif&width=768&dpr=4&quality=100&sign=608f50d83d395144b333eb9b5102fb2fa0ae56f4a735538d7886d313e380b208)

**Note:** For your convenience, we've provided a Unity package of the final product. You can download it here to see what the finished game looks like.



35MB

TreasureHuntGame.unitypackage

### What You'll Need

This tutorial assumes that you have already imported the NRSDK into your Unity project. If you haven't done so, please follow the instructions in the NRSDK documentation to get started.

In addition to the NRSDK, you will also need the following assets and materials:

- [Halloween-themed 3D models for the treasures](https://assetstore.unity.com/packages/3d/props/poly-halloween-236625)
- [UI elements for the game interface](https://assetstore.unity.com/packages/2d/gui/fantasy-wooden-gui-free-103811)
- Scripts for game logic

### 1. Setting Up the Game Environment

First, import the assets and materials package into your Unity project. This package includes the 3D models for the treasures and the UI elements for the game interface. Arrange the 3D models in your game world to create a Halloween-themed environment.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FDa83tcVQgeC7mh0hfUns%2Fimage.png&width=768&dpr=4&quality=100&sign=71cf77d04e9b0b6df5bd95c01e04ea1b3b14fccf42b1943ba247639888f34941)

Environmental material package

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FYxUrfFeQW2aISSoj14GK%2Fimage.png&width=768&dpr=4&quality=100&sign=fd9ff17d0f550f7e67bbe81f0cf4c5498a025a46514e9a58e58983c2a7a98f36)

The effect after the completion of environmental arrangement.

### 2. Creating the Game Logic

Next, you'll need to create scripts for the game logic. The game will have two main scripts: `ScoreManager` and `LocalMapExample`.

The `ScoreManager` script will keep track of the number of treasures found by the player. It will also update the score display on the game interface.



It's important to note that the score increment mechanism is triggered when an anchor (representing a treasure) becomes visible in the scene, which we define as the player successfully finding a treasure.

In this game, when the player clicks the "Start" button, the `Load` method is called. This method loads all the anchors stored in memory into the scene but initially places them 10,000 meters away, beyond the camera's display range. Therefore, the player cannot see these anchors at first.

However, as the player moves around in the physical world and approaches the location where a treasure was placed, the corresponding anchor's state switches to "tracking". This state change causes the anchor's position to update to its stored location, making it visible in the scene. At this point, the `AddScore` method is called to increment the player's score(See the picture below). 

This mechanism ensures that the score only increases when the player has successfully found a treasure, i.e., when an anchor becomes visible in the scene.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F0KDKxcTKs0j1CJHxGEBu%2Fimage.png&width=768&dpr=4&quality=100&sign=453c31578cee22392bb62eceea07188bca290cc7a038aca9940f3d78a85ff79e)



````
```csharp
using System.Diagnostics;
using UnityEngine;
using UnityEngine.UI;
using System.Collections;
public class ScoreManager : MonoBehaviour
{
    public int score = 0; // current score
    public int totalAnchors; // Total number of treasures in the scene.
    public Text scoreText; // UI elements for displaying scores

    // Get the score text component at the beginning.
    void Start()
    {
        scoreText = GameObject.Find("ScoreText").GetComponent<Text>();
        totalAnchors = 0;
    }

   
    void Awake()
    {
        DontDestroyOnLoad(gameObject);
    }

    // Increase the score when the seeker finds the treasure (the treasure is displayed in the scene).
    public void AddScore(int amount)
    {
        score += amount;
        UnityEngine.Debug.Log("Score increased. Current score: " + score);
        UpdateScoreText();
    }
    
    public void OnButtonClick()
    {
        StartCoroutine(WaitAndExecute());
    }

    private IEnumerator WaitAndExecute()
    {
        yield return new WaitForSeconds(1f);
        totalAnchors = GameObject.FindGameObjectsWithTag("AnchorItem").Length;
        UpdateScoreText();
    }


    // the method of updating the display scores.
    private void UpdateScoreText()
    {
        if (scoreText != null)
        {
           scoreText.text = "Found " + score + " / " + totalAnchors + " treasures.";
        }
    }

    public void ClearScores()
    {
        score=0;
        UpdateScoreText();
    }
}

```
````

The LocalMapExample script will handle the placement and retrieval of the treasures. It will use the Spatial Anchor feature of the NRSDK to place the treasures in the game world and to find them later. 

In addition to the functionalities mentioned in the overview section, the LocalMapExample script used in this tutorial also includes an "EraseAllAnchors" function. This function allows the player to quickly delete all existing anchors by removing the XREAL Map folder, which is where the anchor files are stored. The folder will be automatically recreated the next time the application is launched. Alternatively, you can modify the `EraseAllAnchors` method to delete the contents of the folder instead of the entire folder for more flexibility.This function can be useful for developers as a "Start New Game" method, allowing players to start a fresh game by erasing all previously placed anchors.

````
```csharp
 
        /// <summary> Erase all anchors from disk. </summary>
        public void EraseAllAnchors()
        {
            if (m_NRWorldAnchorStore == null)
            {
                return;
            }

            string path = m_NRWorldAnchorStore.MapPath;
            if (Directory.Exists(path))
            {
                Directory.Delete(path, true);  // the second parameter is to recursively delete the folder
                Debug.Log("[LocalMapExample] Erased all anchors.");
            }
            else
            {
                Debug.Log("[LocalMapExample] No anchors found to erase.");
            }
        }
```
````

### 3. Implementing the Game Interface

The game interface will include buttons for the player to choose their role (hider or hunter), to place and find treasures, and to display the score. You'll need to create these buttons using the UI elements from the assets and materials package.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FJuZ58fwyMz2u0FtF8Rxg%2Fimage.png&width=768&dpr=4&quality=100&sign=b33ba81a1ee3411e9a8e6c0cd47d0e92c5037aecd2f706e19402401b985ad7e0)

To make the game simpler and more engaging, we've also included a feature that allows the 'Hider' to leave clues for the 'Seeker' to aid in their treasure hunt.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FFBrY0NZcwsJGm4AGNxQW%2Fimage.png&width=768&dpr=4&quality=100&sign=7cf35be5f3a82c6fba1c9607df6510b1f72cc9dc5fd39e325419fede8fbe63f0)

To manage the clicks of various buttons and the visibility switch between interfaces, we use a script named `PanelManager`. This script handles all interface interactions, including button click events and panel display/hide operations.

In this tutorial, we won't detail the code of `PanelManager`, but you can find it in the provided resource pack. This script is mainly for interface management and does not involve the core logic of the game, so we won't delve into it here.

However, there's a crucial point to note: when the "hider" player saves a treasure, if they place the anchor and quickly click save, **there's a chance the save will fail**. To address this, we need to get the callback of a successful anchor save and provide feedback to the user. The implementation of this feature involves three scripts: `AnchorItems`, `NRWorldAnchor`, and `NRWorldAnchorStore`.(The modified scripts can be found in the  [Handle the Situation of Failed Anchor Saving](https://xreal.gitbook.io/nrsdk/development/spatial-anchor/tutorial-halloween-treasure-hunt/handle-the-situation-of-failed-anchor-saving), which can be directly replaced with the original scripts)

In the `AnchorItems` script, we modified the `Save` method, adding logic to check whether the save was successful. If the save fails, we display a failure panel. If the save is successful, we change the color of the save button to green.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fe7gNiZrnDnQp03LI0NLP%2Fimage.png&width=768&dpr=4&quality=100&sign=b0e6583e4114e05dd459db6c81621e833a7d12c62a3128a427acffcb41a391d7)

```
public void Save()
{
    if (m_NRWorldAnchor != null)
    {
        
        m_NRWorldAnchor.SaveAnchor(success =>
        {
            if (success)
            {
                Debug.Log("Anchor saved successfully!");
                saveButton.image.color = Color.green;
            }
            else
            {
                Debug.LogError("Failed to save anchor!");
                saveButton.image.color = Color.red;
                failedPanel.SetActive(true);
            }
        });
        
    }
       
}
```

In the `NRWorldAnchorStore` script, we added a callback parameter in the `SaveAnchor` method. If the save fails, the callback will receive `false`, and if the save is successful, it will receive `true`. You can now execute different logic based on the result of the save operation."

```
public void SaveAnchor(NRWorldAnchor anchor, SaveAnchorCallback callback)
        {
            NRDebugger.Info("[NRWorldAnchorStore] Save Anchor: {0}", anchor.UserDefinedKey);
            if (m_Anchor2ObjectDict.ContainsKey(anchor.UUID))
            {
                NRDebugger.Warning("[NRWorldAnchorStore] Save a new anchor that has already been saved.");
                callback?.Invoke(false);
            }

            try
            {
                m_Anchor2ObjectDict.Add(anchor.UUID, anchor.UserDefinedKey);
                string json = LitJson.JsonMapper.ToJson(m_Anchor2ObjectDict);
                string path = Path.Combine(MapPath, Anchor2ObjectFile);
                NRDebugger.Info("[NRWorldAnchorStore] Save to the path:" + path + " json:" + json);
                File.WriteAllText(path, json);
                AsyncTaskExecuter.Instance.RunAction(() =>
                {
                    bool success = true;
#if UNITY_EDITOR
                    Thread.Sleep(1000);
                    File.Create(Path.Combine(MapPath, anchor.UUID)).Dispose();
#else
                    success = m_NativeMapping.SaveAnchor(anchor.AnchorHandle, Path.Combine(MapPath, anchor.UUID));
#endif
                    if (!success)
                    {
                        MainThreadDispather.QueueOnMainThread(() =>
                        {
                            NRDebugger.Info("[NRWorldAnchorStore] Save Anchor failed.");
                            m_Anchor2ObjectDict.Remove(anchor.UUID);
 			    callback?.Invoke(false);
                        });
                    }
                    else
                    {
			callback?.Invoke(true);
			UnityEngine.Debug.Log("[NRWorldAnchorStore] Save Anchor successfully");
                        
			bool result=File.Exists(Path.Combine(MapPath, anchor.UUID));
			if(!result)
			{
			    Debug.LogError($"File {Path.Combine(MapPath, anchor.UUID)} does not exist!");
			}
			else
			{
			    Debug.Log($"File {Path.Combine(MapPath, anchor.UUID)} exist!");
			}
                    }
                });
            }
            catch (Exception e)
            {
                NRDebugger.Warning("[NRWorldAnchorStore] Write anchor to object dict exception:" + e.ToString());
                callback?.Invoke(false);
            }
        }
```

In the NRWorldAnchor script, we've modified the `SaveAnchor` method to include a callback. This way, you can easily obtain the save status and act on specific logic accordingly.

With these modifications, we can provide user feedback based on the save status when saving an anchor.

### 4. Testing the Game

Finally, test the game to ensure everything works as expected. You should be able to choose a role, place and find treasures, and see your score update as you find treasures. All these steps can be performed directly in the Unity Editor, so there's no need to package the game after each step. Only a final deployment to your mobile device for testing is necessary.Additionally, you can hold down the Shift key to move the ray, simulating the interaction with the game through a mobile device. The black area on the right side of the Unity Editor represents the screen of your mobile device.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FoDtFDer7l4B1ZBKKzCXw%2FCleanShot%25202023-07-21%2520at%252014.33.56.gif&width=768&dpr=4&quality=100&sign=8e6e0993bd8aca8d6fb2bc264e40a56f4c021d597678ea5e11a311770c2394ca)

That's it! You've now created a Halloween-themed treasure hunt game using Unity and the NRSDK. Happy hunting!

### Conclusion

In this tutorial, you've learned how to create a treasure hunt game using Unity and the NRSDK. You've also learned how to use the Spatial Anchor feature of the NRSDK to place and find objects in the game world. We hope you found this tutorial helpful and that it inspires you to create your own games using these tools.
