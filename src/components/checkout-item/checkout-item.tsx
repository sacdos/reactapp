import { useDispatch, useSelector } from 'react-redux';

import {
	clearItemFromCart,
	removeItemFromCart,
	addItemToCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { ItemInCart } from '../../store/cart/cart.types';

import {
	CheckoutItemContainer,
	ImageContainer,
	Image,
	Item,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
} from './checkout-item.styles';

interface AppProps<T> {
	item: T;
}

const CheckoutItem: React.FC<AppProps<ItemInCart>> = ({ item }) => {
	const dispatch = useDispatch();
	const { name, imageUrl, price, quantity } = item;

	const cartItems = useSelector(selectCartItems);

	const deleteItemHandler = () => dispatch(clearItemFromCart(cartItems, item));
	const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));
	const addItemHandler = () => dispatch(addItemToCart(cartItems, item));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<Image src={imageUrl} alt={name} />
			</ImageContainer>
			<Item>{name}</Item>
			<Quantity>
				<div className="arrow" onClick={removeItemHandler}>
					&#10094;
				</div>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<Item>{price}</Item>
			<RemoveButton>
				<span onClick={deleteItemHandler}>&#10005;</span>
			</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
