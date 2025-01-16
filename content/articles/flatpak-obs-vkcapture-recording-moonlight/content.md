# Recording a Moonlight Stream with OBS using vkcapture under flatpak

## Problem
Record (only) my gameplay (directly) from Moonlight

## Issues
- Cannot capture a single window
- Cannot capture a window in another workspace
- Cannot capture a single workspace
- Both OBS and Moonlight are running under flatpak
- pipewire can only capture **a** display
- Capturing through pipewire is a bit odd from time to time

Tried a bunch of solution to my problem but most of them dont work outside of flatpak, requires switching / forcing x11, or completely changing to a different DE.

## Solution
To directly capture Moonlight's rendering to OBS with obs-vkcapture.

Steps:
1. Install the [obs-vkcapture](https://github.com/nowrep/obs-vkcapture) plugin.
  - `$: flatpak install com.obsproject.Studio.Plugin.OBSVkCapture`
  - `$: flatpak install org.freedesktop.Platform.VulkanLayer.OBSVkCapture`
    - There are some post installation checks that you'll need to do highlighted [here](https://github.com/flathub/org.freedesktop.Platform.VulkanLayer.OBSVkCapture) under "Permissions".
2. Run Moonlight and load obs-vkcapture using `LD_PRELOAD`
  - `$: flatpak run --env=LD_PRELOAD=/usr/lib/extensions/vulkan/OBSVkCapture/lib/x86_64-linux-gnu/obs_glcapture/libobs_glcapture.so com.moonlight_stream.Moonlight`
3. Add `Game Capture` to your scene.

## Fixes

|            Issue              |                                               Fix                                           |
|:-----------------------------:|:-------------------------------------------------------------------------------------------:|
| Moonlight is flickering black | Set Moonlight's `Settings > Advanced Settings > Video Decoder` to `Force Software Decoding` |
