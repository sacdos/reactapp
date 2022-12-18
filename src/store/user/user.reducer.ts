import { User } from 'firebase/auth';

import { USER_ACTION_TYPES, Nullable, SetCurrentUser } from './user.types';

interface UserState {
	currentUser: Nullable<User>;
}

const INITIAL_STATE = {
	currentUser: null,
};

export const userReducer = (
	state: UserState = INITIAL_STATE,
	action: SetCurrentUser
): UserState => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload.user,
			};
		default:
			return state;
	}
};
