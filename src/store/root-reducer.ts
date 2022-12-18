import { combineReducers } from 'redux';

import { cartReducer } from './cart/cart.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
