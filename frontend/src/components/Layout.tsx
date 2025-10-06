import {Outlet} from 'react-router-dom';
import Navbar from "./Navbar.tsx";

const Layout = () => {

    return (
        <div className="d-flex min-vh-100 flex-column">
            <Navbar/>
            <main className="flex-grow-1">
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;