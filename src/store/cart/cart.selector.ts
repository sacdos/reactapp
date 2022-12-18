import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartReducer], (cart) =>
	cart.cartItems.reduce((prev, item) => prev + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartReducer], (cart) =>
	cart.cartItems.reduce((prev, item) => prev + item.quantity * item.price, 0)
);

export const selectCartIsOpen = createSelector(
	[selectCartReducer],
	(cart) => cart.isCartOpen
);
