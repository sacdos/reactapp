import { useEffect } from 'react';

import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
	selectCartItems,
	selectCartTotal,
} from '../../store/cart/cart.selector';

const Checkout = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

	useEffect(() => {
		dispatch(setIsCartOpen(false));
	}, []);

	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} item={cartItem} />
			))}
			<span className="total">{`Total: €${cartTotal}`}</span>
		</div>
	);
};

export default Checkout;
