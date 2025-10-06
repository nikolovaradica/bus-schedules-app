import api from '../api/axios';
import type {City} from '../types';
import type {AxiosResponse} from "axios";

export const getAllCities = async (): Promise<City[]> => {
    const response: AxiosResponse<City[]> = await api.get('/cities');
    return response.data;
}