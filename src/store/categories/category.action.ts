import { DocumentData } from 'firebase/firestore';

import { createAction } from '../../utils/reducer/reducer.utils';
import {
	CATEGORY_ACTION_TYPES,
	SetCategoriesActionFailed,
	SetCategoriesActionStart,
	SetCategoriesActionSuccess,
} from './category.types';

export const fetchCategoriesStart = (): SetCategoriesActionStart =>
	createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, null);

export const fetchCategoriesSuccess = (
	categoriesArray: DocumentData[]
): SetCategoriesActionSuccess =>
	createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, {
		categoriesArray,
	});

export const fetchCategoriesFailed = (
	error: Error
): SetCategoriesActionFailed =>
	createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, { error });
