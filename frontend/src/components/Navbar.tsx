import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../context/AuthContext.tsx";

const Navbar = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        logout();
        handleLinkClick();
        navigate("/najavi-se");
    };

    return (
        <header className="main-header overlay">
            <div className="container">
                <nav className="navbar navbar-expand-lg main-nav px-0">
                    <a className="navbar-brand text-white fw-bold fs-5" href="/">
                        Меѓуградски автобуски линии
                    </a>
                    <button className="navbar-toggler custom-toggler p-1"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                    >
                        <span className="icon-bar icon-bar-3"></span>
                        <span className="icon-bar icon-bar-3"></span>
                        <span className="icon-bar icon-bar-3"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="mainMenu">
                        <ul className="navbar-nav ms-auto text-uppercase f1">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({isActive}) => isActive ? "active text-white" : "text-white"}
                                    onClick={handleLinkClick}
                                >
                                    Почетна
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/avtobuski-linii"
                                    className={({isActive}) => isActive ? "active text-white" : "text-white"}
                                    onClick={handleLinkClick}
                                >
                                    Автобуски линии
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/kompanii"
                                    className={({isActive}) => isActive ? "active text-white" : "text-white"}
                                    onClick={handleLinkClick}
                                >
                                    Компании
                                </NavLink>
                            </li>

                            {!user ? (
                                <li>
                                    <NavLink
                                        to="/najavi-se"
                                        className={({isActive}) => (isActive ? "active text-white" : "text-white")}
                                        onClick={handleLinkClick}
                                    >
                                        Најави се
                                    </NavLink>
                                </li>
                            ) : (
                                <><li>
                                    <NavLink
                                        to="/moi-linii"
                                        className={({isActive}) =>
                                            isActive ? "active text-white" : "text-white"
                                        }
                                        onClick={handleLinkClick}
                                    >
                                        Мои линии
                                    </NavLink>
                                </li>
                                <li className="nav-item dropdown position-relative">
                                    <div
                                        className="profile-icon d-flex align-items-center justify-content-center rounded-circle text-white"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    {dropdownOpen && (
                                        <div ref={dropdownRef}
                                             className="profile-dropdown shadow rounded p-3 position-absolute"
                                        >
                                            <div className="profile-dropdown-arrow"/>
                                            <p className="profile-name">{user.name}</p>
                                            <p className="profile-email">{user.email}</p>
                                            <button
                                                className="btn btn-sm w-100"
                                                onClick={handleLogout}
                                            >
                                                Одјави се
                                            </button>
                                        </div>
                                    )}
                                </li></>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;