import React, { createContext, useReducer } from 'react';

import { Product } from '../contexts/categories.context';
import { createAction } from '../utils/reducer/reducer.utils';

export interface ItemInCart extends Product {
	quantity: number;
}

interface ContextProps {
	open: boolean;
	setOpen: (newOpen?: boolean) => void;
	cartItems: ItemInCart[];
	cartCount: number;
	cartTotal: number;
	addItemToCart: (productToAdd: Product) => void;
	removeItemFromCart: (productToAdd: Product) => void;
	deleteItemFromCart: (productToAdd: Product) => void;
}

export const DropdownContext = createContext<ContextProps>({
	open: false,
	setOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	deleteItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

enum CART_ACTION_TYPES {
	SET_CART_ITEMS = 'set_cart_items',
	OPEN_CLOSE = 'open_close',
}

interface cartState {
	cartCount: number;
	cartTotal: number;
	cartItems: ItemInCart[];
	open: boolean;
}

interface cartAction {
	type: CART_ACTION_TYPES;
	payload: Partial<cartState>;
}

const INITIAL_STATE = {
	cartCount: 0,
	cartTotal: 0,
	cartItems: [],
	open: false,
};

const cartReducer = (state: cartState, action: cartAction) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.OPEN_CLOSE:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in CartReducer`);
	}
};

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
const deleteCartItem = (
	cartItems: ItemInCart[],
	productToDelete: Product
): ItemInCart[] => {
	return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

interface AppProps {
	children: React.ReactNode;
}

export const DropdownProvider: React.FC<AppProps> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const { cartItems, cartCount, cartTotal, open } = state;

	const updateCartItemsReducer = (newCartItems: ItemInCart[]) => {
		const newCartCount = newCartItems.reduce(
			(prev, item) => prev + item.quantity,
			0
		);
		const newCartTotal = newCartItems.reduce(
			(prev, item) => prev + item.quantity * item.price,
			0
		);
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartCount: newCartCount,
				cartTotal: newCartTotal,
				cartItems: newCartItems,
			})
		);
	};

	const setOpen = (openParam?: boolean) => {
		const newOpen = typeof openParam === 'boolean' ? openParam : !open;
		dispatch(createAction(CART_ACTION_TYPES.OPEN_CLOSE, { open: newOpen }));
	};

	const addItemToCart = (productToAdd: Product) => {
		updateCartItemsReducer(addCartItem(cartItems, productToAdd));
	};
	const removeItemFromCart = (cartItemToRemove: Product) => {
		updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
	};
	const deleteItemFromCart = (cartItemToDelete: Product) => {
		updateCartItemsReducer(deleteCartItem(cartItems, cartItemToDelete));
	};

	const value = {
		open,
		setOpen,
		cartItems,
		cartCount,
		cartTotal,
		addItemToCart,
		removeItemFromCart,
		deleteItemFromCart,
	};
	return (
		<DropdownContext.Provider value={value}>
			{children}
		</DropdownContext.Provider>
	);
};
