import { DocumentData } from 'firebase/firestore';
import { Action } from 'redux';

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

export enum CATEGORY_ACTION_TYPES {
	FETCH_CATEGORIES_START = 'category/fetch_categories_start',
	FETCH_CATEGORIES_SUCCESS = 'category/fetch_categories_success',
	FETCH_CATEGORIES_FAILED = 'category/fetch_categories_failed',
}

export interface SetCategoriesActionStart
	extends Action<typeof CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START> {
	payload: null;
}

export interface SetCategoriesActionSuccess
	extends Action<typeof CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS> {
	payload: { categoriesArray: DocumentData[] };
}

export interface SetCategoriesActionFailed
	extends Action<typeof CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED> {
	payload: { error: Error };
}
