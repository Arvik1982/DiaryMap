import { useAppDispatch, useAppSelector } from '@/store';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import ImageModal from '../ImageModal/ImageModal';
import { useState } from 'react';
import { setIsModalFotoOpen } from '@/store/slices/navigationSlice';

export default function EventData() {
    const dispatch = useAppDispatch()    
    const eventFotos = useAppSelector(state => state.eventSlice.eventFotos);
    const date = useAppSelector(state => state.eventSlice.eventDate);
    const coordinates = useAppSelector(state => state.eventSlice.eventCoordinates);
    const myPosition = useAppSelector(state => state.eventSlice.myPosition);
    const textDate = new Date(date);
    const setVisible = (isOpen:boolean) => {dispatch(setIsModalFotoOpen(isOpen))};

    return (
        <View style={styles.contentBoxResult}>
            <Text>Дата события: {textDate.toLocaleDateString('ru-RU')}</Text>
            <Text>Время события: {textDate.toLocaleTimeString('ru-RU')}</Text>
            {myPosition && coordinates === null && (
                <Text>
                    Текущие координаты: {myPosition[0].toFixed(6)}; {myPosition[1].toFixed(6)}
                </Text>
            )}
            {coordinates !== null && (
                <Text>
                    Координаты события: {coordinates[0].toFixed(6)}; {coordinates[1].toFixed(6)}
                </Text>
            )}

            <FlatList
                style={{
                    zIndex: 250,
                    marginBottom: 10
                }}
                scrollEnabled
                data={eventFotos}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setVisible(true)}
                        key={item.assetId}
                        style={{
                            marginRight: 10
                        }}>
                        <Image
                            source={{ uri: item.uri }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 8
                            }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                )}
                horizontal
            />
          
        </View>
    );
}
const styles = StyleSheet.create({
    contentBoxResult: {
        marginTop: 20,
        gap: 15
    }
});
