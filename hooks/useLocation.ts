import { getGeolocation } from '@/constants/functions';
import { useAppDispatch } from '@/store';
import { setMyPosition } from '@/store/slices/eventsSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function useLocation() {
    const dispatch = useAppDispatch();

    async function myLocationFunc() {
        try {
            const coords = await getGeolocation();
            dispatch(setMyPosition(coords));
        } catch {
            console.error('myLocationFunc - error');
            dispatch(setMyPosition(null));
        }
    }

    useFocusEffect(
        useCallback(() => {
            myLocationFunc();
        }, [myLocationFunc])
    );
}
