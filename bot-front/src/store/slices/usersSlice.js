import { createSlice } from '@reduxjs/toolkit';

const name = 'users';

export const initialState = {
    user: null,
    usersList: [],
    profile: null,
    loginLoading: false,
    loginError: null,
    forgotLoading: false,
    forgotError: null,
    registerLoading: false,
    registerError: null,
    logoutLoading: false,
    logoutError: null,
    loading: false,
    error: null,
    sendApiLoading: false,
    sendApiError: null,
    apiSuccess: false,
    sendInfoLoading: false,
    sendInfoError: null,
    infoSuccess: false,
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        apiSuccessNull(state) {
            state.apiSuccess = false;
        },
        registerRequest(state) {
            state.registerLoading = true;
            state.registerError = null;
        },
        registerSuccess(state, action) {
            state.registerLoading = false;
            state.user = action.payload;
        },
        registerFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        loginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginSuccess(state, action) {
            state.loginLoading = false;
            state.user = action.payload;
        },
        fetchUsersSuccess(state, action) {
            state.usersList = action.payload;
        },
        loginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        logoutRequest(state) {
            state.logoutLoading = true;
            state.logoutError = null;
        },
        logoutSuccess(state) {
            state.logoutLoading = false;
            state.user = null;
        },
        logoutFailure(state, action) {
            state.logoutLoading = false;
            state.logoutError = action.payload;
        },
        sendApiRequest(state, action) {
            state.sendApiLoading = true;
            state.sendApiError = action.payload;
        },
        sendApiSuccess(state) {
            state.sendApiLoading = false;
            state.apiSuccess = true;
        },
        sendApiFailure(state, action) {
            state.sendApiLoading = false;
            state.sendApiError = action.payload;
        },
        sendInfoRequest(state, action) {
            state.sendInfoLoading = true;
            state.sendInfoError = action.payload;
        },
        sendInfoSuccess(state) {
            state.sendInfoLoading = false;
            state.infoSuccess = true;
        },
        sendInfoFailure(state, action) {
            state.sendInfoLoading = false;
            state.sendInfoError = action.payload;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    sendApiRequest,
    sendApiSuccess,
    sendApiFailure,
    apiSuccessNull,
    sendInfoRequest,
    sendInfoSuccess,
    sendInfoFailure,
    fetchUsersSuccess,
} = usersSlice.actions;

export default usersSlice;
