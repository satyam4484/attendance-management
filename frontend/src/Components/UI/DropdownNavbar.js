import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useGlobalContext } from '../../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';

const DropdownNavbar = () => {
    const { isLoggedIn, logoutUser } = useGlobalContext();
    const navigate = useNavigate();

    const userLogoutHandler = () => {
        logoutUser();
        navigate("/auth/login");
    }

    const items = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: "Layout"
        },
        {
            title: "Teacher",
            href: "/teachers",
            icon: "User2"
        }
    ]

    return (
        <>
            <Icon name="UserCircle2" size="20" color="orange" />
            <NavDropdown
                id="nav-dropdown-dark-example"
                title="Profile"
                menuVariant="dark"
                align={{ lg: 'end' }}
            >
                {
                    items.map((item, index) => (
                        <NavDropdown.Item key={index} as={Link} to={item.href} className="px-5">
                            <Icon name={item.icon} size="20" /> {" "}
                            {item.title}
                        </NavDropdown.Item>
                    ))
                }
                <NavDropdown.Divider />
                {isLoggedIn && (
                    <NavDropdown.Item onClick={userLogoutHandler}>
                        <Icon name="LogOut" size="20" color="red" />{" "}
                        Logout
                    </NavDropdown.Item>
                )}
            </NavDropdown>
        </>
    )
}

export default DropdownNavbar