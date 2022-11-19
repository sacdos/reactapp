import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrownLogo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				<CartDropdown />
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
