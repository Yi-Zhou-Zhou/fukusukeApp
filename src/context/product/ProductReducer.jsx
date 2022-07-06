export const ProductReducer = (state, action) => {
	switch (action.type) {
		case "SET_PRODUCTS":
			return action.payload;
		case "UPDATE_PRODUCT":
			return state.map((product) => {
				if (product._id === action.payload._id) {
					return action.payload;
				}
				return product;
			});
		case "DELETE_PRODUCT":
			return state.filter((product) => product._id !== action.payload);
		case "ADD_PRODUCT":
			return [...state, action.payload];
		default:
			return state;
	}
};

export default ProductReducer;
