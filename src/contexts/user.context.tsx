import { User } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

//Type pour créer une valeur à partir du type générique ou bien null
type Nullable<T> = T | null;

interface ContextProps {
	currentUser: Nullable<User>;
	setCurrentUser: (user: Nullable<User>) => void;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	setCurrentUser: () => null,
});

interface AppProps {
	children: React.ReactNode;
}

enum USER_ACTION_TYPES {
	SET_CURRENT_USER = 'set_current_user',
}

interface UserState {
	currentUser: Nullable<User>;
}

interface userAction {
	type: USER_ACTION_TYPES;
	payload: Nullable<User>;
}

const INITIAL_STATE = {
	currentUser: null,
};

const userReducer = (state: UserState, action: userAction) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

export const UserProvider: React.FC<AppProps> = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const setCurrentUser = (user: Nullable<User>) => {
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
	};

	const value = { currentUser, setCurrentUser };
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) createUserDocumentFromAuth(user);
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
