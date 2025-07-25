import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MultilineInput from '../MultilineInput/MultilineInput';
import CreateEventControls from '../CreateEventControls/CreateEventControls';
import { Text } from 'react-native-paper';
import SmallButton from '../ui/SmallButton/SmallButton';
import EventData from '../EventData/EventData';
import { BORDER_RADIUS_NORMAL } from '@/constants/style';
import { colors } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/store';
import { setEvents } from '@/store/slices/eventsSlice';



export default function CreateEvent({ event }: { event: string }) {
    const dispatch =useAppDispatch()
    const eventFotos = useAppSelector(state => state.eventSlice.eventFotos);
    const date = useAppSelector(state => state.eventSlice.eventDate);
    const coordinates = useAppSelector(state => state.eventSlice.eventCoordinates);

    const today = new Date().toLocaleDateString('ru-RU');
    const handleSvePress = () => {
        console.log('save')
        const event = {
            fotos: eventFotos,
            date: date,
            coordinates: coordinates
        };
 
       dispatch (setEvents(event))
    
    };

    return (
        <View style={styles.contentBox}>
            <View
                style={{
                    width: '99%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <Text>{event}</Text>
                <Text>Сегодня: {today}</Text>
            </View>

            <View style={styles.contentBoxMain}>
                <MultilineInput />
                <CreateEventControls />
                <EventData />
            </View>
            <TouchableOpacity style={styles.saveButtonContainer}>
                <SmallButton
                    icon="content-save-outline"
                    action={handleSvePress}
                    name="Сохранить"
                    description="" />
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    contentBox: {
        flex: 1,
        width:'100%',
        padding: 5,
        gap: 10,
        justifyContent: 'space-between'
    },
    contentBoxMain: {
        gap: 10
    },
    saveButtonContainer: {
        alignItems: 'center',
        width: '100%',
        borderRadius: BORDER_RADIUS_NORMAL,
        backgroundColor: colors.light.mainColor
    }
});
