import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AddFlashback from '../AddFlashback/AddFlashback';
import AddNewEvent from '../AddNewEvent/AddNewEvent';
import { useAppSelector } from '@/store';

export default function AddEventContainer() {
    const mode = useAppSelector(state => state.navigationSlice.addEventMode);

    return (
        <View style={{
            width: '100%',
            height: '100%',            
        }}>
            {
                mode === 'NEW_EVENT' ?
                <AddNewEvent /> :
                <AddFlashback />
            }
        </View>
    );
}
