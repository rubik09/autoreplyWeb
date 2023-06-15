import {
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    registerRequest,
    registerSuccess
} from "../slices/usersSlice";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const registerAdmin = (adminData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());

            const response = await axiosApi.post('api/admin', adminData);

            toast.success('Вы успешно зарегистрировались!');

            dispatch(registerSuccess(response.data.user));
        } catch (e) {
            toast.error(e);
        }
    };
};

export const loginAdmin = (adminData) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('api/admin/sessions', adminData);

            toast.success('Вы успешно вошли!');

            dispatch(loginSuccess(response.data.user));
        } catch (e) {
            toast.error(e);
        }
    };
};

export const logoutAdmin = (id) => {
    return async (dispatch) => {
        try {
            dispatch(logoutRequest());

            await axiosApi.delete(`/api/admin/sessions/${id}`);

            toast.success('Вы успешно вышли!');

            dispatch(logoutSuccess());
        } catch (e) {
            toast.error(e);
        }
    };
};
