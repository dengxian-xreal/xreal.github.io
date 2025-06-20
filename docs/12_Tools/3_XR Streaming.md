# CloudXR

**CloudXR** enables you to live stream Steam/SteamVR content from PC to XREAL Glasses via your Wi-Fi network. 

:::tip

Please note that XR Streaming is no longer built into Nebula. 

As of 2024.06.14, it has been renamed to CloudXR. 

You can download it here.


When using ONE series devices, there is a known issue in CloudXR SDK 4.0.1 that causes crashes. NVIDIA has confirmed they will not fix this issue. We have reverted to **CloudXR 3.2** and found it to be compatible with ONE series glasses. Please use CloudXR 3.2 as the server.

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>

  
  <TabItem value="CloudXR v3.2" label="CloudXR v3.2">
   [CloudXR_20250616.apk](https://public-resource.xreal.com/download/Application/cloudxr_2025-06-16_153622-3.0.0.16-release.apk)
   Compatible with MyGlasses 1.8.1.
   
  </TabItem>


  <TabItem value="CloudXR v4.0" label="CloudXR v4.0" default>

 [CloudXR_20250314.apk](https://public-resource.xreal.com/download/Application/cloudxr_2025-03-04_103403-3.0.0.14-release.apk)
 Compatible with MyGlasses 1.7.0. 
 


[CloudXR_20241216.apk](https://public-resource.xreal.com/download/Application/cloudxr_2024-12-16_155919-2.4.0.13-release.apk)
Compatible with MyGlasses 1.5.0.
</TabItem>

</Tabs>

### **Environment Requirements**

**Hardware:**

- PC (Windows 10 or later) with VR-ready graphic card (NVIDIA GPU, including Quadro GPUs)
- XREAL Light / XREAL X / XREAL Air Series / XREAL One Series
- Nebula-compatible Android Phones / Beam Pro
- WLAN network
- Bluetooth game controller (Optional)

**Software:**

- Steam
- SteamVR
- NVIDIA CloudXR SDK server portion

In addition, you might have already installed the needed followings:

- NVIDIA driver version 440.97 or later
- Microsoft June 2010 DirectX SDK ([https://www.microsoft.com/en-us/download/details.aspx?id=8109](https://www.microsoft.com/en-us/download/details.aspx?id=8109.))

### Setup Instruction

Please see the following for detailed setup instructions:

**Install the needed software:**

1. Install both [Steam](https://store.steampowered.com/about/) and [SteamVR](https://store.steampowered.com/app/250820/SteamVR/) on your PC;

2. Download  [CloudXR-Setup-v3.2.exe](https://public-resource.xreal.com/download/CloudXR-Setup/CloudXR-Setup-v3.2.exe), (NVIDIA CloudXR SDK server, for BeamPro MyGlasses v1.8.1);

   :::tip
   [CouldXR-Setup-v3.1.exe](https://public-resource.xreal.com/download/CloudXR-Setup/CloudXR-Setup-v3.1.exe), for Nebula v2.3.4;   
   [CloudXR-Setup-v4.0.zip](https://public-resource.xreal.com/download/CloudXR-Setup/CloudXR-Setup-v4.0.zip) ,for BeamPro MyGlasses v1.5.0;
   :::

3. Unzip downloaded **CloudXR-Setup-v4.0.zip,** choose CloudXR Server as following and install CloudXR Server on your PC 
   ![image-20240813171323638](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171323638.png)

4. Install the latest Nebula on your Android phone

**Setup Network:**

5. Connect your phone and your PC to the **same Wi-Fi**; Please make sure your network is in good condition

**Launch CloudXR server and client :**

6. Launch Steam and SteamVR you've just installed. Make sure your Steam account is logged in.
7. Plug in your XREAL glasses to your Android phone;
8. Launch Nebula app. On Nebula home page, click **CloudXR** icon. If you use Beam Pro, launch MyGlasses app, click **CloudXR** icon.

![image-20241008164259210](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20241008164259210.png)

**The final step:**

9. On the popup screen on your Android phone, enter your PC's IP address. You should be able to find your PC name listed in the **Local Devices** if connected to the same WiFi. Click on it, and the IP address will be automatically filled in the input box.

![image-20240813171352631](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171352631.png)

10. Enter your initial HMD height (1 - 2m), depending on your posture - sitting or standing and your height.
11. Hit `Go.` Enjoy!



**Tip of finding your PC's local IP address**

**Method 1:**

- On the taskbar, select **Wi-Fi network** ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fgyn60eFQ5AQywJmKbmD8%2Fimage.png&width=43&dpr=4&quality=100&sign=09d7ffdd1c83fdeab2d9f15a07756eb8f9f5c09e706481e31c6123a50dc9600d)> the Wi-Fi network you're connected to > **Properties.**

​       ![image-20240813171404479](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813171404479.png)

- Under **Properties**, look for your IP address listed next to **IPv4 address**.

**Method 2:**

- Open the Start menu and type `cmd` to open the Command Prompt;

- Type `ipconfig` into the Command Prompt and press `Enter`. The tool will return a set of data that includes your IP address. look for your IP address listed next to **IPv4 address;**

​       ![image-20240813172001288](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20240813172001288.png)

