import { NAVIGATION_SLICE } from '@/constants/slices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharedValue } from 'react-native-reanimated';

type State = {
    bottomSheetSnapIndex: SnapIndex;
    bottomSheetHeight: number | null;
    addEventMode: 'FLASHBACK' | 'NEW_EVENT';
    isModalFotoOpen: boolean;
};
const initialState: State = {
    bottomSheetSnapIndex: null,
    bottomSheetHeight: null,
    addEventMode: 'NEW_EVENT',
    isModalFotoOpen: false
};

const navigationSlice = createSlice({
    name: NAVIGATION_SLICE,
    initialState,
    reducers: {
        setBottomSheetSnapIndex(state, action: PayloadAction<SnapIndex>) {
            state.bottomSheetSnapIndex = action.payload;
        },
        setBottomSheetAddEventMode(state, action: PayloadAction<'FLASHBACK' | 'NEW_EVENT'>) {
            state.addEventMode = action.payload;
        },
        setBottomSheetHeight(state, action: PayloadAction<number>) {
            state.bottomSheetHeight = action.payload;
        },
        setIsModalFotoOpen(state, action: PayloadAction<boolean>) {
            state.isModalFotoOpen = action.payload;
        }
    }
});

export const {
    setBottomSheetSnapIndex,
    setBottomSheetAddEventMode,
    setBottomSheetHeight,
    setIsModalFotoOpen } =
    navigationSlice.actions;

export default navigationSlice.reducer;
