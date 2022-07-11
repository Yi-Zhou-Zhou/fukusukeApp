import React, { useContext, useState } from "react";
import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { UserContext } from "../../context/user/UserContext";
import axios from "axios";
import { userApi } from "../../api/Api";

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
	});

	const roleOptions = [
		{ value: "admin", label: "Administrador" },
		{ value: "client", label: "Cliente" },
		{ value: "delivery", label: "Encargado de despacho" },
		{ value: "cashier", label: "Cajero" },
	];

	const handleUpdate = async () => {
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
			<form className="form">
				<TextInput
					name="name"
					label="Nombre"
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				<TextInput
					name="email"
					label="Correo Electrónico"
					value={data.email}
					onChange={(e) =>
						setData({ ...data, email: e.target.value })
					}
				/>
				<TextInput
					name="phone"
					label="Celular"
					value={data.phone}
					onChange={(e) =>
						setData({ ...data, phone: e.target.value })
					}
				/>
				<TextInput
					name="run"
					label="Rut"
					value={data.run}
					onChange={(e) => setData({ ...data, run: e.target.value })}
				/>
				<Select
					name="role"
					label="Rol"
					value={data.role}
					data={roleOptions}
					onChange={(value) => setData({ ...data, role: value })}
				/>
			</form>
			<Group style={{ marginTop: "15px" }} position="right">
				<Button onClick={handleUpdate}>Guardar</Button>
				<Button color="red" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
			</Group>
		</Modal>
	);
}

export default EditUser;
