import axiosApi from '../../axiosApi';
import {
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    registerRequest,
    registerSuccess,
    sendApiRequest,
    sendApiSuccess,
    sendInfoRequest,
    sendInfoSuccess,
    fetchUsersSuccess, editStatusSuccess, deleteUserSuccess, fetchUserSuccess,
} from '../slices/usersSlice';
import {toast} from "react-toastify";

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());

            const response = await axiosApi.post('api/users', userData);

            toast.success('Вы успешно зарегистрировались!');

            dispatch(registerSuccess(response.data.user));
        } catch (e) {
            toast.error(e);
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('api/users/sessions', userData);

            toast.success('Вы успешно вошли!');

            dispatch(loginSuccess(response.data.user));
        } catch (e) {
            toast.error(e);
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutRequest());

            await axiosApi.delete('api/users/sessions');

            toast.success('Вы успешно вышли!');

            dispatch(logoutSuccess());
        } catch (e) {
            toast.error(e);
        }
    };
};

export const sendApiInfo = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendApiRequest());

            console.log(await axiosApi.post('api/users/api', data))

            dispatch(sendApiSuccess());
        } catch (e) {
            toast.error(e);
        }
    };
};

export const updateClient = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendApiRequest());

            console.log(await axiosApi.patch('api/user', data))

            toast.success('Личка успешно обновлена!');

            dispatch(sendApiSuccess());
        } catch (e) {
            toast.error(e);
        }
    };
};

export const sendUserInfo = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendInfoRequest());

            await axiosApi.post('api/users/add', data)

            toast.success('Успешно!');

            dispatch(sendInfoSuccess());
        } catch (e) {
            toast.error(e);
        }
    };
};

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get('api/users');

            dispatch(fetchUsersSuccess(data.users));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const fetchUserById = (user_id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get(`api/user/${user_id}`);

            dispatch(fetchUserSuccess(data.user));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const changeStatus = (user_id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.post('api/users/status', {user_id});

            toast.success(`Вы успешно сменили статус на "${data.bool ? 'запущен' : 'остановлен'}"!`);

            dispatch(editStatusSuccess({user_id, bool: data.bool}));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const deleteUser = (user_id) => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`api/users/${user_id}`);

            toast.success('Личка успешно удалена!');

            dispatch(deleteUserSuccess({user_id}));
        } catch (e) {
            toast.error(e);
        }
    }
};
