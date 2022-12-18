import { Action } from 'redux';
import { Product } from '../../store/categories/category.types';

export interface ItemInCart extends Product {
	quantity: number;
}

export enum CART_ACTION_TYPES {
	SET_CART_ITEMS = 'cart/set_cart_items',
	SET_CART_COUNT = 'cart/set_cart_count',
	SET_CART_TOTAL = 'cart/set_cart_total',
	SET_IS_CART_OPEN = 'cart/set_is_cart_open',
}

export type SetCartCount = Action<typeof CART_ACTION_TYPES.SET_CART_COUNT>;
export type SetCartTotal = Action<typeof CART_ACTION_TYPES.SET_CART_TOTAL>;
export interface SetCartItems
	extends Action<typeof CART_ACTION_TYPES.SET_CART_ITEMS> {
	payload: {
		cartItems: ItemInCart[];
	};
}
export interface SetIsCartOpen
	extends Action<typeof CART_ACTION_TYPES.SET_IS_CART_OPEN> {
	payload: {
		isCartOpen: boolean;
	};
}
