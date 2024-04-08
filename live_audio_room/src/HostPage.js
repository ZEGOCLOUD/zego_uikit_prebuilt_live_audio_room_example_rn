import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, Alert} from 'react-native';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  HOST_DEFAULT_CONFIG,
  ZegoMenuBarButtonName,
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
  const avatarBuilder = ({userInfo}) => {
    return <View style={styles.avatarBuilder}>
      {
        userInfo.inRoomAttributes && userInfo.inRoomAttributes.avatar ? <Image 
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          resizeMode="cover"
          source={{ uri: userInfo.inRoomAttributes.avatar }}
        /> : null
      }
    </View>
  };

  const rowBackgroundBuilder = ({rowIndex}) => {
    return rowIndex == 0 ? (
      <View style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'skyblue', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{backgroundColor: 'red', width: 30, height: 30}}></View>
        <View style={{backgroundColor: 'red', width: 30, height: 30}}></View>
      </View>
    ) : null;
  }

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
          avatar: 'https://www.zegocloud.com/_nuxt/img/photo_3.fc8eb61.webp',
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
            avatarBuilder,
            // rowBackgroundBuilder,
          },
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton, ZegoMenuBarButtonName.leaveButton],
          },
          background,
          confirmDialogInfo: {
            title: 'Leave the room',
            message: 'Are you sure to leave the room?',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'OK',
          },
          onLeave: () => {
            props.navigation.navigate('HomePage');
          },
          onLeaveConfirming: () => {
            return new Promise((resolve, reject) => {
              Alert.alert(
                'This is your custom dialog.',
                'You can customize this dialog as needed.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => reject(),
                    style: 'cancel',
                  },
                  {
                    text: 'Exit',
                    onPress: () => resolve(),
                  },
                ],
              );
            });
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
          onSeatClosed: (index) => {
            console.log('[Demo]HostPage onSeatClosed: ', index);
          },
          onSeatOpened: (index) => {
            console.log('[Demo]HostPage onSeatOpened: ', index);
          },
          onTurnOnYourMicrophoneRequest: (fromUser) => {
            console.log('[Demo]HostPage onTurnOnYourMicrophoneRequest ', fromUser);
          },
          // onSeatClicked: (index, user) => {
          //   console.log('[Demo]HostPage onSeatClicked ', index, user);
          // },
          onWindowMinimized: () => {
            console.log('[Demo]HostPage onWindowMinimized');
            props.navigation.navigate('HomePage');
          },
          onWindowMaximized: () => {
            console.log('[Demo]HostPage onWindowMaximized');
            props.navigation.navigate('HostPage', {
              userID: userID,
              userName: userName,
              roomID: roomID,
            });
          },
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
  avatarBuilder: {
    width: '100%',
    height: '100%',
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
