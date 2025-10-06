import api from "../api/axios";
import type {LoginPayload, UserResponse, RegisterPayload} from "../types";
import type {AxiosResponse} from "axios";

export const login = async (payload: LoginPayload): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await api.post("/auth/login", payload);
    console.log(response.data)
    return response.data;

};

export const register = async (payload: RegisterPayload): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await api.post("/auth/register", payload);
    console.log(response.data)
    return response.data;
};