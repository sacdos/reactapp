export const createAction = <T, U>(
	type: T,
	payload: U
): { type: T; payload: U } => ({ type, payload });
