import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {} from 'redux-thunk/extend-redux';

import { rootReducer } from './root-reducer';

// Ajoute la propriété __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ à l'objet global pour l'utiliser avec typescript
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

type ExcludesFalse = <T>(x: T | false) => x is T;

const middleWares = [
	process.env.NODE_ENV === 'development' && logger,
	thunk,
].filter(Boolean as any as ExcludesFalse);

const composeEnhancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);
