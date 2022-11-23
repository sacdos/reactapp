import { useContext } from 'react';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

import { DropdownContext } from '../../contexts/dropdown.context';

const CartIcon = () => {
	const { setOpen, cartCount } = useContext(DropdownContext);
	const handleClick = () => setOpen();
	return (
		<CartIconContainer onClick={handleClick}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
