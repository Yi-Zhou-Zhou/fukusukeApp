import { createContext, useReducer, useEffect } from "react";
import OrderReducer from "./OrderReducer";
import axios from "axios";
import { orderApi } from "../../api/Api";

const defaultState = [];

export const OrderContext = createContext(defaultState);

export const OrderProvider = ({ children }) => {
	const [orders, dispatch] = useReducer(OrderReducer, defaultState);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${orderApi}/`, {
					headers: {
						"x-auth-token": localStorage.getItem("token"),
					},
				});

				setOrders(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProducts();
	}, []);

	const setOrders = (orders) => {
		dispatch({
			type: "SET_ORDERS",
			payload: orders,
		});
	};

	return (
		<OrderContext.Provider
			value={{
				orders,
				setOrders,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
