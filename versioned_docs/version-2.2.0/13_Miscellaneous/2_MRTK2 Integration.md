# MRTK2 Integration

NRSDK 1.9.3 & MRTK 2.8.0 Integration with Sample Projects

## Overview




<iframe 
  src="https://cdn.iframe.ly/Ty1f1Wg" 
  allowFullScreen 
  scrolling="no" 
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
  style={{
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    width: '100%',
    height: '421.875px',
    border: 0,
    scrollBehavior: 'auto !important'
  }}
/>

This github repo (https://github.com/nreal-ai/NRSDK-MRTK) contains extension that adds compatibility for NRSDK, including hand tracking and controller support, to Microsoft's open source Mixed Reality Toolkit ([MRTK](https://docs.microsoft.com/en-us/windows/mixed-reality/develop/unity/mrtk-getting-started)) for Unity. 

It also contains two open-source sample apps from Microsoft's Mixed Reality Design Labs - Hand Tracking Hub (originally as MRTK examples hub and Surfaces (https://github.com/microsoft/MRDL_Unity_Surfaces), which demonstrates NRSDK's hand tracking algorithmic capabilities with MRTK's input system.

**Required Environments:**

- Unity 2020.3.X
- MRTK 2.8.0
- NRSDK 1.9.3

## Examples and Scene Settings

This repo includes two projects, each containing several pre-configured scenes:

- **Assets/HandTrackingDemo**
  - HandTrackingHub (Manager scene)
  - HandTrackingHubMainMenu
  - Clipping
  - ColorPicker
  - Dock
  - HandInteraction
  - HandMenu
  - HandMenuLayout
  - Joystick
  - NonNativeKeyboard
  - PressableButton
  - ScrollingObjectCollection
- **Assets/Surfaces**
  - StartupScene (Manager scene)
  - Bubble
  - Ephemeral
  - Flock
  - Goop
  - Growbies
  - Lava
  - Lighting
  - Volume
  - Xylophone

These scenes do not require additional configuration and serve as a blueprint for XREAL's MRTK integration, while **HandTrackingHub** and **StartupScene** work as manager scene (configured via MRTK's Scene System) of each project respectively.

## Features

This following MRTK Features are supported:

Supported Features in MRTK

- Hand Tracking
- Hand Meshing
- Hand Skeleton / Gestures
- XREAL Phone Controller / Dev Kit Controller
- Gaze Input (aka Eye Tracking)
