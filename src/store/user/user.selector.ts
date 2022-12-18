import { RootState } from '../root-reducer';

export const selectCurrentUser = ({ user: { currentUser } }: RootState) =>
	currentUser;
