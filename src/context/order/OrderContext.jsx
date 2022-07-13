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

	const addOrder = async (order) => {
		try {
			const response = await axios.post(orderApi, order);
			dispatch({
				type: "ADD_ORDER",
				payload: response.data.product,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const setOrders = (orders) => {
		dispatch({
			type: "SET_ORDERS",
			payload: orders,
		});
	};

	const updateOrder = async (order) => {
		try {
			const response = await axios.put(orderApi, order);

			dispatch({
				type: "UPDATE_ORDER",
				payload: response.data.updatedOrder
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<OrderContext.Provider
			value={{
				orders,
				setOrders,
				addOrder,
				updateOrder
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
