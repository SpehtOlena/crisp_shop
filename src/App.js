import './App.css';
import { Layout, Menu, Space } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import { Link, Outlet } from 'react-router-dom';
import { LuHeart } from "react-icons/lu";
import Logo from "./assets/Logo.png"
import ShopCardComponent from './components/ShopCardComponent/ShopCardComponent';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { axiosRequest } from './redux/actions';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(axiosRequest('', 'products', ''))
	}, [])

	const menuItems = [
		{
			label: <Link to={'/home'}>{'home'.toUpperCase()}</Link>,
			key: "home"
		},
		{
			label: <Link to={'/shop'}>{'shop'.toUpperCase()}</Link>,
			key: "shop"
		},
		{
			label: <Link to={'/blog'}>{'blog'.toUpperCase()}</Link>,
			key: "blog"
		},
		{
			label: <Link to={'/sale'}>{'sale'.toUpperCase()}</Link>,
			key: "sale"
		},
		{
			label: <Link to={'/contact_us'}>{'contact us'.toUpperCase()}</Link>,
			key: "contact_us"
		},
	]

	return (
		<Layout className={'App'}>
			<Header className={'header-container'}>
				<img src={Logo} alt="crisp logo" />
				<Menu items={menuItems} mode={'horizontal'} />
				<Space>
					<span>
						{'Sing in'.toUpperCase()}
					</span>
					<span>
						{'create an account'.toUpperCase()}
					</span>
				</Space>
				<div className={'header-shop-box'}>
					<LuHeart style={{ 'fontSize': 22 }} />
					<ShopCardComponent />
				</div>
			</Header>
			<Content className={'content-container'}>
				<Outlet />
			</Content>
			<Footer>
				footer
			</Footer>
		</Layout>
	);
}

export default App;
