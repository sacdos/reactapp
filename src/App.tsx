import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User } from 'firebase/auth';

import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Auth from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';
import { Nullable } from './store/user/user.types';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user: Nullable<User>) => {
			if (user) createUserDocumentFromAuth(user);
			dispatch(setCurrentUser(user));
		});
		return unsubscribe;
	}, []);
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="auth" element={<Auth />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
