import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import {
	selectCategoriesIsLoading,
	selectCategoriesMap,
} from '../../store/categories/category.selector';
import { Product } from '../../store/categories/category.types';
import { Title, CategoryContainer } from './category.styles';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		if (typeof category === 'string') {
			setProducts(categoriesMap[category]);
		}
	}, [category, categoriesMap]);
	return (
		<>
			<Title>{category?.toUpperCase()}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</>
	);
};

export default Category;
