import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
    const { user, loginUser, loading, error } = useAuth();
    const [fields, setFields] = useState({email: "", password: ""});

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = async () => {
        if (!fields.email.trim() || !fields.password.trim()) {
            alert("Внесете е-пошта и лозинка");
            return;
        }
        await loginUser(fields);
    }

    return (
        <AuthForm
            title="Најави се"
            error={error || ""}
            loading={loading}
            onSubmit={handleSubmit}
            fields={fields}
            setFields={setFields}
            submitLabel="Најави се"
            footerText="Немаш профил?"
            footerLink={{ text: "Регистрирај се!", to: "/registriraj-se" }}
        />
    );
};

export default LoginPage;