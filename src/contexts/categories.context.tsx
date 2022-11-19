import { createContext, useEffect, useState } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export interface Product {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
}

export interface Categories {
	[key: string]: Product[];
}

export interface CategoriesCollection {
	title: string;
	items: Product[];
}

// type Nullable<T> = T[] | null;

interface ContextProps {
	categoriesMap: Categories;
	setCategoriesMap: React.Dispatch<React.SetStateAction<Categories>>;
}

export const CategoriesContext = createContext<ContextProps>({
	categoriesMap: {},
	setCategoriesMap: () => null,
});

interface AppProps {
	children: React.ReactNode;
}

export const CategoriesProvider: React.FC<AppProps> = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState<Categories>({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	const value = { categoriesMap, setCategoriesMap };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
