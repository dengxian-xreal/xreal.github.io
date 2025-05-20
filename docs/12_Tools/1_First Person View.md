# First Person View

### Device Compatibility

The First Person View can only record virtual content on glasses without an RGB camera. Currently, only the XREAL One series glasses and the XREAL Eye accessory can be used to record first-person videos with real content.

### Recording 

1. Drag “FPSStreamingCast” prefab into your scene
2. Rebuild your app. You should see the toolbar with **Record** and **Stream** button when the raycast hit the bar-shaped region near the top of your sight.
3. Click **Record** to start recording;
4. Click the button again to finish recording
5. You should find the recorded .**mp4** file in your application folder or your local album.

### Streaming

 Operating environment

- **Hardware**: PC + Adapted mobile phone or Beam Pro + XREAL Glasses
- **Software**: 
   - XREAL SDK 3.0.0 and above
   - Camera Features sample
   - StreamingReceiver_V1.2.0


#### Steps

1. Download [StreamingReceiver_V1.2.0.zip](https://nreal-public.nreal.ai/plugins/StreammingReceiver_v1.2.0.zip)

2. Import Camera Features sample
   ![image-20250303171231843](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250303171231843.png)  

3. Find  “FirstPersonStreamingCast” scene in the sample folder

   <img src="https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250303171454087.png"/>

4. Build and install

5. Open the server application “StreamingReceiver/StreamingReceiver.exe” on Windows platform

   Select FirstPersonView Menu.

6. Start the app build with XREAL SDK, When the ray is pointed to the top of the field of vision, the menu bar will appear. After you click the “stream” button, it will automatically search the server program in the local LAN, connect it, and then transmit the video stream. 

#### Note

- Ensure Server and client are in the same local area network.
- Turn off the firewall on server
- A large number of devices connected to the same WiFi may cause streaming failure. Using a mobile hotspot is easier to succeed, or you can use a dedicated WiFi network.
