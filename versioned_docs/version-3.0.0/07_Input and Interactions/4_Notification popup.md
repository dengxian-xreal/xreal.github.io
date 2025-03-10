# Notification Popup

## Overview

The XREAL notification popup system provides a simple framework for displaying various notifications and warnings to users through the `NotificationListener` prefab.


**Notification types**

The `XREALNotificationType` enum defines the following notification types:
- Battery Notifications: Displays warnings when device battery is low
- Temperature Notifications: Alerts when device temperature is high
- SLAM State Notifications: Provides information about SLAM tracking status
- Native Error Notifications: Shows errors from the XREAL system


## Enabling/Disabling Notifications

Each notification type can be independently enabled or disabled through the Inspector or via code:

![image-20250310171120417](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250310171120417.png)

```csharp
// Get a reference to the listener
XREALNotificationListener listener = GetComponent<XREALNotificationListener>();

// Enable or disable specific notification types
listener.EnableLowPowerTips = true;      // Control battery notifications
listener.EnableHighTempTips = false;     // Control temperature notifications
listener.EnableSlamStateTips = true;     // Control SLAM state notifications
listener.EnableNativeErrorTips = true;   // Control native error notifications
```

## Customizing Notification Text

To modify notification text, you can use the provided `LocalizationTool` for customization. This allows you to adjust notification content for different languages or specific requirements.

![image-20250310171204764](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image-20250310171204764.png)


## Use Cases
- Battery Management: Alert users when device battery is low
- Temperature Monitoring: Notify users when the device is overheating
- Tracking Quality Indicators: Help users understand current SLAM tracking status
- System Issue Alerts: Inform users about system-level problems that may affect application performance