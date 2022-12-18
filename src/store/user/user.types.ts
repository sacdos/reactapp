import { User } from 'firebase/auth';
import { Action } from 'redux';

export type Nullable<T> = T | null;

export enum USER_ACTION_TYPES {
	SET_CURRENT_USER = 'user/set_current_user',
}

export interface SetCurrentUser
	extends Action<typeof USER_ACTION_TYPES.SET_CURRENT_USER> {
	payload: {
		user: Nullable<User>;
	};
}
