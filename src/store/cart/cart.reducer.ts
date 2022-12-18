import {
	CART_ACTION_TYPES,
	ItemInCart,
	SetCartItems,
	SetIsCartOpen,
} from './cart.types';

interface CartState {
	cartItems: ItemInCart[];
	isCartOpen: boolean;
}

export const CART_INITIAL_STATE = {
	cartItems: [],
	isCartOpen: false,
};

export const cartReducer = (
	state: CartState = CART_INITIAL_STATE,
	action: SetCartItems | SetIsCartOpen
): CartState => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload.cartItems,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload.isCartOpen,
			};
		default:
			return state;
	}
};
