import { createContext, useReducer, useEffect } from "react";
import ProductReducer from "./ProductReducer";
import axios from "axios";
import { productApi } from "../../api/Api";

const defaultState = [];

export const ProductContext = createContext(defaultState);

export const ProductProvider = ({ children }) => {
	const [products, dispatch] = useReducer(ProductReducer, defaultState);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${productApi}/`, {
					headers: {
						"x-auth-token": localStorage.getItem("token"),
					},
				});

				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProducts();
	}, []);

	const setProducts = (products) => {
		dispatch({
			type: "SET_PRODUCTS",
			payload: products,
		});
	};

	const updateProduct = async (product) => {
		try {
			const response = await axios.put(productApi, product, {
				headers: {
					"x-auth-token": localStorage.getItem("token"),
				},
			});

			dispatch({
				type: "UPDATE_PRODUCT",
				payload: response.data.updatedProduct,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProduct = async (_id) => {
		try {
			await axios.delete(productApi, {
				headers: {
					"x-auth-token": localStorage.getItem("token"),
				},
				data: { _id },
			});

			dispatch({
				type: "DELETE_PRODUCT",
				payload: _id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const addProduct = async (product) => {
		try {
			const response = await axios.post(productApi, product, {
				headers: {
					"x-auth-token": localStorage.getItem("token"),
				},
			});
			dispatch({
				type: "ADD_PRODUCT",
				payload: response.data.product,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				setProducts,
				updateProduct,
				deleteProduct,
				addProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
