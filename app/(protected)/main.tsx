import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { setBottomSheetAddEventMode, setBottomSheetSnapIndex } from '@/store/slices/navigationSlice';
import AppScreenContainer from '@/components/AppScreenContainer/AppScreenContainer';
import {  SNAP_MIDLE } from '@/constants/common';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useCallback, useState } from 'react';
import { EVENTS_STORAGE, getStorage } from '@/storage/storage';
import { useFocusEffect } from 'expo-router';
import { Text } from 'react-native-paper';
import { setEvents } from '@/store/slices/eventsSlice';

export default function Index() {
    const dispatch = useAppDispatch();
    const snapIndex = useAppSelector(state => state.navigationSlice.bottomSheetSnapIndex);
    const DISPLAY_ADD_BUTTON = snapIndex !== SNAP_MIDLE;
    const BUTTON_START_POSITION = 130;
    const top = useSharedValue(BUTTON_START_POSITION);
    const topAlarm = useSharedValue(BUTTON_START_POSITION);
    const topHistory = useSharedValue(BUTTON_START_POSITION);
    const [isMenuopen, setIsMenuOpen] = useState(false);
    // const [events, setEvents] = useState<TEventType>({}as TEventType);
    const events = useAppSelector(state => state.eventSlice.events);
    console.log('EVENTS', events);

    const getEvents = async () => {
        const data = await getStorage(EVENTS_STORAGE);
        dispatch(setEvents(data));
    };

    useFocusEffect(
        useCallback(() => {
            getEvents();
        }, [])
    );

    const crossStyles = useAnimatedStyle(() => {
        return {
            top: top.value,
            zIndex: 10
        };
    });

    const alarmStyles = useAnimatedStyle(() => {
        return { top: topAlarm.value };
    });
    const historyStyles = useAnimatedStyle(() => {
        return { top: topHistory.value };
    });

    const handleCrossButtonPress = () => {
        if (topAlarm.value === BUTTON_START_POSITION && topHistory.value === BUTTON_START_POSITION) {
            topAlarm.value = withTiming(topAlarm.value + 60, { duration: 300 });
            topHistory.value = withTiming(topHistory.value + 120, { duration: 300 });
            setIsMenuOpen(true);
        } else {
            topAlarm.value = withTiming(topAlarm.value - 60, { duration: 300 });
            topHistory.value = withTiming(topHistory.value - 120, { duration: 300 });
            setIsMenuOpen(false);
        }
    };

    const handleSelectregimePress = (modeArg: 'FLASHBACK' | 'NEW_EVENT') => {
        dispatch(setBottomSheetAddEventMode(modeArg));
        dispatch(setBottomSheetSnapIndex(SNAP_MIDLE));
    };

    return (
        <AppScreenContainer>
            <View style={styles.container}>
                <View style={styles.topMenu}>
                    {DISPLAY_ADD_BUTTON && (
                        <>
                            <Animated.View style={[{ position: 'absolute' }, crossStyles]}>
                                <TouchableOpacity
                                    style={styles.topMenuAddButton}
                                    activeOpacity={0.3}
                                    onPress={handleCrossButtonPress}>
                                    {isMenuopen ? (
                                        <MaterialCommunityIcons name="minus" size={30} color="black" />
                                    ) : (
                                        <MaterialCommunityIcons name="plus" size={30} color="black" />
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{ position: 'absolute' }, alarmStyles]}>
                                <TouchableOpacity
                                    style={styles.topMenuAddButton}
                                    activeOpacity={0.3}
                                    onPress={() => handleSelectregimePress('NEW_EVENT')}>
                                    <MaterialCommunityIcons name="alarm-plus" size={30} color="black" />
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{ position: 'absolute' }, historyStyles]}>
                                <TouchableOpacity
                                    style={[styles.topMenuAddButton]}
                                    activeOpacity={0.3}
                                    onPress={() => handleSelectregimePress('FLASHBACK')}>
                                    <MaterialCommunityIcons name="history" size={30} color="black" />
                                </TouchableOpacity>
                            </Animated.View>
                        </>
                    )}
                </View>
                <View>
                    {events?.length > 0 &&
                        events?.map((item, index:number) => {
                            console.log('ITEM', item);
                            return <Text key={index + item?.date}>{item?.date}</Text>;
                        })}
                </View>
            </View>
        </AppScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    topMenu: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    topMenuAddButton: {
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
});
