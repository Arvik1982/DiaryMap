import GeopositionMarker from '@/components/GeopositionMarker/GeopositionMarker';
import { LAT_INDEX, LON_INDEX, SNAP_NDX_VALUES } from '@/constants/common';
import { useAppDispatch, useAppSelector } from '@/store';
import { setEventCoordinates } from '@/store/slices/eventsSlice';
import { StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker, UrlTile } from 'react-native-maps';
import UserPointMarker from '../UserPointMarker/UserPointMarker';
import { setBottomSheetSnapIndex } from '@/store/slices/navigationSlice';
import { useCallback, useRef, useState } from 'react';

export default function MapComponent() {
    const dispatch = useAppDispatch();
    const mapRef = useRef<MapView>(null);
    const VERTICAL_SHIFT_RATIO = 0.42;

    const myPosition = useAppSelector(state => state.eventSlice.myPosition);
    const [regionDelta, setRegionDelta] = useState({ latitudeDelta: 0.0922, longitudeDelta: 0.0421 });  
    

    const onMapPress = useCallback((e: MapPressEvent) => {
        const point = [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude] as [number, number];
        const shiftedLatitude = point[LAT_INDEX] - regionDelta.latitudeDelta * VERTICAL_SHIFT_RATIO;
        point.length > 0 ? dispatch(setEventCoordinates(point)) : null;
        mapRef.current?.animateToRegion({
            latitude: shiftedLatitude,
            longitude: point[LON_INDEX],
            ...regionDelta
        });
        dispatch(setBottomSheetSnapIndex(2));
    }, []);

    return (
        <MapView
            ref={mapRef}
            mapType="standard"
            onPress={onMapPress}
            style={[
                { ...StyleSheet.absoluteFillObject }
                
            ]}
            initialRegion={{
                latitude: myPosition ? myPosition[LAT_INDEX] : 55.751244,
                longitude: myPosition ? myPosition[LON_INDEX] : 37.618423,
                ...regionDelta
            }}>
            <Marker
                coordinate={{ latitude: 55.751244, longitude: 37.618423 }}
                title={'Москва'}
                description={'Столица России'}
            />
            <GeopositionMarker />
            <UserPointMarker />
            <UrlTile
                urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maximumZ={19}
                shouldReplaceMapContent={true}
            />
        </MapView>
    );
}
