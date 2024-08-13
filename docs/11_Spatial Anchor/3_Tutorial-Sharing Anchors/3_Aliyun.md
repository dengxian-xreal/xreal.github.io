# Cloud Storage: Aliyun OSS (optional)

1. Create an Alibaba Cloud Account and Activate the OSS Service.
2. Navigate to the OSS console and create a new storage bucket. Ensure the permissions for this bucket are set to '**Public Read/Write**'.
3. Generate an AccessKey for OSS Access. Take note of the AccessKey ID and AccessKey Secret as these will be used to connect your SDK to the OSS service.

:::tip

**Steps to Create an Alibaba Cloud AccessKey:**

1. Log in to the Alibaba Cloud console.
2. On the top-right corner of the console homepage, click on your profile picture. From the dropdown menu, select "AccessKey Management".
3. On the AccessKey management page, click the "Create AccessKey" button.
4. A dialog will pop up, allowing you to choose between "Regular AccessKey" and "Secure AccessKey". For most purposes, the "Regular AccessKey" should suffice.
5. Click the "Confirm" button, and your new AccessKey will be generated.
6. Upon successful creation, you'll be presented with your AccessKey ID and AccessKey Secret. It's crucial to note down these values as they'll be required to configure your SDK. For security reasons, the AccessKey Secret is only visible during its creation, so ensure you record it at this time.

![11](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/11.png)

:::

4. Download and Import the Alibaba Cloud OSS .NET SDK. You can find the download link and import instructions for the SDK in Alibaba Cloud's official documentation.

![33](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/33.png)

For more detailed information, you might find the [official Alibaba Cloud documentation](https://github.com/aliyun/aliyun-oss-csharp-sdk?file=aliyun-oss-csharp-sdk.git) on GitHub clearer and more concise. This tutorial adopts the following installation method.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FuU3ih2r8FqCFI7WDV80f%2Fimage.png&width=768&dpr=4&quality=100&sign=f0385d747bb1970dc99358875524acfdd7135c446259f002d08647d6967e5cba)

Ensure that the generated `Aliyun.OSS.dll` file is placed in `Assets > Plugins`.

1. Utilize the SDK's API in Your Unity Script. To upload and download files using the SDK, you'll need to provide your AccessKey ID, AccessKey Secret, Bucket name, and filename.

```
using Aliyun.OSS;
using System;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;

public class AliyunOSSManager
{
    
    private static AliyunOSSManager _instance;
    public static AliyunOSSManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new AliyunOSSManager();
            }
            return _instance;
        }
    }
    private string accessKeyId = "your-access-key-id";
    private string accessKeySecret = "your-access-key-secret";
    private string endpoint = "your-endpoint";//similar to：oss-cn-beijing.aliyuncs.com
    private string bucketName = "your-bucket-name";

    private OssClient client;

    public AliyunOSSManager()
    {
        client = new OssClient(endpoint, accessKeyId, accessKeySecret);
    }

    public Task UploadFile(string objectName, string localFilename)
    {
        TaskCompletionSource<bool> tcs = new TaskCompletionSource<bool>();

        try
        {
            client.PutObject(bucketName, objectName, localFilename);
            Debug.Log("File uploaded successfully.");
            tcs.SetResult(true); // Set the task as successfully completed.
        }
        catch (Exception e)
        {
            Debug.LogError("Failed to upload file: " + e.Message);
            tcs.SetResult(false); // Set the task to complete, but failed to return.
        }

        return tcs.Task;
    }

    public Task DownloadFile(string objectName, string localFilename)
    {
        TaskCompletionSource<bool> tcs = new TaskCompletionSource<bool>();

        try
        {
            OssObject ossObject = client.GetObject(bucketName, objectName);
            using (var requestStream = ossObject.Content)
            {
                byte[] buf = new byte[1024];
                var fs = File.Open(localFilename, FileMode.OpenOrCreate);
                var len = 0;
                while ((len = requestStream.Read(buf, 0, 1024)) != 0)
                {
                    fs.Write(buf, 0, len);
                }
                fs.Close();
            }

            Debug.Log("File downloaded successfully.");
            tcs.SetResult(true); // Set the task to be completed successfully.
        }
        catch (Exception e)
        {
            Debug.LogError("Failed to download file: " + e.Message);
            tcs.SetResult(false); // Set the task to complete, but the return failed.
        }

        return tcs.Task;
    }
}
```
