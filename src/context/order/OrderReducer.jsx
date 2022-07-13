export const OrderReducer = (state, action) => {
	switch (action.type) {
		case "SET_ORDERS":
			return action.payload;
		case "ADD_ORDER":
			return [...state, action.payload];
		case "UPDATE_ORDER":
			return state.map((order) => {
				if (order._id === action.payload._id) {
					return action.payload;
				}
				return order;
			});
		default:
			return state;
	}
};


export default OrderReducer;