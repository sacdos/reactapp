import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DropdownContext } from '../../contexts/dropdown.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
	const { open, cartItems } = useContext(DropdownContext);
	const navigate = useNavigate();
	const goToCheckoutHandler = () => navigate('/checkout');
	if (!open) return null;
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
