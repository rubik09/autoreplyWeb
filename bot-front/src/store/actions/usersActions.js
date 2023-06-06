import axiosApi from '../../axiosApi';
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    registerRequest,
    registerSuccess,
    registerFailure,
    sendApiRequest,
    sendApiSuccess,
    sendInfoRequest,
    sendInfoSuccess,
    fetchUsersSuccess, editStatusSuccess, deleteUserSuccess, fetchUserSuccess,
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
                // toast.error(e);
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
                // toast.error(e);
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
            // toast.error(e);
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
            // toast.error(e);
        }
    };
};

export const updateClient = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendApiRequest());

            console.log(await axiosApi.patch('/user', data))

            dispatch(sendApiSuccess());
        } catch (e) {
            // toast.error(e);
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
            // toast.error(e);
        }
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get('/users');

            dispatch(fetchUsersSuccess(data.users));
        } catch (e) {
            // toast.error(e);
        }
    }
};

export const fetchUserById = (user_id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get(`/user/${user_id}`);

            dispatch(fetchUserSuccess(data.user));
        } catch (e) {
            // toast.error(e);
        }
    }
};

export const changeStatus = (user_id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.post('/users/status', {user_id});

            dispatch(editStatusSuccess({user_id, bool: data.bool }));
        } catch (e) {
            // toast.error(e);
        }
    }
};

export const deleteUser = (user_id) => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`/users/${user_id}`);

            dispatch(deleteUserSuccess({user_id}));
        } catch (e) {
            // toast.error(e);
        }
    }
};
