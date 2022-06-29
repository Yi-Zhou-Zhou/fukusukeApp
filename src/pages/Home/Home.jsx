import React, { useState } from "react";
import imgLogo from "../../images/logo.png";
import { AiOutlineConsoleSql, AiOutlineLogin } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import pdf from "../../pdf/Carta.pdf";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
    const [openedSignUp, setOpenedSignUp] = useState(false);
    const [openedSignIn, setOpenedSignIn] = useState(false);

    return (
        <>
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

            <main className="main-content">
                <div className="bg-container">
                    <h3 className="hero-title">
                        Atrévete a probar el mejor Sushi de Santiago...
                    </h3>
                    <button className="hero-btn">Realizar Pedido</button>
                </div>
            </main>

            <footer className="footer-content">
                <div className="footer-container"></div>
            </footer>
        </>
    );
};

export default Home;
