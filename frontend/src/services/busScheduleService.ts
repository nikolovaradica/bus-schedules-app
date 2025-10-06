import api from '../api/axios';
import type {BusSchedule} from '../types';
import type {AxiosResponse} from "axios";
import {formatDaysAvailable} from "../utils/formatter.ts";

export const searchSchedules = async (
    page: number = 0,
    size: number = 10,
    cityFrom?: string,
    cityTo?: string,
    companyName?: string,
    departureDate?: string,
): Promise<{schedules: BusSchedule[], totalPages: number, totalElements: number}> => {
    const params: Record<string, string | number> = {};
    if (cityFrom) params.cityFrom = cityFrom;
    if (cityTo) params.cityTo = cityTo;
    if (companyName) params.companyName = companyName;
    if (departureDate) params.departureDate = departureDate;
    params.page = page;
    params.size = size;

    const response: AxiosResponse<{content: BusSchedule[], totalPages: number, totalElements: number}> =
        await api.get('/schedules/search', { params });

    return {
        schedules: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements
    };
}

export const createSchedule = async (data: Partial<BusSchedule> & { days: string[]; holidays: boolean }) => {
    const daysAvailable = formatDaysAvailable(data.days, data.holidays);

    const payload = {
        cityFrom: data.cityFrom,
        cityTo: data.cityTo,
        departureTime: data.departureTime,
        company: data.company,
        daysAvailable: daysAvailable
    };
    const response: AxiosResponse<BusSchedule> = await api.post('/schedules', payload);
    return response.data;
}

export const updateSchedule = async (id: number, data: Partial<BusSchedule> & { days: string[]; holidays: boolean }) => {
    const daysAvailable = formatDaysAvailable(data.days, data.holidays);

    const payload = {
        ...data,
        company: data.company,
        daysAvailable: daysAvailable
    };
    const response: AxiosResponse<BusSchedule> = await api.put(`/schedules/${id}`, payload);
    return response.data;
}

export const deleteSchedule = async (id: number) => {
    await api.delete(`/schedules/${id}`);
}