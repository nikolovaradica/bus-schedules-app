import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUser, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

type AuthFormProps = {
    title: string;
    error?: string;
    passwordError?: string;
    loading: boolean;
    onSubmit: () => void;
    fields: {
        name?: string;
        email: string;
        password: string;
    };
    setFields: (fields) => void;
    submitLabel: string;
    footerText: string;
    footerLink: { text: string, to: string };
};

const AuthForm = ({
                      title,
                      error,
                      passwordError,
                      loading,
                      onSubmit,
                      fields,
                      setFields,
                      submitLabel,
                      footerText,
                      footerLink
                  }: AuthFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="d-flex align-items-center justify-content-center bus-image-div">
            <div className="login-card-outer">
                <div className="login-card-inner">
                    <div className="login-center-wrap">
                        <h4 className="mb-4">{title}</h4>
                        {error && <p className="text-danger">{error}</p>}

                        {"name" in fields && (
                            <div className="form-group input-with-icon">
                                <FontAwesomeIcon icon={faUser} className="fa-icon"/>
                                <input
                                    type="text"
                                    placeholder="Име"
                                    value={fields.name || ""}
                                    onChange={(e) => setFields({...fields, name: e.target.value})}
                                    className="custom-form-style form-style"
                                />
                            </div>
                        )}

                        <div className="form-group input-with-icon mt-3">
                            <FontAwesomeIcon icon={faEnvelope} className="fa-icon"/>
                            <input
                                type="email"
                                placeholder="Е-пошта"
                                value={fields.email}
                                onChange={(e) => setFields({...fields, email: e.target.value})}
                                className="custom-form-style form-style"
                            />
                        </div>

                        <div className="form-group input-with-icon mt-3">
                            <FontAwesomeIcon icon={faLock} className="fa-icon"/>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Лозинка"
                                value={fields.password}
                                onChange={(e) => setFields({...fields, password: e.target.value})}
                                className="custom-form-style form-style"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                                className="fa-eye-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {passwordError && <p className="text-danger mt-1">{passwordError}</p>}

                        <button disabled={loading} onClick={onSubmit} className="form-button btn mt-4 w-100">
                            {loading ?
                                <div className="spinner-border spinner-border-sm" role="status"></div> :
                                submitLabel
                            }
                        </button>

                        <p className="mt-2 text-center">
                            <a href={footerLink.to} className="footer-link">
                                {footerText}{" "}{footerLink.text}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;