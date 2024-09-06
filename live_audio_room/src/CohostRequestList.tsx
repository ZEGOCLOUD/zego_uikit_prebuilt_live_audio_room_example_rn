import { forwardRef, useImperativeHandle, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native"

import {
    ZegoLiveAudioRoomCohostRequestState,
} from "@zegocloud/zego-uikit-prebuilt-live-audio-room-rn";

function CohostRequestList(props: any, ref: any) {
    let { acceptSeatTakingRequest, rejectSeatTakingRequest } = props;

    const [cohostRequestList, setCohostRequestList] = useState([]);

    const renderCohostRequestItem = ({ item }: { item: any }) => (
        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            {item.userName}
            {item.state === ZegoLiveAudioRoomCohostRequestState.requested
              ? ' requested to co-host'
              : item.state === ZegoLiveAudioRoomCohostRequestState.canceled
              ? ' canceled request to co-host'
              : item.state === ZegoLiveAudioRoomCohostRequestState.timeout
              ? ' requested to co-host but timeout'
              : item.state === ZegoLiveAudioRoomCohostRequestState.agreed
              ? ' request to co-host has been approved'
              : item.state === ZegoLiveAudioRoomCohostRequestState.rejected
              ? ' request to co-host was denied'
              : ' Unknown State'}
          </Text>

          {item.state === ZegoLiveAudioRoomCohostRequestState.requested 
            ? <TouchableOpacity
                style={[{
                    marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 63,
                    height: 28,
                    backgroundColor: 'rgba(255, 192, 203, 1.0)',
                    borderRadius: 14}
                ]}
                onPress={() => rejectSeatTakingRequest(item.userID)}>
                <Text style={[{fontSize: 14, color: '#FFFFFF'}]}>{'Disagree'}</Text>
            </TouchableOpacity>
            : null}

          {item.state === ZegoLiveAudioRoomCohostRequestState.requested 
            ? <TouchableOpacity
                style={[{
                    marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 63,
                    height: 28,
                    backgroundColor: 'rgba(16, 84, 255, 1.0)',
                    borderRadius: 14}
                ]}
                onPress={() => acceptSeatTakingRequest(item.userID)}>
                <Text style={[{fontSize: 14, color: '#FFFFFF'}]}>{'Agree'}</Text>
            </TouchableOpacity>
            : null}
        </View>
    );

    const _onSeatTakingRequestListChange = (requestInfoList: any) => {
        console.log('receive new requestInfoList, size: ' + requestInfoList.length)
        setCohostRequestList(requestInfoList);
    }

    const getLocalDateFormat = (timestamp: number) => {
        function addLeadingZero(value: number, totalDigits = 2) {
          const stringValue = value.toString();
          const padding = '0'.repeat(totalDigits - stringValue.length);
          return padding + stringValue;
        }
        
        const eventTime = new Date(timestamp);
        const hours = addLeadingZero(eventTime.getHours());
        const minutes = addLeadingZero(eventTime.getMinutes());
        const seconds = addLeadingZero(eventTime.getSeconds());
        const milliseconds = addLeadingZero(eventTime.getMilliseconds(), 4);
        const formattedDateTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    
        return formattedDateTime
    }
    
    useImperativeHandle(ref, () => ({
        onSeatTakingRequestListChange: (requestInfoList: any) => {
            _onSeatTakingRequestListChange(requestInfoList);
        }
    }))

    return (
        <>
        <FlatList
            data={cohostRequestList}
            renderItem={renderCohostRequestItem}
            keyExtractor={(item: any) => item.userID}
        />
        </>
    );
}

export default forwardRef(CohostRequestList);
