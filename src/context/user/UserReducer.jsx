export const UserReducer = (state, action) => {
	switch (action.type) {
		case "SET_USERS":
			return action.payload;
		case "ADD_USER":
			return [...state, action.payload];
		case "UPDATE_USER":
			return state.map((user) => {
				if (user._id === action.payload._id) {
					return action.payload;
				} else {
					return user;
				}
			});
		case "DELETE_USER":
			return state.filter((user) => user._id !== action.payload);
		default:
			return state;
	}
};

export default UserReducer;
