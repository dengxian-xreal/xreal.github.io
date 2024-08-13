# Cloud Storage: Firebase (optional)

For a comprehensive guide on integrating Firebase with Unity, developers are encouraged to consult the [official Firebase documentation](https://firebase.google.com/docs/unity/setup?authuser=0&_gl=1*cyka2y*_ga*MTYwMDM2MTA0OC4xNjkwOTU4Mzg2*_ga_CW55HF8NVT*MTY5MDk2NTE0Ny4zLjEuMTY5MDk2NTQ4Ny4wLjAuMA..#add-config-file). What follows in this tutorial is a concise overview tailored to our specific use case.

### **Create a Firebase Project**

1. Visit the [Firebase Console](https://console.firebase.google.com/).

2. Click on "Add Project" and follow the prompts to fill in the project information.

   ![image-20240813142301094](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813142301094.png)

3. Click "Create Project".

### **Add an App**

1. On the project overview page, click "Add App" and select the appropriate platform (e.g., Android).

   ![image-20240813142312246](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813142312246.png)

2. Follow the prompts to enter the app's package name and other information.

3. Download and save the configuration file (`**google-services.json**`) and place it in the `**Assets**` folder.

### **Install the SDK**

1. Download [**Firebase Unity SDK**](https://firebase.google.com/download/unity?authuser=0)
2. Import `**FirebaseStorage.unitypackage**` into Unity.

### **Add Storage** 

1. Go to **Build > Storage**

   ![image-20240813142324239](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813142324239.png)

2. Click **Get Started** and set up cloud storage

   ![image-20240813142346874](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813142346874.png)

3. The highlighted part in the following image is the folder location where we will upload the anchor file.

   ![3](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/3.png)

### **Upload/download files** 

We've developed a dedicated `FirebaseStorageManager` class to facilitate file upload and download functionalities. For detailed implementation, you can refer to the official  [documentation](https://firebase.google.com/docs/storage/unity/upload-files).

:::tip

It's important to note that whether you're uploading or downloading, the `**storagePath**` should include the specific filename, not just the directory. This specification is also highlighted in the documentation. 

![1](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/1.png)

Therefore, We set the file path obtained from the previous step as `**storageBasePath**` and later concatenate it with the filename to form the complete path for upload/download.

:::

```
using Firebase;
using Firebase.Extensions;
using Firebase.Storage;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

public class FirebaseStorageManager : MonoBehaviour
{
    public static FirebaseStorageManager Instance { get; private set; }
    public string storageBasePath = "gs://YourProjectName-xxxxxx.appspot.com/";

    private FirebaseStorage storage;
    private CancellationTokenSource cancellationTokenSource;
    private bool operationInProgress = false;
    
    public const string MapFolder = "XrealMaps";

    void Start()
    {
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task =>
        {
            FirebaseApp.Create();
            storage = FirebaseStorage.DefaultInstance;
            cancellationTokenSource = new CancellationTokenSource();
        });

       if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject); // Optional, if you want this instance to be preserved during scene transitions.
        }
        else
        {
           Destroy(gameObject); // 
        }
        
    }

    public Task UploadFile(string fileName, string localFilePath)
{
    string localFile = localFilePath;
    string storagePath = Path.Combine(storageBasePath, fileName);

    // Check if the file exists.
    if (!File.Exists(localFile))
    {
        Debug.LogError($"File {localFile} does not exist!");
        return Task.CompletedTask; // If the file does not exist, return a completed task.
    }
    else
    {
        Debug.Log($"File {localFile} exist!");
    }

    StorageReference storageRef = storage.GetReferenceFromUrl(storagePath);

    Debug.Log($"Uploading {localFile} to {storagePath}...");

    // Create a stream using FileStream.
    Stream fileStream = new FileStream(localFile, FileMode.Open);

    // Create a TaskCompletionSource to identify when the task is completed.
    TaskCompletionSource<bool> tcs = new TaskCompletionSource<bool>();

    // Use PutStreamAsync to upload the stream.
    storageRef.PutStreamAsync(fileStream).ContinueWithOnMainThread(task =>
    {
        if (task.IsFaulted || task.IsCanceled)
        {
            Debug.LogError(task.Exception.ToString());
            tcs.SetResult(false); // Set the task as completed, but return failure.
        }
        else
        {
            Debug.Log("File uploaded successfully.");
            tcs.SetResult(true); // Set the task to be completed successfully.
        }
    });

    return tcs.Task;
}



    public Task DownloadFile(string fileName, string localFilePath)
{
    string localFile = localFilePath;
    string storagePath = Path.Combine(storageBasePath, fileName);
    StorageReference storageRef = storage.GetReferenceFromUrl(storagePath);

    Debug.Log($"Downloading {storagePath} to {localFile}...");
    TaskCompletionSource<bool> tcs = new TaskCompletionSource<bool>();

    storageRef.GetFileAsync(localFile, new StorageProgress<DownloadState>(state =>
    {
        Debug.Log($"Downloading {state.BytesTransferred} of {state.TotalByteCount} bytes.");
    }), cancellationTokenSource.Token).ContinueWithOnMainThread(task =>
    {
        if (task.IsFaulted || task.IsCanceled)
        {
            Debug.LogError(task.Exception.ToString());
            tcs.SetResult(false); 
        }
        else
        {
            Debug.Log("File downloaded successfully.");
            tcs.SetResult(true); 
        }
    });

   
    return tcs.Task;
}

    public void CancelOperation()
    {
        if (operationInProgress && cancellationTokenSource != null)
        {
            Debug.Log("Cancelling operation...");
            cancellationTokenSource.Cancel();
            cancellationTokenSource = new CancellationTokenSource();
        }
    }
}
```

### **Common Issues**

1. After installing Firebase, building software in Unity may fail. This is a known issue with Android and requires adding `**launcherTemplate.gradle**` in Unity, then adding the following content:

```
    packagingOptions 
    {
        exclude 'META-INF/com.android.tools/proguard/coroutines.pro'
    }
```

2. Possible error may occur：

```
18063 19165 E AuthPII : [GoogleAccountDataServiceImpl] getToken() -> BAD_AUTHENTICATION. App: com.google.android.gms, Service: oauth2:https://www.googleapis.com/auth/emeraldsea.mobileapps.doritos.cookie
18063 19165 E AuthPII : vfc: Long live credential not available.
```

In this case, you need to update the Google Play Service of the mobile phone.
