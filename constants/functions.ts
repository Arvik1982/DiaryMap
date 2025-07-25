import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';

export async function openAppSettings() {
    const supported = await Linking.canOpenURL('app-settings:');
    if (supported) {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.openSettings();
        }
    } else {
        Alert.alert('Ошибка', 'Откройте настройки приложения вручную');
    }
}

export async function getGeolocation(): Promise<[number, number] | null> {
    const { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
        Alert.alert(
            'Разрешение на геолокацию отключено',
            'Для работы приложения необходимо разрешить доступ к геолокации в настройках',
            [
                { text: 'Отмена', style: 'cancel' },
                { text: 'Открыть настройки', onPress: openAppSettings }
            ]
        );

        return null;
    }

    try {
       
        const myPosition = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            timeInterval:10000
        });
       
        return [myPosition.coords.latitude, myPosition.coords.longitude];
    } catch {
        console.error('getGeolocation_error');
        return null;
    }
}


