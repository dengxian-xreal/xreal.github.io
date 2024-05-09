# NRSDK 1.9.1



**Download** [**NRSDKForUnity_Release_1.9.1.unitypackage**](https://nreal-public.oss-us-west-1.aliyuncs.com/download/NRSDKForUnity_Release_1.9.1/NRSDKForUnity_Release_1.9.1.unitypackage)

**What's New:**




- 




- 

  Implemented new Hand Tracking underlying algorithms that greatly improved hand tracking performance




- 




- 

  Added support for **0Dof Stable** Mode `NRHMDPoseTracker.ChangeTo0DofStable` that enables the display's tag-along behaviour depending on the current view




- 




- 

  Added support to record environment and in-app audio simultaneously. See **AudioState -> ApplicationAndMicAudio** in **RGBCamera-Record** scene for details




- 




- 

  Added brightness-related native APIs in `NRKernal.NRDeviceSubsystem`

**Improvements:**




- 




- 

  Improved 3DoF controller tracking and 3DoF head tracking on Nreal Air




- 




- 

  Improved speed switching between different tracking mode

**Bug Fixes:**




- 




- 

  Fixed occasional SDK launch failure




- 




- 

  Fixed recorded audio/video out of sync problem (audio speed is accelerated)




- 




- 

  Fixed the issue that the microphone's recording volume is too low




- 




- 

  Fixed RGB Camera's capturing/recording offset




- 




- 

  Fixed controller drift due to 0DoF/3DoF/6DoF tracking mode switch
