import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
    const { user, registerUser, loading, error } = useAuth();
    const [fields, setFields] = useState({email: "", password: "", name: ""});
    const [passwordError, setPasswordError] = useState<string | null>(null);

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = async () => {
        if (!fields.name.trim() || !fields.email.trim() || !fields.password.trim()) {
            alert("Внесете име, е-пошта и лозинка");
            return;
        }
        const passError = validatePassword(fields.password);
        if (passError){
            setPasswordError(passError)
            return;
        }
        setPasswordError(null);
        await registerUser(fields);
    };

    return (
        <AuthForm
            title="Регистрирај се"
            error={error || ""}
            passwordError={passwordError || ""}
            loading={loading}
            onSubmit={handleSubmit}
            fields={fields}
            setFields={setFields}
            submitLabel="Регистрирај се"
            footerText="Веќе имаш профил?"
            footerLink={{ text: "Најави се!", to: "/najavi-se" }}
        />
    );
};

const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Лозинката мора да има најмалку 8 карактери";
    if (!/[A-Z]/.test(password)) return "Лозинката мора да содржи барем една голема буква";
    if (!/[a-z]/.test(password)) return "Лозинката мора да содржи барем една мала буква";
    if (!/\d/.test(password)) return "Лозинката мора да содржи барем една цифра";
    if (!/[@$!%*?&]/.test(password)) return "Лозинката мора да содржи барем еден специјален карактер (@$!%*?&)";
    return null; // all good
};

export default RegisterPage;
