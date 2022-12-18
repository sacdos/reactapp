import { useDispatch, useSelector } from 'react-redux';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

import { setIsCartOpen } from '../../store/cart/cart.action';
import {
	selectCartCount,
	selectCartIsOpen,
} from '../../store/cart/cart.selector';

const CartIcon = () => {
	const dispatch = useDispatch();
	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectCartIsOpen);

	const handleClick = () => dispatch(setIsCartOpen(!isCartOpen));
	return (
		<CartIconContainer onClick={handleClick}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
