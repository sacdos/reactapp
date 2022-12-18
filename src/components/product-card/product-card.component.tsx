import React from 'react';

import {
	ProductCardContainer,
	Image,
	StyledButton,
	Footer,
	Name,
	Price,
} from './product-card.styles';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { Product } from '../../store/categories/category.types';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

interface AppProps<T> {
	product: T;
}

const ProductCard: React.FC<AppProps<Product>> = ({ product }) => {
	const dispatch = useDispatch();
	const { name, price, imageUrl } = product;
	const cartItems = useSelector(selectCartItems);
	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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
