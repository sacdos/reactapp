import { initializeApp } from 'firebase/app';
import { NextOrObserver, User, UserCredential } from 'firebase/auth';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	UserInfo,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc, // instance de document
	getDoc, // get document data
	setDoc, // set document data
	collection, // instance de collection qui permet d'obtenir une référence à un document
	writeBatch, // Permet d'exécuter une transaction sur firebase
	query, // Objet pour requêter firestore
	getDocs, // Permet de récupérer de façon asynchrone le résultat (snapshot) d'une query ci-dessus
} from 'firebase/firestore';
import {
	Categories,
	CategoriesCollection,
} from '../../contexts/categories.context';

const firebaseConfig = {
	apiKey: 'AIzaSyDeJL-AdeAdNzoRG2rJc4OH0hW1KJqFvjw',
	authDomain: 'crwn-db-c168b.firebaseapp.com',
	projectId: 'crwn-db-c168b',
	storageBucket: 'crwn-db-c168b.appspot.com',
	messagingSenderId: '4599485285',
	appId: '1:4599485285:web:6eed8446470bcb7127c78c',
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); // Points to database created in firestore

/**
 * @var collectionKey Nom de la collection de documents à ajouter (categories...) => équivalent à une table
 * @var objectsToAdd Documents à ajouter dans la collection => équivalents à des records mais sous la forme documents qui peuvent contenir des tableaux etc
 */
export const addCollectionAndDocuments = async (
	collectionKey: string,
	objectsToAdd: CategoriesCollection[]
) => {
	// Crée une référence à la collection qui nous intéresse
	const collectionRef = collection(db, collectionKey);
	// Crée une transaction composée d'actions liées (set, remove...)
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		// Accède au document dans la collection concernée (hats, jackets...)
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
	// Référence à la collection (table) categories
	const collectionRef = collection(db, 'categories');
	// object pour requêter la collection categories
	const q = query(collectionRef);
	// Crée un snapshot de la collection categories
	const querySnapshot = await getDocs(q);
	// Création d'une structure à partir de la collection de documents récupérée ci-dessus
	const categoryMap = querySnapshot.docs.reduce<Categories>(
		(acc, docSnapshot) => {
			const { title, items } = docSnapshot.data();
			acc[title.toLowerCase()] = items;
			return acc;
		},
		{}
	);
	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth: UserInfo,
	additionalInformation = {}
) => {
	if (!userAuth) return;
	// Interroge le document identifié par userAuth.uid dans la collection users de la base db
	// On utilise l'identifiant renvoyé par google comme identifiant du document.
	// Renvoie un pointeur vers un enregistrement même s'il n'existe pas encore.
	const userDocRef = doc(db, 'users', userAuth.uid);

	// Utilise le ponteur récupéré pour obtenir un objet permttant
	// d'interagir avec ce document même s'il n'existe pas encore.
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			if (error instanceof Error)
				console.log('error creating the user', error.message);
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const isUserCredential = (elem: any): elem is UserCredential => {
	return 'user' in elem;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);
