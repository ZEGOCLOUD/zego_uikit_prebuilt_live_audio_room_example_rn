# Overview

---

[![](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/EtNRATttyp)

> If you have any questions regarding bugs and feature requests, visit the [ZEGOCLOUD community](https://discord.gg/EtNRATttyp) .

**Live Audio Room Kit** is a prebuilt component that helps you to build full-featured live audio rooms into your apps easier.

And it includes the business logic along with the UI, enabling you to customize your live audio apps faster with more flexibility.

![/Pics/ZegoUIKit/Flutter/live_with_cohosting2.gif](https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/Flutter/audio_room/final_sublist.gif)

## When do you need the Live Audio Room Kit

- When you want to build live audio rooms easier and faster, it allows you:

  > Build or prototype live audio apps ASAP

  > Finish the integration in the shortest possible time

- When you want to customize UI and features as needed, it allows you:

  > Customize features based on actual business needs

  > Spend less time wasted developing basic features

  > Add or remove features accordingly

To build a live audio app from scratch, you may check our [Voice Call](https://docs.zegocloud.com/article/6674).

## Embedded features

- Ready-to-use Live Audio Room
- Remove speakers
- Speaker seats changing & management
- Customizable seat layout
- Extendable menu bar
- Device management
- Customizable UI style
- Real-time interactive text chat
- Seat-taking (Invite & apply to take speaker seats)

# Quick start

---

## Prerequisites

- Go to [ZEGOCLOUD Admin Console](https://console.zegocloud.com), and do the following:
  - Create a project, get the **AppID** and **AppSign**.
  - Activate the **In-app Chat** service (as shown in the following figure).

![ActivateZIMinConsole](https://storage.zego.im/sdk-doc/Pics/InappChat/ActivateZIMinConsole2.png)

## Integrate the SDK

### Import the SDK

1. Add @zegocloud/zego-uikit-prebuilt-live-audio-room-rn as dependencies.

```bash
yarn add @zegocloud/zego-uikit-prebuilt-live-audio-room-rn
```

2. Add other dependencies.

Run the following command to install other dependencies for making sure the `@zegocloud/zego-uikit-prebuilt-live-audio-room-rn` can work properly:

```bash
yarn add react-delegate-component zego-express-engine-reactnative@^3.14.5 zego-zim-react-native@2.16.0 @zegocloud/zego-uikit-rn
```

### Using the ZegoUIKitPrebuiltLiveAudioRoom Component in your project

- Specify the `userID` and `userName` for connecting the Live Audio Room Kit service.
- Create a `roomID` that represents the room you want to make.

<div class="mk-hint">

- `userID`, `userName` and `roomID` can only contain numbers, letters, and underlines (\_).
- Users that join the room with the same `roomID` can talk to each other.
- For a single user, the sum of all Key-Value pairs must be within 100 bytes and a maximum of 20 pairs can be configured.
- Each Key must be within 8 bytes.
- Each Value must be within 64 bytes.

</div>

```javascript
// App.js
import React, {Component} from 'react';
import {View} from 'react-native';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  HOST_DEFAULT_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';

export default function LiveAudioRoomPage(props) {
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveAudioRoom
        appID={yourAppID}
        appSign={yourAppSign}
        userID={userID} // userID can be something like a phone number or the user id on your own user system.
        userName={userName}
        roomID={roomID} // roomID can be any unique string.
        config={{
          // You can also use HOST_DEFAULT_CONFIG/AUDIENCE_DEFAULT_CONFIG to make more types of calls.
          ...HOST_DEFAULT_CONFIG,
          avatar: '', // Url link must be within 64 bytes.
          userInRoomAttributes: {},
          onUserCountOrPropertyChanged: (userList) => {},
          onLeaveConfirmation: () => {
            props.navigation.navigate('HomePage');
          },
        }}
      />
    </View>
  );
}
```

## Configure your project

- Android:

1. Open the `my_project/android/app/src/main/AndroidManifest.xml` file and add the following:

<img src="https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/RN/PrebuiltCall/android_config.gif" width=500/>

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

2. Open the `my_project/android/app/proguard-rules.pro` file and add the following:

<img src="https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/RN/PrebuiltCall/proguard_rules_config.jpg" width=500/>

```xml
-keep class **.zego.**  { *; }
```

- iOS:

1. Open the `my_project/ios/my_project/Info.plist` file and add the following:

<img src="https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/RN/PrebuiltCall/ios_config2.gif" width=500/>

```xml
<key>NSCameraUsageDescription</key>
<string>We need to use the camera</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need to use the microphone</string>
```

2. Disable the Bitcode.

a. Open the your_project > ios > [your_project_name].xcworkspace file.

b. Select your target project, and follow the notes on the following two images to disable the Bitcode respectively.

<img src="https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/RN/PrebuiltCall/liveAudioRoomBitcode_1.png"/>
<img src="https://storage.zego.im/sdk-doc/Pics/ZegoUIKit/RN/PrebuiltCall/liveAudioRoomBitcode_2.png"/>

## Run & Test

<div class="mk-hint">

If your device is not performing well or you found a UI stuttering, run in **Release mode** for a smoother experience.

</div>

- Run on an iOS device:

```bash
yarn ios
```

- Run on an Android device:

```bash
yarn android
```

## Related guide

[Custom prebuilt UI](http://docs.zegocloud.com/article/#15084)
