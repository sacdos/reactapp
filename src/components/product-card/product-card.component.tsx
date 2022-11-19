import React, { useContext } from 'react';

import { DropdownContext } from '../../contexts/dropdown.context';

import {
	ProductCardContainer,
	Image,
	StyledButton,
	Footer,
	Name,
	Price,
} from './product-card.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { Product } from '../../contexts/categories.context';

interface AppProps<T> {
	product: T;
}

const ProductCard: React.FC<AppProps<Product>> = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(DropdownContext);
	const addProductToCart = () => addItemToCart(product);
	return (
		<ProductCardContainer>
			<Image src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<StyledButton
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to cart
			</StyledButton>
		</ProductCardContainer>
	);
};

export default ProductCard;
