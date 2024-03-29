import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, Text, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export default function HomePage(props) {
  const navigation = useNavigation();
  const onJoinPress = isHost => {
    navigation.navigate(isHost ? 'HostPage' : 'AudiencePage', {
      userID: userID,
      userName: 'user_' + userID,
      roomID: roomID,
    });
  };
  const [userID, setUserID] = useState('');
  const [roomID, setRoomID] = useState('');
  useEffect(() => {
    setUserID(String(Math.floor(Math.random() * 100000)));
    setRoomID(String(Math.floor(Math.random() * 10000)));
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Text style={styles.userID}>Your User ID: {userID}</Text>
      <Text style={[styles.roomID, styles.leftPadding]}>Room ID:</Text>
      <TextInput
        placeholder="Enter the Live ID. e.g. 6666"
        style={[styles.input]}
        onChangeText={text => setRoomID(text.replace(/[^0-9A-Za-z_]/g, ''))}
        maxLength={6}
        value={roomID}
      />
      <View style={[styles.buttonLine, styles.leftPadding]}>
        <Button
          disabled={roomID.length === 0}
          style={styles.button}
          title="Start a room"
          onPress={() => {
            onJoinPress(true);
          }}
        />
        <View style={styles.buttonSpacing} />
        <Button
          disabled={roomID.length === 0}
          style={styles.button}
          title="Watch a room"
          onPress={() => {
            onJoinPress(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonLine: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  buttonSpacing: {
    width: 13,
  },
  input: {
    height: 42,
    width: 305,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#333333',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 35,
    marginBottom: 20,
  },
  userID: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 27,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 20,
  },
  roomID: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 5,
  },
  simpleCallTitle: {
    color: '#2A2A2A',
    fontSize: 21,
    width: 330,
    fontWeight: 'bold',
    marginBottom: 27,
  },
  button: {
    height: 42,
    borderRadius: 9,
    backgroundColor: '#F4F7FB',
  },
  leftPadding: {
    paddingLeft: 35,
  },
  selectBox: {
    width: '100%',
    alignItems: 'center',
  },
  check: {
    backgroundColor: 'pink',
    fontSize: 12,
  },
});
