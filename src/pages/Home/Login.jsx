import React, { useState } from "react";
import { Modal, PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                <TextInput
                    name="email"
                    label="Correo Electrónico"
                    value={credentials.email}
                    onInput={() => setError({...formError, email: ""})}
                    onChange={handleChange}
                    error={formError.email}
                />

                <PasswordInput
                    name="password"
                    label="Contraseña"
                    value={credentials.password}
                    onInput={() => setError({...formError, password: ""})}
                    onChange={handleChange}
                    error={formError.password}
                />

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
