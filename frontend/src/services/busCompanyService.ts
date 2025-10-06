import api from '../api/axios';
import type {BusCompany} from '../types';
import type {AxiosResponse} from "axios";

export const getAllBusCompanies = async (): Promise<BusCompany[]> => {
    const response: AxiosResponse<BusCompany[]> = await api.get('/companies');
    return response.data;
}