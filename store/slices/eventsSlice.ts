import { getGeolocation } from '@/constants/functions';
import { EVENT_SLICE } from '@/constants/slices';
import { EVENTS_STORAGE, getStorage, removeStorage, setStorage } from '@/storage/storage';
import { TCoordinates, TEventType } from '@/types/eventsTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as ImagePicker from 'expo-image-picker';

type initialStateType = {
    eventFotos: ImagePicker.ImageInfo[];
    eventDate: number;
    eventCoordinates: TCoordinates | null;
    myPosition: TCoordinates | null;
    events: Array<TEventType>;
};

const initialState: initialStateType = {
    eventFotos: [],
    eventDate: new Date().getTime(),
    eventCoordinates: null,
    myPosition: null,
    events:[]
};

const eventSlice = createSlice({
    name: EVENT_SLICE,
    initialState,
    reducers: {
        setEventFotos(state, action) {
            console.warn('PAYLOAD_ASSETS:', action.payload.assets);
            state.eventFotos = [...state.eventFotos, ...action.payload.assets];
        },
        setEventDate(state, action: PayloadAction<number>) {
            state.eventDate = action.payload;
        },
        setEventCoordinates(state, action: PayloadAction<[number, number] | null>) {
            state.eventCoordinates = action.payload;
        },
        setMyPosition(state, action: PayloadAction<[number, number] | null>) {
            state.myPosition = action.payload;
        },
        setEvents(state, action: PayloadAction<TEventType>) {
            console.log(action.payload)
            if (action.payload !== null) {
                state.events = [...state.events, action.payload];
                setStorage(EVENTS_STORAGE, state.events);
            }           
            
            // removeStorage(EVENTS_STORAGE)
        }
    }
});

export const { setEventFotos, setEventDate, setEventCoordinates, setMyPosition, setEvents } = eventSlice.actions;
export default eventSlice.reducer;
