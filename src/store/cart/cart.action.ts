import { createAction } from '../../utils/reducer/reducer.utils';

import { Product } from '../../store/categories/category.types';
import {
	CART_ACTION_TYPES,
	ItemInCart,
	SetCartItems,
	SetIsCartOpen,
} from './cart.types';

/**
 * Helper To add product x 1 to cart
 * @param cartItems
 * @param productToAdd
 * @returns
 */
const addCartItem = (
	cartItems: ItemInCart[],
	productToAdd: Product
): ItemInCart[] => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	if (existingCartItem) {
		return cartItems.map((cartItem: ItemInCart) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

/**
 * Helper to remove product x 1 from cart
 * @param cartItems
 * @param cartItemToRemove
 * @returns
 */
const removeCartItem = (
	cartItems: ItemInCart[],
	cartItemToRemove: Product
): ItemInCart[] => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);
	if (existingCartItem?.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

/**
 * Helper to delete a product from cart
 * @param cartItems
 * @param productToDelete
 * @returns
 */
const clearCartItem = (
	cartItems: ItemInCart[],
	productToDelete: Product
): ItemInCart[] => {
	return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

// Action creators must be as pure as possible

export const setIsCartOpen = (boolean: boolean): SetIsCartOpen =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, { isCartOpen: boolean });

export const addItemToCart = (
	cartItems: ItemInCart[],
	productToAdd: Product
): SetCartItems => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
		cartItems: newCartItems,
	});
};
export const removeItemFromCart = (
	cartItems: ItemInCart[],
	cartItemToRemove: Product
): SetCartItems => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
		cartItems: newCartItems,
	});
};
export const clearItemFromCart = (
	cartItems: ItemInCart[],
	cartItemToClear: Product
): SetCartItems => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
		cartItems: newCartItems,
	});
};
