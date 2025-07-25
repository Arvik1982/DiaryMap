import { LOGIN_SLICE } from '@/constants/slices';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
};

const loginSlice = createSlice({
    name: LOGIN_SLICE,
    initialState,
    reducers: {
        setLoginSuccess(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
        },
        setLoginFailure(state, action) {
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        },
        setLogout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
        },
    },
});


export const { setLoginSuccess, setLoginFailure, setLogout } = loginSlice.actions;
export default loginSlice.reducer;
