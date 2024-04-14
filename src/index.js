import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/reset.css'
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ConfigProvider } from 'antd';
import configTheme from './styles/configTheme';
import { Provider } from 'react-redux';
import { rrfProps, store } from './redux/store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<ConfigProvider theme={configTheme}>
				<RouterProvider router={routes} />
			</ConfigProvider>
		</ReactReduxFirebaseProvider>
	</Provider>

);
