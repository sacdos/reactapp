import { DocumentData } from 'firebase/firestore';
import {
	CATEGORY_ACTION_TYPES,
	SetCategoriesActionFailed,
	SetCategoriesActionStart,
	SetCategoriesActionSuccess,
} from './category.types';

interface CategoryState {
	categories: DocumentData[];
	isLoading: boolean;
	error: null | Error;
}

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false, // loading asynchronous data
	error: null, // error fetching asynchronous data
};

const fetchCategoriesStartReducer = (
	state: CategoryState,
	action: SetCategoriesActionStart
) => {
	return { ...state, isLoading: true };
};

const fetchCategoriesSuccessReducer = (
	state: CategoryState,
	action: SetCategoriesActionSuccess
) => {
	const { categoriesArray } = action.payload;
	return {
		...state,
		categories: categoriesArray,
		isLoading: false,
	};
};

const fetchCategoriesFailed = (
	state: CategoryState,
	action: SetCategoriesActionFailed
) => {
	const { error } = action.payload;
	return {
		...state,
		error: error,
		isLoading: false,
	};
};

export const categoriesReducer = (
	state: CategoryState = CATEGORIES_INITIAL_STATE,
	action:
		| SetCategoriesActionStart
		| SetCategoriesActionSuccess
		| SetCategoriesActionFailed
): CategoryState => {
	const { type } = action;
	switch (type) {
		case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
			return fetchCategoriesStartReducer(state, action);
		case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return fetchCategoriesSuccessReducer(state, action);
		case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return fetchCategoriesFailed(state, action);
		default:
			return state;
	}
};
