import React, { useContext, useState } from "react";
import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { UserContext } from "../../context/user/UserContext";

function NewUser({ role, open, setOpen }) {
	const { users, addUser } = useContext(UserContext);

	const [data, setData] = useState({
		name: "",
		email: "",
		run: "",
		phone: "",
		role: role,
	});

	const roleOptions = [
		{ value: "admin", label: "Administrador" },
		{ value: "client", label: "Cliente" },
		{ value: "delivery", label: "Encargado de despacho" },
		{ value: "cashier", label: "Cajero" },
	];

	const handleCreate = () => {
		addUser(data);
		setOpen(false);
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
				<Button onClick={handleCreate}>Guardar</Button>
				<Button color="red" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
			</Group>
		</Modal>
	);
}

export default NewUser;
