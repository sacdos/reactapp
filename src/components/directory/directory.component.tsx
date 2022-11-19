import React, { ReactElement } from 'react';

import { CategoriesContainer } from './directory.styles';
import DirectoryItem from '../directory-item/directory-item.component';
import categories from '../data/categories.json';

const Directory = (): ReactElement => (
	<CategoriesContainer>
		{categories.map((category) => (
			<DirectoryItem key={category.id} category={category} />
		))}
	</CategoriesContainer>
);

export default Directory;
