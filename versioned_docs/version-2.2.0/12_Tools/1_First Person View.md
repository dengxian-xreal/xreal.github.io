# First Person View

### Device Compatibility

First Person View has been fully tested on the following Android phones:

- Oneplus: 9 / Oneplus 9pro 
- Samsung: Galaxy S10+ / Galaxy S21 / Galaxy S21 Ultra 5G / Galaxy S21 5G / Galaxy S21 5G / Galaxy S20 Ultra 5G /  Galaxy S20+ 5G / Galaxy Note20 5G / Galaxy S21 5G / Galaxy Z Fold 3 5G / Galaxy S22 
- Sony: X1 iii
- LG: Wing / V50s        
- Arrows: NX9 
- OPPO: Find X2 pro / Find X5 pro

First Person View can also work on Android phones besides the above. However, the compatibility is not guaranteed. For the full list, please refer to[ Device Compatibility](https://xreal.gitbook.io/nrsdk/nrsdk-fundamentals/xreal-devices/compatibility).

### Recording 

1. Drag “FPSStreamingCast” prefab into your scene
2. Rebuild your app. You should see the toolbar with **Record** and **Stream** button when the raycast hit the bar-shaped region near the top of your sight.
3. Click **Record** to start recording;
4. Click the button again to finish recording
5. You should find the recorded .**mp4** file in your application folder or your local album(v1.9.5).

### Streaming

 Operating environment

- **Hardware**: PC + Adapted mobile phone or Compute Unit + Xreal Light
- **Software**: NRSDK v1.6.0Experimental and above, StreamingReceiver_V1.2.0

#### Steps

1. Download [NRSDK_Experimental](https://developer.nreal.ai/download/tryexperimental) and [StreamingReceiver_V1.2.0.zip](https://nreal-public.nreal.ai/plugins/StreammingReceiver_v1.2.0.zip)

2. Import NRSDKForUnityAndroid_Experimental_v1.9.1.unitypackage

3. Drag “FPSStreamingCast” prefab into your scene

4. Build and install

5. Open the server application “StreamingReceiver/StreamingReceiver.exe” on Windows platform

   Select FirstPersonView Menu.

6. Start the app build with NRSDK, When the ray is pointed to the top of the field of vision, the menu bar will appear. After you click the “stream” button, it will automatically search the server program in the local LAN, connect it, and then transmit the video stream

#### Note

- Ensure Server and client are in the same local area network.
- Turn off the firewall on server
