import { DocumentData } from 'firebase/firestore';
import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from './category.action';

import { CATEGORY_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
	try {
		// call transforme la fonction passée en argument en "effect"
		// Un effect est ensuite fourni à redux-saga pour être exécuté
		// à la manière d'une promesse
		const categoriesArray: DocumentData[] = yield call(
			getCategoriesAndDocuments
		);
		// put permet de dispatcher une action
		yield put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		if (error instanceof Error) yield put(fetchCategoriesFailed(error));
	}
}

export function* onFetchCategories() {
	// On reçoit les actions avec "take".
	// takeLatest ne garde que la dernière action créée du type qu'il écoute
	yield takeLatest(
		CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	// all() exécute la totalité des arguments avant de passer à la ligne suivante
	yield all([call(onFetchCategories)]);
}
