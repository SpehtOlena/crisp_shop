import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/reset.css'
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ConfigProvider } from 'antd';
import configTheme from './styles/configTheme';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<ConfigProvider theme={configTheme}>
			<RouterProvider router={routes} />
		</ConfigProvider>
	</Provider>

);
