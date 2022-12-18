import { DocumentData } from 'firebase/firestore';
import { ThunkAction } from 'redux-thunk';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';
import { RootState } from '../root-reducer';
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

// Typing Thunk action
type CategoriesActionAsync = ThunkAction<
	Promise<void>,
	RootState,
	undefined,
	| SetCategoriesActionStart
	| SetCategoriesActionSuccess
	| SetCategoriesActionFailed
>;

export const fetchCategoriesAsync =
	(): CategoriesActionAsync => async (dispatch) => {
		dispatch(fetchCategoriesStart());
		try {
			const categoriesArray = await getCategoriesAndDocuments();
			dispatch(fetchCategoriesSuccess(categoriesArray));
		} catch (error) {
			if (error instanceof Error) dispatch(fetchCategoriesFailed(error));
		}
	};
