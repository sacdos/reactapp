import React, { createContext, useEffect, useState } from 'react';

import { Product } from '../contexts/categories.context';

export interface ItemInCart extends Product {
	quantity: number;
}

interface ContextProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
	const [open, setOpen] = useState<boolean>(false);
	const [cartItems, setCartItems] = useState<ItemInCart[]>([]);
	const [cartCount, setCartCount] = useState<number>(0);
	const [cartTotal, setCartTotal] = useState<number>(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(prev, item) => prev + item.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(prev, item) => prev + item.quantity * item.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd: Product) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	const removeItemFromCart = (cartItemToRemove: Product) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};
	const deleteItemFromCart = (cartItemToDelete: Product) => {
		setCartItems(deleteCartItem(cartItems, cartItemToDelete));
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
