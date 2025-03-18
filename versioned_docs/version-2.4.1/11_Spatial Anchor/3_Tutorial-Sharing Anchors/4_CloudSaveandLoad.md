# Implementing Cloud Save and Load

### 1. CloudSaveAnchor

Add the CloudSaveAnchor method to `NRWorldAnchorStore`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Use FirebaseUse Aliyun OSS" label="Use FirebaseUse Aliyun OSS" default>
    
    ```
    namespace NRKernal.Persistence
    {
        // ... Other codes ...
    
        public class NRWorldAnchorStore : IDisposable
        { 
            // ... Other codes ...
            public const string CloudAnchor2ObjectFile = "cloud_anchor2object.json";
        /// <summary>save an anchor to firebase cloud server</summary>
            public async Task<bool> CloudSaveAnchor(NRWorldAnchor anchor)
            {
                NRDebugger.Info("[NRWorldAnchorStore] Cloud save Anchor: {0}", anchor.UserDefinedKey);
    
                string localFilename = Path.Combine(MapPath, anchor.UUID);
                Debug.LogError("UploadFile: "+localFilename);
                NRDebugger.Info("[NRWorldAnchorStore] UploadFile:" + localFilename);
                
            FirebaseStorageManager storageManager = FirebaseStorageManager.Instance;
            await storageManager.UploadFile(anchor.UUID, localFilename);
                // Update the cloud anchor to object dictionary
    
                // Save the dictionary to a JSON file
                string json = LitJson.JsonMapper.ToJson(m_Anchor2ObjectDict);
                string path = Path.Combine(MapPath, CloudAnchor2ObjectFile);
                NRDebugger.Info("[NRWorldAnchorStore] Save to the path for next upload:" + path + " json:" + json);
                File.WriteAllText(path, json);
    
                // Upload the JSON file to the cloud
            
            await storageManager.UploadFile(CloudAnchor2ObjectFile, path);
    
                return true;
            }
        
        }
    
            // ... Other codes ...
        }
    }
    ```
  </TabItem>
  <TabItem value="Use Aliyun OSS" label="Use Aliyun OSS">
    ```
    namespace NRKernal.Persistence
    {
    // ... Other codes ...

        public class NRWorldAnchorStore : IDisposable
        {
            // ... Other codes ...
    
            private AliyunOSSManager ossManager;
    
            // ... Other codes ...
    
            public const string CloudAnchor2ObjectFile = "cloud_anchor2object.json";
            /// <summary>save an anchor to Aliyun cloud server</summary>
            public async Task<bool> CloudSaveAnchor(NRWorldAnchor anchor)
                {
                    NRDebugger.Info("[NRWorldAnchorStore] Cloud save Anchor: {0}", anchor.UserDefinedKey);
    
                    string localFilename = Path.Combine(MapPath, anchor.UUID);
                    Debug.LogError("UploadFile: "+localFilename);
                    NRDebugger.Info("[NRWorldAnchorStore] UploadFile:" + localFilename);


                    ossManager = AliyunOSSManager.Instance;
                    // FirebaseStorageManager storageManager = FirebaseStorageManager.Instance;
                    await ossManager.UploadFile(anchor.UUID, localFilename);
                    // Update the cloud anchor to object dictionary
    
                    // Save the dictionary to a JSON file
                    string json = LitJson.JsonMapper.ToJson(m_Anchor2ObjectDict);
                    string path = Path.Combine(MapPath, CloudAnchor2ObjectFile);
                    NRDebugger.Info("[NRWorldAnchorStore] Save to the path for next upload:" + path + " json:" + json);
                    File.WriteAllText(path, json);
    
                    // Upload the JSON file to the cloud
                    await ossManager.UploadFile(CloudAnchor2ObjectFile, path);
    
                    return true;
                }
    
            // ... Other codes ...
            }
        }
    ```
  </TabItem>
</Tabs>






Add the CloudSaveAnchor method in `NRWorldAnchor`, remember to add the namespace at the top of the script `using System.Threading.Tasks;`

```
public async Task<bool> CloudSaveAnchor()
        {
            return await NRWorldAnchorStore.Instance.CloudSaveAnchor(this);
        }
```

### 2. CloudSave

Add the CloudSave method in **AnchorItem**.

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

### 3. CloudLoad

Add CloudLoad() method in `localMapExample`: Download the specified file from the cloud server by specifying UUID and load it into the scene with LoadwithUUID.

