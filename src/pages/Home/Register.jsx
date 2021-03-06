import React, { useState, useEffect } from "react";
import { Group, Modal, PasswordInput, Select, TextInput } from "@mantine/core";
import "dayjs/locale/es-mx";
import { DatePicker } from "@mantine/dates";
import axios from "axios";
import usePasswordSecurityValidation from "../../hooks/usePasswordSecurityValidation";
import { userApi } from "../../api/Api";
// import regions json
import regionsData from "../../json/regiones-provincias-comunas.json";

function Register({ openedSignUp, setOpenedSignUp, setOpenedSignIn }) {
	const [formError, setError] = useState("");
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

	const [emailErrorMessage, setEmailErrorMessage] = useState("");

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	async function registerUser(e) {
		e.preventDefault();
		if (!passwordValid) {
			return;
		}
		if (password !== confirmPassword) {
			return;
		}

		setError({ ...formError, password: "" });

		// register user
		try {
			const { data } = await axios.post(`${userApi}/register`, {
				...credentials,
				password: password,
				role: "client",
			});

			setOpenedSignUp(false);
			setOpenedSignIn(true);
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				setEmailErrorMessage(error.response.data.message);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
		}
	}

	useEffect(() => {
		// update provinces
		const newProvinces = regionsData.find(
			(region) => credentials.region === region.region
		)?.provincias;

		if (newProvinces) setProvinces(newProvinces);
		else setProvinces([]);

		setCredentials({ ...credentials, province: "", commune: "" });
	}, [credentials.region]);

	useEffect(() => {
		// update communes
		const newCommunes = provinces.find(
			(province) => credentials.province === province.name
		)?.comunas;

		if (newCommunes) setCommunes(newCommunes);
		else setCommunes([]);

		setCredentials({ ...credentials, commune: "" });
	}, [credentials.province]);

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
			onClose={() => {
				setOpenedSignUp(false);
				setError("");
			}}
			transition="fade"
			transitionDuration={400}
			position="center"
			title="Registrarse"
			size="lg"
		>
			<form className="form" onSubmit={registerUser}>
				<Group direction="row" grow>
					<TextInput
						placeholder="Nombre Completo *"
						name="name"
						required
						onChange={handleChange}
					/>

					<TextInput
						placeholder="RUN *"
						name="run"
						onChange={handleChange}
						required
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"El Nombre es obligatorio"
							)
						}
						onInput={(e) => e.target.setCustomValidity("")}
					/>
				</Group>

				<Group grow>
					<TextInput
						placeholder="Ingrese su correo electr??nico"
						name="email"
						onChange={handleChange}
						required
						onInput={() => {
							setEmailErrorMessage("");
						}}
						error={emailErrorMessage}
					/>

					<TextInput
						placeholder="Celular *"
						name="phone"
						onChange={handleChange}
						required
					/>
				</Group>

				<PasswordInput
					id="password"
					placeholder="Contrase??a *"
					onChange={(e) => setPassword(e.target.value)}
					required
					description="La contrase??a debe tener al menos 8 caracteres, una letra may??scula, una letra min??scula y un n??mero"
					error={!passwordValid}
				/>
				<PasswordInput
					id="confirmPassword"
					placeholder="Confirmar contrase??a *"
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					error={
						confirmPassword !== "" &&
						password !== confirmPassword &&
						"Las contrase??as no coinciden"
					}
				/>

				<TextInput
					placeholder="Direcci??n *"
					name="address"
					onChange={handleChange}
					required
				/>

				<Group grow>
					<Select
						name="region"
						placeholder="Seleccione regi??n"
						required
						value={credentials.region}
						onChange={(newValue) =>
							setCredentials({ ...credentials, region: newValue })
						}
						data={regionsData.map((region) => region.region)}
					/>

					<Select
						name="province"
						placeholder="Seleccione provincia"
						required
						value={credentials.province}
						onChange={(newValue) =>
							setCredentials({
								...credentials,
								province: newValue,
							})
						}
						data={provinces.map((province) => province.name)}
					/>

					<Select
						name="commune"
						placeholder="Seleccione comuna"
						required
						value={credentials.commune}
						onChange={(newValue) =>
							setCredentials({
								...credentials,
								commune: newValue,
							})
						}
						data={communes.map((commune) => commune.name)}
					/>
				</Group>

				<Group grow>
					<DatePicker
						placeholder="Fecha de nacimiento *"
						name="birthday"
						locale="es-mx"
						onChange={(newValue) =>
							setCredentials({
								...credentials,
								birthday: newValue,
							})
						}
						required
						allowFreeInput
					/>

					<Select
						name="sex"
						placeholder="Sexo"
						required
						value={credentials.sex}
						onChange={(newValue) =>
							setCredentials({ ...credentials, sex: newValue })
						}
						data={[
							{ value: "M", label: "Hombre" },
							{ value: "F", label: "Mujer" },
							{ value: "O", label: "Otro" },
						]}
					/>
				</Group>

				<button className="form-button" type="submit">
					Crear Cuenta
				</button>

				<div className="modal-tools">
					<div className="checkbox">
						<input
							type="checkbox"
							value="lsRememberMe"
							id="rememberMe"
						/>
						<label htmlFor="rememberMe">
							Recibir ofertas y notificaciones
						</label>
					</div>
				</div>

				<div className="modal-footer">
					<p className="modal-p">??Ya tienes una cuenta? </p>
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
