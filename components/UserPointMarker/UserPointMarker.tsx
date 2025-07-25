import { LAT_INDEX, LON_INDEX } from "@/constants/common";
import { useAppDispatch, useAppSelector } from "@/store";
import { View } from "react-native";
import { Marker } from "react-native-maps";

export default function UserPointMarker() {
    const userPointCoordinates = useAppSelector((state)=>state.eventSlice.eventCoordinates)
    return (
        <>
            {userPointCoordinates &&
                <Marker
                    draggable
                    anchor={{ x: 0.2, y: 0.2 }}
                    coordinate={{                
                latitude: userPointCoordinates[LAT_INDEX],
                longitude: userPointCoordinates[LON_INDEX]
            }}>
                <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                    backgroundColor: 'tomato'
                }}></View>
            </Marker>}
        </>
    )
}