import React, { useState } from "react";
import verifyUser from "../../functions/common/verifyUser";
import { AppShell, Text } from "@mantine/core";

import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";

import imgLogo from "../../images/logo.png";
import pdf from "../../pdf/Carta.pdf";

import { AiOutlineLogin, AiOutlineShoppingCart, AiOutlineClockCircle, AiOutlineLogout} from "react-icons/ai";

import { BiFoodMenu } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";

import Login from "./Login";
import Register from "./Register";

const HomeHeader = ({ setOpenedSignIn, handleOpenCart }) => {
    let loc = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
    navigate('/')
    
    }
    if(loc.pathname === "/")
    {
        return(
            <nav className="navbar-menu">
                <div className="navbar-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img className="logo" src={imgLogo} alt="fukusuke" />
                        </Link>
                    </div>
    
                    <div className="navbar-links">
                        <a href={pdf} target="_blank" className="navbar-link">
                            <BiFoodMenu />
                            Carta
                        </a>

                        <a href="#" className="navbar-link">
                            <RiTeamLine />
                            Nosotros
                        </a>

                        <a href="#" className="navbar-link">
                            <GoLocation />
                            Contacto
                        </a>

                        <Link to = "/pedidos" className="navbar-link">
                            <AiOutlineClockCircle />
                            Pedidos
                        </Link>

                        <i
                            onClick={() => {
                                setOpenedSignIn(true);
                            }}
                            className="navbar-icon"
                        >
                            <AiOutlineLogin size={35} color="white" />
                        </i>
                    </div>
                </div>
            </nav>
        )
    } else if(loc.pathname === "/catalogo")
    {
        return(
            <nav className="navbar-menu">
                <div className="navbar-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img className="logo" src={imgLogo} alt="fukusuke" />
                        </Link>
                    </div>
    
                    <div className="navbar-links">
                        <button
                            href = "#" 
                            className = "navbar-link"
                            style = {{ border: '0', background: 'transparent', cursor: 'pointer' }} 
                            onClick = { handleOpenCart }
                        >
                            <AiOutlineShoppingCart />
                            Carrito
                        </button>

                        <Link to = "/pedidos" className="navbar-link">
                            <AiOutlineClockCircle />
                            Pedidos
                        </Link>


                    {verifyUser() ? 
                        <i onClick={() => handleLogout()} className="navbar-icon">
                            <AiOutlineLogout size={32} color="white" />    
                        </i>
                        :  
                        <i onClick={() => { setOpenedSignIn(true);}} className="navbar-icon">
                            <AiOutlineLogin size={32} color="white" />
                        </i>
                    }
                        
                        
                    </div>
                </div>
            </nav>
        )
    } else {
        return(
            <nav className="navbar-menu">
                <div className="navbar-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img className="logo" src={imgLogo} alt="fukusuke" />
                        </Link>
                    </div>
    
                    <div className="navbar-links">
                        <Link to = "/catalogo" className="navbar-link">
                            <BiFoodMenu />
                            Catalogo
                        </Link>

                        <Link to = "/pedidos" className="navbar-link">
                            <AiOutlineClockCircle />
                            Pedidos
                        </Link>

                        <i
                            onClick={() => {
                                setOpenedSignIn(true);
                            }}
                            className="navbar-icon"
                        >
                            <AiOutlineLogin size={35} color="white" />
                        </i>
                    </div>
                </div>
            </nav>
        )
    }
}

const Home = ({ openedCart, setOpenedCart }) => {
    const handleOpenCart = () => {
        openedCart ? setOpenedCart(false) : setOpenedCart(true);
    };

    const [openedSignUp, setOpenedSignUp] = useState(false)
    const [openedSignIn, setOpenedSignIn] = useState(false)

    return (
        <AppShell
            fixed
            padding = "0"
            header = { <HomeHeader setOpenedSignIn = { setOpenedSignIn } handleOpenCart = { handleOpenCart } /> }
            navbar = { null }
            styles = {{ main: { minHeight: 'calc(100vh - 80px)' } }}
        >
            <Login
                openedSignIn={openedSignIn}
                setOpenedSignIn={setOpenedSignIn}
                setOpenedSignUp={setOpenedSignUp}
            />
            <Register
                openedSignUp={openedSignUp}
                setOpenedSignUp={setOpenedSignUp}
                setOpenedSignIn={setOpenedSignIn}
            />

            <Outlet/>

        </AppShell>
    );
};

export default Home;
