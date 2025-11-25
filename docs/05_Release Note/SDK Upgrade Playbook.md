# Upgrade Guide


## Before Upgrade

1.	**Version Control**: Create a new branch or tag to ensure the project can be safely rolled back if needed.
2.	**Unity Environment**: Verify that your Unity version is still within the officially supported LTS range (typically 2022.3.X / 6000.1.X). If necessary, upgrade Unity in advance and record all package versions.
3.	**Devices & Firmware**: Upgrade MyGlasses, glasses firmware, Control Glasses, or BeamPro firmware according to the Release Notes. After upgrading, perform a quick sanity test by opening the old APK to confirm that tracking and input still function normally.
4.	**Dependency Backup**: Export Packages/manifest.json and any manually modified files such as AndroidManifest, Gradle templates, etc. These will help with diffing after the upgrade.

## Upgrade

### Get and Import the Target SDK

1.	Download the target version of the com.xreal.xr package (links are usually provided in the Release Notes).
2.	In Unity Package Manager, locate the existing XREAL XR Plugin and remove it.
3.	After confirming removal, import the new SDK via the tarball. Immediately check Packages/manifest.json to ensure the com.xreal.xr version has been updated to the target version.
4.	In the **Package Manager**, switch to the Samples tab under the XREAL XR Plugin, and click “Update” for all Samples previously imported into your project.
   :::warning
   This step is critical to keep scripts and scenes in sync with the new version—skipping it may leave old Samples behind and cause mismatches between scenes and scripts.
   :::
![Replaced by Image Uploader](https://pub-8dffc52979c34362aa2dbe3a43f0792a.r2.dev/image_1763966481013_0.png)


