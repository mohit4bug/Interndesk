import "./Navbar.scss"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const linkStyle = {
    color: "#303030",
    textDecoration: "none"
}

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);
    const { _id } = currentUser


    return (
        <nav className="nav">
            <div>
                <img src="/public/logo.png" alt="logo" />
                <span className="navItem">
                    <Link style={linkStyle} to={`/profile/${_id}`}>Profile</Link>
                </span>
            </div>
        </nav>
    )
}

export default Navbar