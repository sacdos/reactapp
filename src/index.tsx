import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import { UserProvider } from './contexts/user.context';

import App from './App';
import { CategoriesProvider } from './contexts/categories.context';
import { DropdownProvider } from './contexts/dropdown.context';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<CategoriesProvider>
					<DropdownProvider>
						<App />
					</DropdownProvider>
				</CategoriesProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);
