import { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";
import { userApi } from "../../api/Api";

const defaultState = [];

export const UserContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${userApi}/`, {
					headers: {
						"x-auth-token": localStorage.getItem("token"),
					},
				});
				setUsers(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUsers();
	}, []);

	const [users, dispatch] = useReducer(UserReducer, defaultState);

	const setUsers = (users) => {
		dispatch({
			type: "SET_USERS",
			payload: users,
		});
	};

	const addUser = (user) => {
		dispatch({
			type: "ADD_USER",
			payload: user,
		});
	}

	const updateUser = (user) => {
		dispatch({
			type: "UPDATE_USER",
			payload: user,
		});
	}

	const deleteUser = (user) => {
		dispatch({
			type: "DELETE_USER",
			payload: user,
		});
	}

	return (
		<UserContext.Provider
			value={{
				users,
				setUsers,
				addUser,
				updateUser,
				deleteUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
