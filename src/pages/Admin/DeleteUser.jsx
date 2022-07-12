import React, { useContext, useState } from "react";
import { Modal, Group, Button } from "@mantine/core";
import { UserContext } from "../../context/user/UserContext";
import { userApi } from "../../api/Api";
import axios from "axios";

function DeleteUser({ _id, open, setOpen }) {
	const { users, deleteUser } = useContext(UserContext);
	const user = users.find((user) => user._id === _id);

	const handleDelete = async () => {
		try {
			// delete user in database
			const response = await axios.delete(`${userApi}/${_id}/delete`, {
				headers: {
					"x-auth-token": localStorage.getItem("token"),
				},
			});
			// delete user in context
			deleteUser(_id);
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			opened={open}
			onClose={() => setOpen(false)}
			title="Eliminar Usuario"
		>
			¿Estás seguro que deseas eliminar este usuario?
			<Group style={{ marginTop: "15px" }} position="right">
				<Button
					onClick={handleDelete}
					style={{ backgroundColor: "#ff0000", color: "#fff" }}
				>
					Eliminar
				</Button>
				<Button onClick={() => setOpen(false)}>Cancelar</Button>
			</Group>
		</Modal>
	);
}

export default DeleteUser;
