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

            console.log(data)

            dispatch(fetchUsersSuccess(data.usersToSend));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const fetchClientById = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.get(`api/clients/${id}`);

            dispatch(fetchUserSuccess(data.user));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const changeStatus = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosApi.post('api/clients/status', {id});

            toast.success(`Вы успешно сменили статус на "${data.bool ? 'запущен' : 'остановлен'}"!`);

            dispatch(editStatusSuccess({id, bool: data.bool}));
        } catch (e) {
            toast.error(e);
        }
    }
};

export const deleteClient = (id) => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`api/clients/${id}`);

            toast.success('Личка успешно удалена!');

            dispatch(deleteUserSuccess({id}));
        } catch (e) {
            toast.error(e);
        }
    }
};
