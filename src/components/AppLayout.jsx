import { Outlet } from "react-router-dom"
import MainNav from "./MainNav";
import AppAlert from "./AppAlert";
const AppLayout = () => {
    return(
        <>
        <header>
            <MainNav />
        </header>

        <AppAlert />
        
        <Outlet />
        <footer>Footer</footer>
        </>
    )
}
export default AppLayout;