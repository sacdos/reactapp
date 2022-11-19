import { FormEvent, useState } from 'react';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	isUserCredential,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer, H2 } from './sign-up-form.styles';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] =
		useState<typeof defaultFormFields>(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = ({
		currentTarget: { name, value },
	}: FormEvent<HTMLInputElement>) => {
		setFormFields((s) => ({ ...s, [name]: value }));
	};

	const resetFormFields = () => setFormFields(defaultFormFields);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (password !== confirmPassword) return;
		try {
			const res = await createAuthUserWithEmailAndPassword(email, password);
			if (isUserCredential(res)) {
				const { user } = res;
				await createUserDocumentFromAuth(user, {
					displayName,
				});
				resetFormFields();
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				if (error.message.includes('auth/email-already-in-use'))
					alert('User already exists');
			}
		}
	};

	return (
		<SignUpContainer>
			<H2>Don't have account ?</H2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					required
					type="text"
					onChange={handleChange}
					name="displayName"
					value={displayName}
					label="Display Name"
				/>
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
				<FormInput
					required
					type="password"
					onChange={handleChange}
					name="confirmPassword"
					value={confirmPassword}
					label="Confirm Password"
				/>
				<Button>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
