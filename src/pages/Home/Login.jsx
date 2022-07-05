import React, { useState } from "react";
import { Modal } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Text } from "@mantine/core";

function Login({ openedSignIn, setOpenedSignIn, setOpenedSignUp }) {
    const [formError, setError] = useState({
        password: "",
        email: "",
    }); 


    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = credentials.email;
        const password = credentials.password;
        const loginUser = {
            email: email,
            password: password,
            action: "login",
        };
        try {
            const { data } = await axios.post(
                "http://localhost:8080/login",
                loginUser
            );
            const userType = data.user.role;
            console.log(data);
            if (userType === "user") navigate("/user");
            else if (userType === "admin") navigate("/admin");
        } catch (error) {
            console.log(error.response.data.err.message);
            if (error.response.data.err.message.includes("correo")) setError({...formError, email: error.response.data.err.message})
            else setError({...formError, password: error.response.data.err.message, email: ""})

            
        }
    };

    return (
        <Modal
            styles={{
                title: {
                    fontSize: "34px",
                    marginBottom: "1rem",
                    letterSpacing: "1.2px",
                    fontWeight: "700",
                },
            }}
            centered
            opened={openedSignIn}
            onClose={() => setOpenedSignIn(false)}
            transition="fade"
            transitionDuration={400}
            position="center"
            title="Iniciar Sesión"
        >
            <form className="form">
                <div className="input-field">
                    <input
                        type="text"
                        className="form-input"
                        placeholder=" "
                        name="email"
                        onChange={handleChange}
                    />
                    <label htmlFor="" className="form-label">
                        Correo electrónico
                    </label>
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        className="form-input"
                        placeholder=" "
                        name="password"
                        onChange={handleChange}
                    />
                    <label htmlFor="" className="form-label">
                        Contraseña
                    </label>
                </div>
                <button className="form-button" onClick={handleLogin}>
                    Ingresar
                </button>

                <div className="modal-tools">
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            value="lsRememberMe"
                            id="rememberMe"
                        />
                        <label htmlFor="rememberMe">Recuérdame</label>
                    </div>

                    <p className="modal-forgot">¿Olvidaste tu contraseña?</p>
                </div>

                <div className = "modal-footer">
                    <p className="modal-p">¿No tienes cuenta? </p>
                    <p
                        className="modal-p"
                        onClick={() => {
                            setOpenedSignIn(false);
                            setOpenedSignUp(true);
                            setCredentials({
                                email: "",
                                password: "",
                                confirmPassword: "",
                            });
                        }}
                    >
                        Registrate
                    </p>
                </div>
            </form>
        </Modal>
    );
}

export default Login;
