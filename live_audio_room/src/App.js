import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigation from './AppNavigation';
import {
  ZegoUIKitPrebuiltLiveAudioRoomFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
      <ZegoUIKitPrebuiltLiveAudioRoomFloatingMinimizedView />
    </NavigationContainer>
  );
}
