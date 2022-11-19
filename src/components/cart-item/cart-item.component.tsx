import {
	CartItemContainer,
	CartImage,
	ItemDetails,
	Name,
} from './cart-item.styles';

import { ItemInCart } from '../../contexts/dropdown.context';

interface AppProps<T> {
	cartItem: T;
}

const CartItem: React.FC<AppProps<ItemInCart>> = ({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem;
	return (
		<CartItemContainer>
			<CartImage src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<Name>{name}</Name>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
