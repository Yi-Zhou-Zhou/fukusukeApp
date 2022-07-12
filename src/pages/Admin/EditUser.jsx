import React, { useContext, useState, useEffect, useMemo } from "react";
import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import "dayjs/locale/es-mx";
import { DatePicker } from "@mantine/dates";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import { userApi } from "../../api/Api";
import regionsData from "../../json/regiones-provincias-comunas.json";

function EditUser({ _id, open, setOpen }) {
	const { users, updateUser } = useContext(UserContext);
	const user = users.find((user) => user._id === _id);

	const [data, setData] = useState({
		_id: user._id,
		name: user.name,
		email: user.email,
		run: user.run,
		phone: user.phone,
		role: user.role,
		address: user.address,
		region: user.region,
		province: user.province,
		commune: user.commune,
		sex: user.sex,
		birthday: new Date(user.birthday),
	});

	const provinces = useMemo(() => {
		const newProvinces = regionsData.find(
			(region) => data.region === region.region
		)?.provincias;

		// clear province and commune
		setData({ ...data, province: "", commune: "" });

		if (newProvinces) return newProvinces;
		else return [];
	}, [data.region]);

	const communes = useMemo(() => {
		const newCommunes = provinces.find(
			(province) => data.province === province.name
		)?.comunas;

		// clear commune
		setData({ ...data, commune: "" });

		if (newCommunes) return newCommunes;
		else return [];
	}, [data.province]);

	const roleOptions = [
		{ value: "admin", label: "Administrador" },
		{ value: "client", label: "Cliente" },
		{ value: "delivery", label: "Encargado de despacho" },
		{ value: "cashier", label: "Cajero" },
	];

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			// update user in db
			const response = await axios.put(`${userApi}/${_id}/edit`, data, {
				headers: {
					"x-auth-token": localStorage.getItem("token"),
				},
			});
			// update user in context
			updateUser(data);
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			opened={open}
			onClose={() => setOpen(false)}
			title="Editar Usuario"
		>
			<form className="form" onSubmit={handleUpdate}>
				<Group>
					<TextInput
						name="name"
						label="Nombre"
						value={data.name}
						onChange={(e) =>
							setData({ ...data, name: e.target.value })
						}
						required
					/>
					<TextInput
						name="run"
						label="Rut"
						value={data.run}
						onChange={(e) =>
							setData({ ...data, run: e.target.value })
						}
						required
					/>
				</Group>
				<TextInput
					name="email"
					label="Correo Electrónico"
					value={data.email}
					onChange={(e) =>
						setData({ ...data, email: e.target.value })
					}
					required
				/>

				<TextInput
					name="phone"
					label="Celular"
					value={data.phone}
					onChange={(e) =>
						setData({ ...data, phone: e.target.value })
					}
					required
				/>

				<TextInput
					name="address"
					label="Dirección"
					value={data.address}
					onChange={(e) =>
						setData({ ...data, address: e.target.value })
					}
					required
				/>

				<Group grow>
					<Select
						name="region"
						label="Región"
						value={data.region}
						onChange={(value) =>
							setData({ ...data, region: value })
						}
						data={regionsData.map((region) => region.region)}
						required
					/>
					<Select
						name="province"
						label="Provincia"
						value={data.province}
						onChange={(value) =>
							setData({ ...data, province: value })
						}
						data={provinces.map((province) => province.name)}
						required
					/>
					<Select
						name="commune"
						label="Comuna"
						value={data.commune}
						onChange={(value) =>
							setData({ ...data, commune: value })
						}
						data={communes.map((commune) => commune.name)}
						required
					/>
				</Group>

				<Group grow>
					<DatePicker
						placeholder="Fecha de nacimiento *"
						name="birthday"
						locale="es-mx"
						value={data.birthday}
						onChange={(value) =>
							setData({
								...data,
								birthday: value,
							})
						}
						required
						allowFreeInput
					/>

					<Select
						name="sex"
						placeholder="Sexo"
						required
						value={data.sex}
						onChange={(value) => setData({ ...data, sex: value })}
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
					value={data.role}
					data={roleOptions}
					onChange={(value) => setData({ ...data, role: value })}
					required
				/>
				<Group position="right">
					<Button type="submit">Guardar</Button>
					<Button color="red" onClick={() => setOpen(false)}>
						Cancelar
					</Button>
				</Group>
			</form>
		</Modal>
	);
}

export default EditUser;
