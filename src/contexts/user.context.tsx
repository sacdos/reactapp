import { User } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

//Type pour créer une valeur à partir du type générique ou bien null
type Nullable<T> = T | null;

interface ContextProps {
	currentUser: Nullable<User>;
	setCurrentUser: React.Dispatch<React.SetStateAction<Nullable<User>>>;
}

export const UserContext = createContext<ContextProps>({
	currentUser: null,
	setCurrentUser: () => null,
});

interface AppProps {
	children: React.ReactNode;
}

export const UserProvider: React.FC<AppProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<Nullable<User>>(null);
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
