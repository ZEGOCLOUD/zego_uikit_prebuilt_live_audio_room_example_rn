import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  HOST_DEFAULT_CONFIG,
  ZegoLiveAudioRoomLayoutAlignment,
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';
import KeyCenter from "../KeyCenter";
export default function HostPage(props) {
  const {route} = props;
  const {params} = route;
  const {userID, userName, roomID} = params;
  let rowConfigs = [
    {
      count: 4,
      seatSpacing: 16,
      alignment: ZegoLiveAudioRoomLayoutAlignment.spaceAround,
    },
    {
      count: 4,
      seatSpacing: 16,
      alignment: ZegoLiveAudioRoomLayoutAlignment.spaceAround,
    },
  ];
  let rowSpacing = 0;
  let takeSeatIndexWhenJoining = 0;
  let backgroundColor = 'transparent';
  let hostSeatIndexes = [0];
  const foregroundBuilder = ({userInfo}) => {
    return (
      <View style={styles.builder}>
        <View style={styles.avatarBox}>
          {userInfo.inRoomAttributes?.role === '0' ? (
            <Image
              style={styles.hostIcon}
              source={require('./resources/host-icon.png')}
            />
          ) : null}
          {!userInfo.isMicDeviceOn ? (
            <Image
              style={styles.mic}
              source={require('./resources/close-mic.png')}
            />
          ) : null}
        </View>
        <Text style={styles.name}>{userInfo.userName}</Text>
      </View>
    );
  };
  const image = {uri: 'xxx'};
  const background = () => {
    return (
      <View style={styles.backgroundView}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>A Live Audio Room</Text>
            <Text style={styles.id}>ID:{roomID}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveAudioRoom
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={userID}
        userName={userName}
        roomID={roomID}
        config={{
          ...HOST_DEFAULT_CONFIG,
          avatar: 'https://www.zegocloud.com/_nuxt/img/discord_nav@2x.8739674.png',
          userInRoomAttributes: { test: '123' },
          onUserCountOrPropertyChanged: (userList) => {
            console.log('[Demo]HostPage onUserCountOrPropertyChanged', userList);
          },
          layoutConfig: {
            rowConfigs,
            rowSpacing,
          },
          takeSeatIndexWhenJoining,
          hostSeatIndexes,
          seatConfig: {
            backgroundColor,
            foregroundBuilder,
          },
          background,
          onLeaveConfirmation: () => {
            props.navigation.navigate('HomePage');
          },
          onSeatTakingRequested: (audience) => {
            console.log('[Demo]HostPage onSeatTakingRequested ', audience);
          },
          onSeatTakingRequestCanceled: (audience) => {
            console.log('[Demo]HostPage onSeatTakingRequestCanceled ', audience);
          },
          onSeatTakingInviteRejected: () => {
            console.log('[Demo]HostPage onSeatTakingInviteRejected ');
          },
          // onMemberListMoreButtonPressed: (user) => {
          //   console.log('[Demo]HostPage onMemberListMoreButtonPressed ', user);
          // },
          onSeatsChanged: (takenSeats, untakenSeats) => {
            console.log('[Demo]HostPage onSeatsChanged ', takenSeats, untakenSeats);
          },
          onSeatsClosed: () => {
            console.log('[Demo]HostPage onSeatsClosed ');
          },
          onSeatsOpened: () => {
            console.log('[Demo]HostPage onSeatsOpened ');
          },
          onTurnOnYourMicrophoneRequest: (fromUser) => {
            console.log('[Demo]HostPage onTurnOnYourMicrophoneRequest ', fromUser);
          },
          // onSeatClicked: (index, user) => {
          //   console.log('[Demo]HostPage onSeatClicked ', index, user);
          // },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  builder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBox: {
    alignItems: 'center',
    width: 54,
    height: 54,
  },
  mic: {
    position: 'absolute',
    width: 54,
    height: 54,
    zIndex: 2,
  },
  name: {
    position: 'absolute',
    bottom: 0,
    lineHeight: 14,
    fontSize: 10,
    color: '#000',
    zIndex: 3,
  },
  hostIcon: {
    position: 'absolute',
    bottom: 0,
    width: 47,
    height: 12,
    zIndex: 3,
  },
  backgroundView: {
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  titleBar: {
    position: 'absolute',
    top: 55,
    paddingLeft: 18,
    width: '100%',
    height: 54,
  },
  title: {
    fontSize: 16,
    lineHeight: 33,
    color: '#1B1B1B',
  },
  id: {
    fontSize: 10,
    color: '#606060',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
