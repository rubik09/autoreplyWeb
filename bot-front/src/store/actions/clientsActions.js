import {
    deleteUserSuccess,
    editStatusSuccess,
    fetchUsersSuccess, fetchUserSuccess,
    sendApiRequest,
    sendApiSuccess, sendInfoFailure,
    sendInfoRequest,
    sendInfoSuccess
} from "../slices/usersSlice";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const sendApiInfo = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendApiRequest());

            console.log(await axiosApi.post('api/clients/connect', data))

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

            console.log(await axiosApi.patch('api/clients', data))

            toast.success('Личка успешно обновлена!');

            dispatch(sendApiSuccess());
        } catch (e) {
            toast.error(e);
        }
    };
};

export const sendClientInfo = (data) => {
    return async (dispatch) => {
        try {
            dispatch(sendInfoRequest());

            await axiosApi.post('api/clients/add', data);

            toast.success('Успешно!');

            dispatch(sendInfoSuccess());
        } catch (e) {
            dispatch(sendInfoFailure(e.response.data));
            // toast.error(e);
        }
    };
};

export const fetchClients = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get('api/clients');

            dispatch(fetchUsersSuccess(data.users));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const fetchClientById = (client_id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get(`api/clients/${client_id}`);

            dispatch(fetchUserSuccess(data.user));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const changeStatus = (client_id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.post('api/clients/status', {client_id});

            toast.success(`Вы успешно сменили статус на "${data.bool ? 'запущен' : 'остановлен'}"!`);

            dispatch(editStatusSuccess({client_id, bool: data.bool}));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const deleteClient = (client_id) => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`api/clients/${client_id}`);

            toast.success('Личка успешно удалена!');

            dispatch(deleteUserSuccess({client_id}));
        } catch (e) {
            toast.error(e);
        }
    }
};
