import { ComponentPropsWithoutRef } from 'react';
import {
	BaseButton,
	GoogleSignInButton,
	InvertedButton,
} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
	base = 'base',
	google = 'google-sign-in',
	inverted = 'inverted',
}

interface AppProps extends ComponentPropsWithoutRef<'button'> {
	children: React.ReactNode;
	buttonType?: BUTTON_TYPE_CLASSES;
}

const getButton = (
	buttonType: BUTTON_TYPE_CLASSES = BUTTON_TYPE_CLASSES.base
) =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

const Button: React.FC<AppProps> = ({
	children,
	buttonType,
	...otherProps
}) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
