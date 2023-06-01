import React, { useRef, useState } from 'react';
import {StyleSheet, View, Image, Text, ImageBackground, Button, Modal, TouchableWithoutFeedback} from 'react-native';
import ZegoUIKitPrebuiltLiveAudioRoom, {
  AUDIENCE_DEFAULT_CONFIG,
  ZegoMenuBarButtonName,
  ZegoLiveAudioRoomLayoutAlignment,
} from '@zegocloud/zego-uikit-prebuilt-live-audio-room-rn';
import KeyCenter from "../KeyCenter";
export default function AudiencePage(props) {
  const prebuiltRef = useRef();
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
  const image = {uri: 'https://www.zegocloud.com/_nuxt/img/live_woman.1489130.png'};
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedIndex, setSelectedIndex] = useState();
  const [isSeatsClosed, setIsSeatsClosed] = useState(false);
  
  const seatClickedHandle = (index, user) => {
    if (!user) {
      // The seat is empty
      setModalVisible(true);
      setSelectedUser({});
      setSelectedIndex(index);
    } else {
      if (user.userID === userID) {
        // Speaker himself
        setModalVisible(true);
        setSelectedUser(user);
        setSelectedIndex(index);
      } else {
        // Other speaker
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.prebuiltContainer}>
        <ZegoUIKitPrebuiltLiveAudioRoom
          ref={prebuiltRef}
          appID={KeyCenter.appID}
          appSign={KeyCenter.appSign}
          userID={userID}
          userName={userName}
          roomID={roomID}
          config={{
            ...AUDIENCE_DEFAULT_CONFIG,
            avatar: 'https://www.zegocloud.com/_nuxt/img/discord_nav@2x.8739674.png',
            userInRoomAttributes: { test: '123' },
            onUserCountOrPropertyChanged: (userList) => {
              console.log('[Demo]AudiencePage onUserCountOrPropertyChanged', userList);
            },
            layoutConfig: {
              rowConfigs,
              rowSpacing,
            },
            takeSeatIndexWhenJoining,
            hostSeatIndexes,
            seatConfig: {
              foregroundBuilder,
              backgroundColor,
            },
            background,
            topMenuBarConfig: {
              // Do not show the unwanted button
              buttons: [],
            },
            bottomMenuBarConfig: {
              // Do not show the unwanted button
              hostButtons: [
                ZegoMenuBarButtonName.toggleMicrophoneButton,
              ],
              speakerButtons: [
                ZegoMenuBarButtonName.toggleMicrophoneButton,
              ],
              audienceButtons: [],
            },
            onLeaveConfirmation: () => {
              props.navigation.navigate('HomePage');
            },
            onSeatTakingRequestRejected: () => {
              console.log('[Demo]AudiencePage onSeatTakingRequestRejected ');
            },
            onHostSeatTakingInviteSent: () => {
              console.log('[Demo]AudiencePage onHostSeatTakingInviteSent ');
            },
            // onMemberListMoreButtonPressed: (user) => {
            //   console.log('[Demo]AudiencePage onMemberListMoreButtonPressed ', user);
            // },
            onSeatsChanged: (takenSeats, untakenSeats) => {
              console.log('[Demo]AudiencePage onSeatsChanged ', takenSeats, untakenSeats);
            },
            onSeatsClosed: () => {
              console.log('[Demo]AudiencePage onSeatsClosed ');
              setIsSeatsClosed(true);
            },
            onSeatsOpened: () => {
              console.log('[Demo]AudiencePage onSeatsOpened ');
              setIsSeatsClosed(false);
            },
            onTurnOnYourMicrophoneRequest: (fromUser) => {
              console.log('[Demo]AudiencePage onTurnOnYourMicrophoneRequest ', fromUser);
            },
            onSeatClicked: (index, user) => {
              console.log('[Demo]AudiencePage onSeatClicked ', index, user);
              seatClickedHandle(index, user);
            },
            onWindowMinimized: () => {
              console.log('[Demo]AudiencePage onWindowMinimized');
              props.navigation.navigate('HomePage');
            },
            onWindowMaximized: () => {
              console.log('[Demo]AudiencePage onWindowMaximized');
              props.navigation.navigate('AudiencePage', {
                userID: userID,
                userName: userName,
                roomID: roomID,
              });
            },
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.itemBtnContainer}>
          <Button title='minimize window' onPress={
            () => {
              prebuiltRef.current.minimizeWindow();
            }
          }></Button>
          <Button title='leave' onPress={
            () => {
              prebuiltRef.current.leave();
            }
          }></Button>
        </View>
      </View>
      <View style={styles.modalContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}
          >
          <View style={styles.modalMask}>
            {
              selectedIndex !== undefined ? <View style={styles.bottomBtnContainer}>
                {
                  !selectedUser.userID ? <Button title='take seat' onPress={
                    () => {
                      prebuiltRef.current.leaveSeat().finally(() => {
                        if (!isSeatsClosed) {
                          prebuiltRef.current.takeSeat(selectedIndex).then(() => {
                            setModalVisible(false);
                          });
                        } else {
                          prebuiltRef.current.applyToTakeSeat().then(() => {
                            setModalVisible(false);
                          });
                        }
                      })
                    }
                  }></Button> : <Button title='leave seat' onPress={
                    () => {
                      prebuiltRef.current.leaveSeat().then(() => {
                        setModalVisible(false);
                      });
                    }
                  }></Button>
                }
                <View style={styles.divideLine}></View>
              </View> : null
            }
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  btnContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '30%',
  },
  itemBtnContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  prebuiltContainer: {
    flex: 1,
  },
  modalMask: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
  },
  bottomBtnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  divideLine: {
    height: 1,
    backgroundColor: '#ddd',
  }
});
