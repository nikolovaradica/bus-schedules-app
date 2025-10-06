export interface BusCompany {
    id: number;
    name: string;
    contactEmail?: string;
    contactPhoneNumber?: string;
    webPage?: string;
}

export interface City {
    id: number;
    name: string;
}

export interface BusSchedule {
    id: number;
    cityFrom: string;
    cityTo: string;
    departureTime: string;
    daysAvailable: string;
    company: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface UserResponse {
    token: string;
    id: number;
    email: string;
    name: string;
    companyName: string;
}