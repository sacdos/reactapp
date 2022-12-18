import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles';
import { useSelector } from 'react-redux';
import {
	selectCartIsOpen,
	selectCartItems,
} from '../../store/cart/cart.selector';

const CartDropdown = () => {
	const isCartOpen = useSelector(selectCartIsOpen);
	const cartItems = useSelector(selectCartItems);

	const navigate = useNavigate();
	const goToCheckoutHandler = () => navigate('/checkout');
	if (!isCartOpen) return null;
	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
