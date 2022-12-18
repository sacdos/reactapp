import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';
import { Categories } from './category.types';

const selectCategoryReducer = (state: RootState) => state.categories;

const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) =>
		categories.reduce<Categories>((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);
