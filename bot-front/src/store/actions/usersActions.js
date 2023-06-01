import axiosApi from '../../axiosApi';
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    sendApiRequest,
    sendApiSuccess,
    sendApiFailure,
    sendInfoRequest,
    sendInfoSuccess,
    sendInfoFailure,
    fetchUsersSuccess,
} from '../slices/usersSlice';

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());

            const response = await axiosApi.post('/users', userData);

            dispatch(registerSuccess(response.data.user));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerFailure(e.response.data));
                throw e;
            } else {
                dispatch(registerFailure({global: 'error'}));
                throw e;
            }
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            dispatch(loginSuccess(response.data.user));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginFailure(e.response.data));
                throw e;
            } else {
                dispatch(loginFailure({global: 'error'}));
                throw e;
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutRequest());

            await axiosApi.delete('/users/sessions');

            dispatch(logoutSuccess());
        } catch (e) {
            dispatch(logoutFailure(e));
        }
    };
};

export const sendApiInfo = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendApiRequest());

            console.log(await axiosApi.post('/users/api', data))

            dispatch(sendApiSuccess());
        } catch (e) {
            dispatch(sendApiFailure(e));
        }
    };
};

export const sendUserInfo = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendInfoRequest());

            await axiosApi.post('/users/add', data)

            dispatch(sendInfoSuccess());
        } catch (e) {
            dispatch(sendInfoFailure(e));
        }
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get('/users');
            dispatch(fetchUsersSuccess(data.users));
        } catch (e) {
            // toast.error("album cannot be fetch!");
            console.log(e);
        }
    }
};

export const changeStatus = (data) => {
    return async () => {
        try {
            await axiosApi.post('/users/status', {user_id: data});

            // dispatch(fetchUsersSuccess());
        } catch (e) {
            // toast.error("album cannot be fetch!");
            console.log(e);
        }
    }
};
