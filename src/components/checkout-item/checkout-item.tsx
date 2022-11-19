import { useContext } from 'react';

import { ItemInCart } from '../../contexts/dropdown.context';
import { DropdownContext } from '../../contexts/dropdown.context';

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
	const { name, imageUrl, price, quantity } = item;
	const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
		useContext(DropdownContext);

	const deleteItemHandler = () => deleteItemFromCart(item);
	const removeItemHandler = () => removeItemFromCart(item);
	const addItemHandler = () => addItemToCart(item);

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
