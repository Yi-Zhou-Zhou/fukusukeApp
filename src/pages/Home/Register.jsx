import React, { useState, useEffect } from "react";
import { Modal, SelectChevronIcon } from "@mantine/core";
import axios from "axios";

import usePasswordSecurityValidation from "../../hooks/usePasswordSecurityValidation";
// import regions json
import regionsData from "../../json/regiones-provincias-comunas.json";

function Register({ openedSignUp, setOpenedSignUp, setOpenedSignIn }) {
    const [credentials, setCredentials] = useState({
        run: "",
        name: "",
        address: "",
        commune: "",
        province: "",
        region: "",
        birthday: "",
        sex: "",
        email: "",
        phone: "",
    });
    const [password, setPassword, passwordValid] =
        usePasswordSecurityValidation();
    const [confirmPassword, setConfirmPassword] = useState("");

    const [provinces, setProvinces] = useState([]);
    const [communes, setCommunes] = useState([]);

    const handleChange = (e) => {
        if (e.target.name === "region") {
            // update provinces
            const newProvinces = regionsData.find(
                (region) => e.target.value === region.region
            )?.provincias;
            if (newProvinces) setProvinces(newProvinces);
            else setProvinces([]);

            // clear province and commune
            setCredentials({
                ...credentials,
                [e.target.name]: e.target.value,
                province: "",
                commune: "",
            });
        } else if (e.target.name === "province") {
            // update communes
            const newCommunes = provinces.find(
                (province) => province.name === e.target.value
            )?.comunas;
            if (newCommunes) setCommunes(newCommunes);
            else setCommunes([]);

            // clear commune
            setCredentials({
                ...credentials,
                [e.target.name]: e.target.value,
                commune: "",
            });
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    };

    async function registerUser(e) {
        e.preventDefault();
        if (!passwordValid) {
            const element = document.getElementById("password");
            element.setCustomValidity(
                "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
            );
            return;
        }
        if (password !== confirmPassword) {
            const element = document.getElementById("confirmPassword");
            element.setCustomValidity("Las contraseñas no coinciden");
            return;
        }
        // register user
        console.log(credentials);
        try {
            const { data } = await axios.post(
                "http://localhost:8080/register",
                {
                    ...credentials,
                    password: password,
                    role: "client",
                }
            );
            console.log(data);
            // setOpenedSignUp(false);
            // setOpenedSignIn(true);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
        }
    }

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
            opened={openedSignUp}
            onClose={() => setOpenedSignUp(false)}
            transition="fade"
            transitionDuration={400}
            position="center"
            title="Registrarse"
        >
            <form className="form" onSubmit={registerUser}>
                <div className="input-field">
                    <input
                        type="text"
                        class="form-input"
                        placeholder=" "
                        name="run"
                        onChange={handleChange}
                        required
                    />
                    <label for="" class="form-label">
                        RUN *
                    </label>
                </div>

                <div className="input-field">
                    <input
                        type="text"
                        class="form-input"
                        placeholder=" "
                        name="name"
                        onChange={handleChange}
                        required
                    />
                    <label for="" class="form-label">
                        Nombre completo *
                    </label>
                </div>

                <div className="input-field">
                    <input
                        type="text"
                        class="form-input"
                        placeholder=" "
                        name="address"
                        onChange={handleChange}
                        required
                    />
                    <label for="" class="form-label">
                        Dirección *
                    </label>
                </div>

                <div className="input-field">
                    <label
                        for=""
                        class="form-label"
                        hidden={credentials.region !== ""}
                    >
                        Región *
                    </label>
                    <select
                        class="form-select"
                        name="region"
                        onChange={handleChange}
                        required
                    >
                        <option value=""></option>
                        {regionsData.map((region) => (
                            <option value={region.region}>
                                {region.region}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-field">
                    <label
                        for=""
                        class="form-label"
                        hidden={credentials.province !== ""}
                    >
                        Provincia *
                    </label>
                    <select
                        class="form-select"
                        name="province"
                        onChange={handleChange}
                        value={credentials.province}
                        required
                    >
                        <option value=""></option>
                        {provinces.map((province) => (
                            <option value={province.name}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-field">
                    <label
                        for=""
                        class="form-label"
                        hidden={credentials.commune !== ""}
                    >
                        Comuna *
                    </label>
                    <select
                        class="form-select"
                        name="commune"
                        onChange={handleChange}
                        value={credentials.commune}
                        required
                    >
                        <option value=""></option>
                        {communes.map((commune) => (
                            <option value={commune.name}>{commune.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-field">
                    <input
                        type="date"
                        class="form-input"
                        placeholder=" "
                        name="birthday"
                        onChange={handleChange}
                        required
                    />
                    <label for="" class="form-label">
                        Fecha de nacimiento *
                    </label>
                </div>

                <div className="input-field">
                    <label
                        for=""
                        class="form-label"
                        hidden={credentials.sex !== ""}
                    >
                        Sexo *
                    </label>
                    <select
                        class="form-select"
                        name="sex"
                        onChange={handleChange}
                        required
                    >
                        <option value=""></option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>

                <div className="input-field">
                    <input
                        type="text"
                        class="form-input"
                        placeholder=" "
                        name="email"
                        onChange={handleChange}
                        required
                    />
                    <label for="" class="form-label">
                        Correo electrónico *
                    </label>
                </div>

                <div class="input-field">
                    <input
                        type="text"
                        class="form-input"
                        placeholder=" "
                        name="phone"
                        onChange={handleChange}
                        required
                    />
                    <label for="" class="form-label">
                        Celular *
                    </label>
                </div>

                <div class="input-field">
                    <input
                        id="password"
                        type="password"
                        class="form-input"
                        placeholder=" "
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        onInput={(e) => e.target.setCustomValidity("")}
                        required
                    />
                    <label for="" class="form-label">
                        Contraseña *
                    </label>
                </div>

                <div class="input-field">
                    <input
                        id="confirmPassword"
                        type="password"
                        class="form-input"
                        placeholder=" "
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onInput={(e) => e.target.setCustomValidity("")}
                        required
                    />
                    <label for="" class="form-label">
                        Confirmar Contraseña *
                    </label>
                </div>

                <button class="form-button" type="submit">
                    Crear Cuenta
                </button>

                <div className="modal-tools">
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            value="lsRememberMe"
                            id="rememberMe"
                        />
                        <label for="rememberMe">
                            Recibir ofertas y notificaciones
                        </label>
                    </div>
                </div>

                <div modal-footer>
                    <p className="modal-p">¿Ya tienes una cuenta? </p>
                    <p
                        className="modal-p"
                        onClick={() => {
                            setOpenedSignIn(true);
                            setOpenedSignUp(false);
                            setCredentials({
                                email: "",
                                password: "",
                                confirmPassword: "",
                            });
                        }}
                    >
                        Login
                    </p>
                </div>
            </form>
        </Modal>
    );
}

export default Register;
