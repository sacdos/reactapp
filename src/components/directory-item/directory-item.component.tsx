import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from './directory-item.styles';
import categories from '../data/categories.json';

/**
 * Récupération du type de variable du premier élément du tableau renvoyé dans le fichier json
 * pour décrire le type Category (permet d'avoir un type adapté à la réalité de la donnée exportée)
 */
type Category = typeof categories[0];

interface AppProps<T> {
	category: T;
}

const DirectoryItem: React.FC<AppProps<Category>> = ({
	category: { title, imageUrl, route },
}): ReactElement => {
	const navigate = useNavigate();
	const onNavigateHandler = () => navigate(route);
	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
