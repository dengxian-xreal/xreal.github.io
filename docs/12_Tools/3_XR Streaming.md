# XR Streaming

Nebula built-in **XR Streaming** enables you to live stream Steam/SteamVR content from PC to XREAL Glasses via your Wi-Fi network. 

:::tip

Please note that XR Streaming is no longer built into Nebula. You can download it from [here](https://nreal-public.nreal.ai/download/Application/XRStreaming.apk) or download it later from Google Play.

[XRStreaming.apk](https://nreal-public.nreal.ai/download/Application/XRStreaming.apk)

:::

### **Environment Requirements**

**Hardware:**

- PC (Windows 10 or later) with VR-ready graphic card (NVIDIA GPU, including Quadro GPUs)
- XREAL Light / XREAL X / XREAL Air Series
- Nebula-compatible Android Phones
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

2. Download [CloudXR-Setup-v3.2.exe](https://nreal-public.oss-us-west-1.aliyuncs.com/download/CloudXR-Setup/CloudXR-Setup-v3.2.exe) (NVIDIA CloudXR SDK server, for Nebula v3.0.0);

   :::tip

   [CouldXR-Setup-v3.1.exe](https://nreal-public.oss-us-west-1.aliyuncs.com/download/CloudXR-Setup/CloudXR-Setup-v3.1.exe), for Nebula v2.3.4
   :::

3. Launch downloaded **CloudXR-Setup-v3.2.exe,** choose CloudXR Server as following and install CloudXR Server on your PC 
   ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F9ZjLqmbeu90254tpTk8d%2Forigin_img_v2_032336e4-1eaa-4e4d-869b-5ceffdffd00g.jpg&width=768&dpr=4&quality=100&sign=b1ab30eef8ca5bbb9349510dcca8d589b0d727b6a94ae143b418d03c445f826f)

4. Install the latest Nebula on your Android phone

**Setup Network:**

5. Connect your phone and your PC to the **same Wi-Fi**; Please make sure your network is in good condition

**Launch CloudXR server and client :**

6. Launch Steam and SteamVR you've just installed. Make sure your Steam account is logged in.
7. Plug in your XREAL glasses to your Android phone;
8. Launch Nebula app. On Nebula home page, click **XR Streaming** icon.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FCorgrAp4bG7kVya96E4I%2FNreal_Shot_1659698092233.png&width=768&dpr=4&quality=100&sign=d432698c88b200c28b2309a33fcd590f7247b02028ef6ad244dbbdeb022792e9)

**The final step:**

9. On the popup screen on your Android phone, enter your PC's IP address. You should be able to find your PC name listed in the **Local Devices** if connected to the same WiFi. Click on it, and the IP address will be automatically filled in the input box.

![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2F6pB7FLXmfTsFHWMgLnFl%2Fimage.png&width=300&dpr=4&quality=100&sign=f9a53694a10e63f97be9e56ed2da94e9d2f06489503fa6e54b7a8913fcafa8e9)

10. Enter your initial HMD height (1 - 2m), depending on your posture - sitting or standing and your height.
11. Hit `Go.` Enjoy!



**Tip of finding your PC's local IP address**

**Method 1:**

- 

  On the taskbar, select **Wi-Fi network** ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2Fgyn60eFQ5AQywJmKbmD8%2Fimage.png&width=43&dpr=4&quality=100&sign=09d7ffdd1c83fdeab2d9f15a07756eb8f9f5c09e706481e31c6123a50dc9600d)> the Wi-Fi network you're connected to > **Properties.**

​       ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FK4Quce1Op0wjuMGe3zR3%2Fimage.png&width=300&dpr=4&quality=100&sign=86884e35d99029bf7c3a61ba7ba4ab0633debf945d0134569e7c645e06b744f8)

- 

  Under **Properties**, look for your IP address listed next to **IPv4 address**.

**Method 2:**

- 

  Open the Start menu and type `**cmd**` to open the Command Prompt;

- 

  Type `**ipconfig**` into the Command Prompt and press `**Enter**`. The tool will return a set of data that includes your IP address. look for your IP address listed next to **IPv4 address;**

​       ![img](https://xreal.gitbook.io/~gitbook/image?url=https%3A%2F%2Fcontent.gitbook.com%2Fcontent%2FyXoV7SMVFQhr75lOIoQv%2Fblobs%2FdvWG1uh104WphiBw6jvl%2Fimage.png&width=300&dpr=4&quality=100&sign=b460543f8eec5c52617a6c369b1c86e4beec3542464ff4132bdd158022b3c73b)
