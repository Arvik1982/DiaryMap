import { useAppDispatch, useAppSelector } from '@/store';
import { setIsModalFotoOpen } from '@/store/slices/navigationSlice';
import { Feather } from '@expo/vector-icons';
import { ImagePickerAsset } from 'expo-image-picker';
import { useCallback } from 'react';
import { Button, Modal, FlatList, Image, View } from 'react-native';
import { GestureViewer, useGestureViewerController } from 'react-native-gesture-image-viewer';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ImageModal() {
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const visible = useAppSelector(state => state.navigationSlice.isModalFotoOpen);
    const setVisible = (isOpen:boolean) => {dispatch(setIsModalFotoOpen(isOpen))};

    const eventFotos = useAppSelector(state => state.eventSlice.eventFotos);

    const imgUrisArray = (function getFotosUrlStringArray(data: ImagePickerAsset[]): Array<string> {
        const res = data.map((item, index) => {
            return item.uri;
        });
        return res;
    })(eventFotos);

    const { goToIndex, goToPrevious, goToNext, currentIndex, totalCount, zoomIn, zoomOut, resetZoom, rotate } =
        useGestureViewerController();

    const renderImage = useCallback((imageUrl: string) => {
        return (
            <Image
                source={{ uri: imageUrl }}
                style={{ width: '100%', height: '100%' }}
                //   pointerEvents="none"
                resizeMode="contain"
            />
        );
    }, []);

    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'black'
            }}>
            <Modal visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={{ flex: 1, backgroundColor:'black' }}>
                    <GestureViewer
                        
                        data={imgUrisArray}
                        initialIndex={0}
                        onDismiss={() => setVisible(false)}
                        ListComponent={FlatList}
                        renderItem={renderImage}
                        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.90)' }}
                        renderContainer={children => <View style={{ flex: 1 }}>{children}</View>}
                    /> 
                    <View
                        style={{
                            position: 'absolute',
                            top: insets.top + 10,
                            left: 10,
                            zIndex: 1000,
                            flexDirection: 'row',
                            gap: 10
                        }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Feather.Button
                                name="zoom-in"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                backgroundColor="transparent"
                                color="white"
                                onPress={() => zoomIn(0.25)}
                            />
                            <Feather.Button
                                name="zoom-out"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                backgroundColor="transparent"
                                color="white"
                                onPress={() => zoomOut(0.25)}
                            />
                            <Feather.Button
                                name="refresh-cw"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                backgroundColor="transparent"
                                color="white"
                                onPress={() => {
                                    rotate(0);
                                    resetZoom();
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Feather.Button
                                name="rotate-cw"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                backgroundColor="transparent"
                                color="white"
                                onPress={() => rotate()}
                            />
                            <Feather.Button
                                name="rotate-ccw"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                backgroundColor="transparent"
                                color="white"
                                onPress={() => rotate(90, false)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            top: insets.top + 10,
                            right: 10,
                            zIndex: 1000
                        }}>
                        <Feather.Button
                            name="x"
                            size={30}
                            iconStyle={{ marginRight: 0 }}
                            backgroundColor="transparent"
                            color="white"
                            onPress={() => setVisible(false)}
                        />
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: insets.bottom + 10,
                            left: 0,
                            right: 0,
                            gap: 10,
                            flexDirection: 'column'
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 10,
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                            <Feather.Button
                                backgroundColor="transparent"
                                name="chevron-left"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                color="white"
                                onPress={goToPrevious}
                            />
                            <Button title="Jump to 3" onPress={() => goToIndex(2)} />
                            <Feather.Button
                                backgroundColor="transparent"
                                name="chevron-right"
                                size={30}
                                iconStyle={{ marginRight: 0 }}
                                color="white"
                                onPress={goToNext}
                            />
                        </View>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: 'white'
                            }}>{`${currentIndex + 1} / ${totalCount}`}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
