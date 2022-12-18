import { User } from 'firebase/auth';

import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES, Nullable, SetCurrentUser } from './user.types';

export const setCurrentUser = (user: Nullable<User>): SetCurrentUser => {
	return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, { user: user });
};
