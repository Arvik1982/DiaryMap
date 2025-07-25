import AsyncStorage from '@react-native-async-storage/async-storage';

export const EVENTS_STORAGE = 'EVENTS'

export const setStorage = async (name: string, item: unknown) =>
    await AsyncStorage.setItem(`${name}`, JSON.stringify(item));

export const getStorage = async (name: string) => {
    try {
        const res = await AsyncStorage.getItem(`${name}`);
        return res ? JSON.parse(res) : null;
    } catch {
        console.error('getStorage-error');
        return null;
    }
};
export const removeStorage = async (name: string) => {
    try {
        await AsyncStorage.removeItem(`${name}`);
       
    } catch {
        console.error('getStorage-error');
       
    }
};
