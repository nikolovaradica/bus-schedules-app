import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { UserResponse, LoginPayload, RegisterPayload } from "../types";
import { login, register } from "../services/authService";
import {jwtDecode} from "jwt-decode";
import {clearToken, getToken, setToken} from "../utils/authHelper.ts";

type JwtPayload = {
    id: string;
    name: string;
    email: string;
    company: string;
};

type AuthContextType = {
    user: UserResponse | null;
    loading: boolean;
    error: string | null;
    loginUser: (payload: LoginPayload) => Promise<UserResponse>;
    registerUser: (payload: RegisterPayload) => Promise<UserResponse>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token: string | null = getToken();
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setUser({
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    companyName: decoded.company,
                    token
                } as UserResponse);
            } catch {
                clearToken();
            }
        }
    }, []);

    const loginUser = async (payload: LoginPayload) => {
        setLoading(true);
        setError(null);
        try {
            const data: UserResponse = await login(payload);
            setUser(data);
            setToken(data.token);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (payload: RegisterPayload) => {
        setLoading(true);
        setError(null);
        try {
            const data: UserResponse = await register(payload);
            setUser(data);
            setToken(data.token)
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        clearToken();
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};