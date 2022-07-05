import React, { useState } from "react";

import { AppShell } from "@mantine/core";

import { Outlet } from "react-router-dom";

import imgLogo from "../../images/logo.png";
import { AiOutlineLogin } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import pdf from "../../pdf/Carta.pdf";
import Login from "./Login";
import Register from "./Register";

const HomeHeader = ({ setOpenedSignIn }) => {
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
    const [openedSignUp, setOpenedSignUp] = useState(false);
    const [openedSignIn, setOpenedSignIn] = useState(false);

    return (
        <AppShell
            fixed
            padding = "0"
            header = { <HomeHeader setOpenedSignIn = { setOpenedSignIn }/> }
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
