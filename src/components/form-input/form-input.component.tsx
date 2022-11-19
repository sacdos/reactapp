import { FormEvent } from 'react';

import { FormInputLabel, Input, Group } from './form-input.styles';

interface AppProps {
	label: string;
	value: string;
	required?: boolean;
	type: string;
	name: string;
	onChange(event: FormEvent<HTMLInputElement>): void;
}

const FormInput: React.FC<AppProps> = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel shrink={otherProps.value.length}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
