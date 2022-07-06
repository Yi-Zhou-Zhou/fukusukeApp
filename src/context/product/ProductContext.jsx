import { createContext, useReducer } from "react";
import ProductReducer from "./ProductReducer";

const defaultState = [];

export const ProductContext = createContext(defaultState);

export const ProductProvider = ({ children }) => {
	const [products, dispatch] = useReducer(ProductReducer, defaultState);

	const setProducts = (products) => {
		dispatch({
			type: "SET_PRODUCTS",
			payload: products,
		});
	};

	const updateProduct = (product) => {
		dispatch({
			type: "UPDATE_PRODUCT",
			payload: product,
		});
	};

	const deleteProduct = (id) => {
		dispatch({
			type: "DELETE_PRODUCT",
			payload: id,
		});
	};

	const addProduct = (product) => {
		dispatch({
			type: "ADD_PRODUCT",
			payload: product,
		});
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
