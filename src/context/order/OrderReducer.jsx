export const OrderReducer = (state, action) => {
	switch (action.type) {
		case "SET_ORDERS":
			return action.payload;
		default:
			return state;
	}
};


export default OrderReducer;