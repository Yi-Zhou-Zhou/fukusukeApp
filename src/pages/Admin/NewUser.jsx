import React, { useContext, useState, useMemo } from "react";
import {
	Modal,
	TextInput,
	Select,
	Group,
	Button,
	PasswordInput,
} from "@mantine/core";
import "dayjs/locale/es-mx";
import { DatePicker } from "@mantine/dates";
import { UserContext } from "../../context/user/UserContext";
import regionsData from "../../json/regiones-provincias-comunas.json";
import { userApi } from "../../api/Api";
import axios from "axios";
import usePasswordSecurityValidation from "../../hooks/usePasswordSecurityValidation";

function NewUser({ role, open, setOpen }) {
	const { users, addUser } = useContext(UserContext);

	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [formError, setError] = useState("");

	const [password, setPassword, passwordValid] =
		usePasswordSecurityValidation();
	const [confirmPassword, setConfirmPassword] = useState("");

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
		role: role,
	});

	const provinces = useMemo(() => {
		const newProvinces = regionsData.find(
			(region) => credentials.region === region.region
		)?.provincias;

		// clear province and commune
		setCredentials({ ...credentials, province: "", commune: "" });

		if (newProvinces) return newProvinces;
		else return [];
	}, [credentials.region]);

	const communes = useMemo(() => {
		const newCommunes = provinces.find(
			(province) => credentials.province === province.name
		)?.comunas;

		// clear commune
		setCredentials({ ...credentials, commune: "" });

		if (newCommunes) return newCommunes;
		else return [];
	}, [credentials.province]);

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const roleOptions = [
		{ value: "admin", label: "Administrador" },
		{ value: "client", label: "Cliente" },
		{ value: "delivery", label: "Encargado de despacho" },
		{ value: "cashier", label: "Cajero" },
	];

	async function registerUser(e) {
		e.preventDefault();
		if (!passwordValid) {
			return;
		}
		if (password !== confirmPassword) {
			return;
		}

		if (!credentials.role) {
			setError({ ...formError, role: "El rol es obligatorio" });
			return;
		}

		setError({ ...formError, password: "", role: "" });

		// register user
		try {
			const { data } = await axios.post(`${userApi}/register`, {
				...credentials,
				password: password,
			});

			addUser(data.user);
			setOpen(false);
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

	return (
		<Modal
			opened={open}
			onClose={() => setOpen(false)}
			title="Editar Usuario"
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
						placeholder="Ingrese su correo electrónico"
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
					placeholder="Contraseña *"
					onChange={(e) => setPassword(e.target.value)}
					required
					description="La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
					error={!passwordValid}
				/>
				<PasswordInput
					id="confirmPassword"
					placeholder="Confirmar contraseña *"
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					error={
						confirmPassword !== "" &&
						password !== confirmPassword &&
						"Las contraseñas no coinciden"
					}
				/>

				<TextInput
					placeholder="Dirección *"
					name="address"
					onChange={handleChange}
					required
				/>

				<Group grow>
					<Select
						name="region"
						placeholder="Seleccione región"
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
				<Select
					name="role"
					label="Rol"
					value={credentials.role}
					data={roleOptions}
					placeholder="Seleccione un rol"
					onChange={(value) =>
						setCredentials({ ...credentials, role: value })
					}
					required
					error={formError.role && "Seleccione un rol"}
				/>
				<Group style={{ marginTop: "15px" }} position="right">
					<Button type="submit">Guardar</Button>
					<Button color="red" onClick={() => setOpen(false)}>
						Cancelar
					</Button>
				</Group>
			</form>
		</Modal>
	);
}

export default NewUser;