```
public const string CloudAnchor2ObjectFile = "cloud_anchor2object.json";
public async Task CloudLoad(string uuid)
{
    if (m_NRWorldAnchorStore == null)
    {
        Debug.Log("[m_NRWorldAnchorStore] is null");
        return;
    }

    // Download the cloud anchor to object dictionary from the cloud
    string path = Path.Combine(m_NRWorldAnchorStore.MapPath, CloudAnchor2ObjectFile);
    //await ossManager.DownloadFile(CloudAnchor2ObjectFile, path);
    await storageManager.DownloadFile(CloudAnchor2ObjectFile, path);
    // Read the dictionary from the downloaded JSON file
    Dictionary<string, string> m_Anchor2ObjectDict = new Dictionary<string, string>();
    if (File.Exists(path))
    {
        string json = File.ReadAllText(path);
        m_Anchor2ObjectDict = LitJson.JsonMapper.ToObject<Dictionary<string, string>>(json);
    }

    // Get the UserDefinedKey for the given uuid
    string UserDefinedKey;
    
    if (m_Anchor2ObjectDict.TryGetValue(uuid, out UserDefinedKey))
    {
        // Download the anchor file from the cloud
        string anchorPath = Path.Combine(m_NRWorldAnchorStore.MapPath, uuid);
        //await ossManager.DownloadFile(uuid, anchorPath);
        await storageManager.DownloadFile(uuid, anchorPath);
        Debug.Log("anchorPath: "+anchorPath);
        Debug.Log("uuid: "+uuid);
        Debug.Log("UserDefinedKey: "+UserDefinedKey);

        // Create a new dictionary for the specific UUID and Key
        Dictionary<string, string> specificAnchorDict = new Dictionary<string, string>();
        specificAnchorDict[uuid] = UserDefinedKey;

        // Save the downloaded dictionary to the NRWorldAnchorStore
        m_NRWorldAnchorStore.SetAnchor2ObjectDict(specificAnchorDict);

        // Load the anchor
        m_NRWorldAnchorStore.LoadwithUUID(uuid, (UInt64 handle) =>
        {
            var go = Instantiate(m_AnchorPrefabDict[UserDefinedKey]);
            Debug.Log("cloud load: successful! ");
#if UNITY_EDITOR
            go.transform.position = UnityEngine.Random.insideUnitSphere + Vector3.forward * 2;
#else
            go.transform.position = Vector3.forward * 10000;
#endif
            NRWorldAnchor anchor = go.AddComponent<NRWorldAnchor>();
            anchor.UserDefinedKey = UserDefinedKey;
            anchor.UUID = uuid;
            anchor.BindAnchor(handle);
            go.SetActive(true);

            NRDebugger.Info("[NRWorldAnchorStore] CloudLoadwithUUID: {0}, UserDefinedKey: {1} Handle: {2}", uuid, UserDefinedKey, handle);
        });
    }
    else
    {
        Debug.LogError("No UserDefinedKey found for uuid: " + uuid);
    }
}
```

This requires adding a method in NRWorldAnchorStore.cs to put the UUID of the anchor downloaded from the cloud into m_Anchor2ObjectDict.

Copy

```
public void SetAnchor2ObjectDict(Dictionary<string, string> newDict)
        {
            foreach (var item in newDict)
            {
                if (!m_Anchor2ObjectDict.ContainsKey(item.Key))
                {
                    m_Anchor2ObjectDict.Add(item.Key, item.Value);
                }
            }
        }
```

Similarly, this method needs to be added to NRWorldAnchor.

```
public void SetAnchor2ObjectDict(Dictionary<string, string> newDict)
        {
            NRWorldAnchorStore.Instance.SetAnchor2ObjectDict(newDict);
        }
```

### Test

We can simply test the upload and download functions in Unity Editor to see if they are working properly.

#### CloudSave:

1. **Button Attachment**: Attach the `CloudSave` method to a button. For demonstration purposes, we've linked it to a "share" button in our example.

   ![image-20240813170945565](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813170945565.png)

   ![image-20240813170957454](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813170957454.png)

2. **Running in Unity Editor**: Before proceeding with the Cloud Save operation, ensure that you've successfully saved the anchor. Launch your application within the Unity Editor to verify this.

   ![image-20240813171011384](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171011384.png)

3. **Log Verification**: After executing the Cloud Save, check the console for log messages. If you encounter a message similar to the one provided, it's a strong indication that your upload was successful.

   ![image-20240813171026357](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171026357.png)

4. **Cloud Storage Validation**: For added assurance, navigate to Firebase Storage or Aliyun OSS console to confirm that your data has been uploaded correctly.

   ![image-20240813171043665](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171043665.png)


#### CloudLoad

1. **Modifying** `localmapExample`: Add a test method and a test UUID within the `localmapExample`. Use the UUID of an anchor that's already stored on the cloud server.

```
 public string testuuid;
        public void TestCloudLoad()
        {
            CloudLoad(testuuid);
        }
```

1. **Button Attachment**: Similar to the `CloudSave` process, attach this test method to a button.

2. **Execution**: Run the method by pressing the button in your application.

3. **Log Verification**: Monitor the console for log messages. If you see messages indicating a successful download, it means the anchor has been retrieved correctly from the cloud.

   ![image-20240813171145187](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171145187.png)

We've successfully completed 90% of the process. Great job on making it this far! In the next section, we'll delve into using Photon to transmit the UUID. This will seamlessly connect all the steps we've covered so far. Stay with us as we approach the finish line!
