import { Link } from 'react-router-dom';

import {
	CategoryPreviewContainer,
	Title,
	Preview,
} from './category-preview.styles';
import { Product } from '../../store/categories/category.types';
import ProductCard from '../product-card/product-card.component';

interface AppProps<T> {
	title: string;
	products: T[];
}

const CategoryPreview: React.FC<AppProps<Product>> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Title to={title}>{title.toUpperCase()}</Title>
			</h2>
			<Preview>
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
