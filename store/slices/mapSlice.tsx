import { MAP_SLICE } from '@/constants/slices';
import { TCoordinates } from '@/types/eventsTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type initialStateType = {
    // eventPoints: Array<TCoordinates>;
};

const initialState: initialStateType = {
    eventPoints: []
};

const mapSlice = createSlice({
    name: MAP_SLICE,
    initialState,
    reducers: {
        // setEventPoints(state, action:PayloadAction<TCoordinates>) {      
        //     state.eventPoints = [...state.eventPoints, action.payload];
        // }
    }
});

// export const { setEventPoints } = mapSlice.actions;
export default mapSlice.reducer;
