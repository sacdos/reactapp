import { FormEvent, useState } from 'react';
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignUpContainer, H2, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] =
		useState<typeof defaultFormFields>(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = ({
		currentTarget: { name, value },
	}: FormEvent<HTMLInputElement>) => {
		setFormFields((s) => ({ ...s, [name]: value }));
	};

	const resetFormFields = () => setFormFields(defaultFormFields);

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message.includes('auth/user-not-found'))
					alert('User not found');
				if (error.message.includes('auth/wrong-password'))
					alert('Incorrect password for email');
			}
		}
	};

	return (
		<SignUpContainer>
			<H2>Already have an account ?</H2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					required
					type="email"
					onChange={handleChange}
					name="email"
					value={email}
					label="Email"
				/>
				<FormInput
					required
					type="password"
					onChange={handleChange}
					name="password"
					value={password}
					label="Password"
				/>
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Google sign in
					</Button>
				</ButtonsContainer>
			</form>
		</SignUpContainer>
	);
};

export default SignInForm;
