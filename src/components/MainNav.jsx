import { NavLink } from "react-router-dom"
const MainNav = () => {
    const menu = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/about",
            title: "Chi siamo"
        },
        {
            path: "/posts",
            title: "Posts Page"
        }
    ];
    return(
        <nav>
            <ul>
                {menu.map((curItem) => (
                    <li key={curItem.path}>
                        <NavLink to={curItem.path}>{curItem.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default MainNav;