import { LAT_INDEX, LON_INDEX } from '@/constants/common';
import { useAppSelector } from '@/store';
import { Marker } from 'react-native-maps';

export default function GeopositionMarker() {
    const myPosition = useAppSelector(state => state.eventSlice.myPosition);
    const IS_MARKER_COORDS_EXIST = myPosition !== null;

    return (
        <>
            {IS_MARKER_COORDS_EXIST && (
                <Marker
                    pinColor={'red'}
                    coordinate={{ latitude: myPosition[LAT_INDEX], longitude: myPosition[LON_INDEX] }}
                    zIndex={100}
                    tracksViewChanges={false}
                    // onPress={handleMarkerPress}
                    title="Я тут"
                    style={{
                        height: 50,
                        width: 50
                    }}></Marker>
            )}
        </>
    );
}
