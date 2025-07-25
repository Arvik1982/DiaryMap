import React, { useState } from 'react';
import DatePickerComponent from '../DatePicker/DatePicker';
import SmallButton from '../ui/SmallButton/SmallButton';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking, Platform, View } from 'react-native';
import { useAppDispatch } from '@/store';
import { setEventFotos } from '@/store/slices/eventsSlice';
import { useRouter } from 'expo-router';

export default function CreateEventControls() {
    const dispatch = useAppDispatch();
    
const router = useRouter();

const goToMap = () => {
  router.push('/map');
};
    const getImage = async () => {
        const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (granted !== true) {
            Alert.alert('Ошибка', 'Требуются права доступа к галерее', [
                { text: 'Отмена', style: 'cancel' },
                {
                    text: 'Открыть настройки',
                    onPress: () => {
                        if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:');
                        } else {
                            Linking.openSettings();
                        }
                    }
                }
            ]);
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: false,
            quality: 1
        });

    
        result && dispatch(setEventFotos(result));
    };

    return (
        <View
            style={{
                width: '100%',
                gap: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
            <View
                style={{
                    gap: 5,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                <DatePickerComponent />
                <SmallButton
                    icon="map"
                    action={goToMap}
                    name="Где"
                    description="На карту" />
                <SmallButton
                    icon="file-image-plus-outline"
                    action={() => {
                        getImage();
                    }}
                    name="Фото"
                    description="В галерею"
                />
            </View>

        </View>
    );
}
