import React, { useState } from "react";

import { AppShell } from "@mantine/core";

import { Outlet } from "react-router-dom";

import imgLogo from "../../images/logo.png";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiFoodMenu } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import pdf from "../../pdf/Carta.pdf";
import Login from "./Login";
import Register from "./Register";
import ShoppingCart from "../User/ShoppingCart";

const HomeHeader = ({ setOpenedSignIn, handleOpenCart }) => {
    return(
        <nav className="navbar-menu">
            <div className="navbar-container">
                <div className="logo-container">
                    <img className="logo" src={imgLogo} alt="fukusuke" />
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
                    <button
                        href = "#" 
                        className = "navbar-link"
                        style = {{ border: '0', background: 'transparent', cursor: 'pointer' }} 
                        onClick = { handleOpenCart }
                    >
                        <AiOutlineShoppingCart />
                        Carrito
                    </button>
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

const Home = () => {
    const handleOpenCart = () => {
        openedCart ? setOpenedCart(false) : setOpenedCart(true);
    };

    const [openedSignUp, setOpenedSignUp] = useState(false)
    const [openedSignIn, setOpenedSignIn] = useState(false)

    const [openedCart, setOpenedCart] = useState(false)

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

            <ShoppingCart
                openedCart = { openedCart }
                setOpenedCart = { setOpenedCart }
            />

            <Outlet/>

        </AppShell>
    );
};

export default Home;
