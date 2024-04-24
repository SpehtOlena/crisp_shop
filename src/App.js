import './App.css';
import { Divider, Layout, Menu, Row, Space, Col, Typography, Input, Affix, FloatButton } from 'antd';
import { Header, Content, Footer } from 'antd/es/layout/layout';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LuHeart } from "react-icons/lu";
import Logo from "./assets/Logo.png"
import ShopCardComponent from './components/ShopCardComponent/ShopCardComponent';
import { useEffect } from 'react';
import { CheckOutlined, SearchOutlined, FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import Button from "./components/Button/Button"
import { useFirestoreConnect } from 'react-redux-firebase';


function App() {
	const location = useLocation();
	const navigate = useNavigate();

	useFirestoreConnect(() => [
		{ collection: 'products' }
	])
	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/home')
		}
	}, [location, navigate])

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
			<Affix>
				<Header className={'header-container'}>
					<Link to={'/home'} className={'header-logo'}>
						<img src={Logo} alt="crisp logo" />
					</Link>
					<div className={'header-menu'}>
						<Menu items={menuItems} mode={'horizontal'} selectedKeys={[location.pathname.split('/')[1]]} />
						<Link to={'/search'} className={'header-search'}>
							<SearchOutlined />
							Search
						</Link>
					</div>
					<Space size={'large'}>
						<Link to={'/login'}>
							{'Sing in'.toUpperCase()}
						</Link>
						<Link to={'/registration'}>
							{'create an account'.toUpperCase()}
						</Link>
					</Space>
					<div className={'header-shop-box'}>
						<LuHeart style={{ 'fontSize': 22 }} />
						<Link to={'/shopping_cart'}>
							<ShopCardComponent />
						</Link>
					</div>
				</Header>
			</Affix>
			<Content className={'content-container'}>
				<Outlet />
			</Content>
			<div className={'pre-footer'}>
				<Space>
					<CheckOutlined />
					Duties and Taxes Guaranteed
				</Space>
				<Space>
					<CheckOutlined />
					Free Express Shipping
				</Space>
				<Space>
					<CheckOutlined />
					Customer Love
				</Space>
				<Space>
					<CheckOutlined />
					Easy Returns
				</Space>
				<Space>
					<CheckOutlined />
					Secure Payment
				</Space>
			</div>
			<Footer className={'app-footer'}>
				<Row justify={'space-between'}>
					<Col>
						<Link to={'/home'} className={'header-logo'}>
							<img src={Logo} alt="crisp logo" />
						</Link>
					</Col>
					<Col>
						<Typography.Title level={5}>
							features
						</Typography.Title>
						<ul>
							<li>men</li>
							<li>Women</li>
							<li>boys</li>
							<li>girls</li>
							<li>new arrivals</li>
							<li>shoes</li>
							<li>clothes</li>
							<li>accessories</li>
						</ul>
					</Col>
					<Col>
						<Typography.Title level={5}>
							Menu
						</Typography.Title>
						<ul>
							<Link to={'/about_us'}><li>About us</li></Link>
							<Link to={'/contact_us'}><li>contact us</li></Link>
							<Link to={'/my_account'}><li>my account</li></Link>
							<Link to={'/orders_history'}><li>orders history</li></Link>
							<Link to={'/my_wishlist'}><li>my wishlist</li></Link>
							<Link to={'/blog'}><li>blog</li></Link>
							<Link to={'/login'}><li>login</li></Link>

						</ul>
					</Col>
					<Col>
						<Typography.Title level={5}>contact us</Typography.Title>
						<ul>
							<li>
								<p>Address: </p>
								123 STREET NAME, CITY, ENGLAND
							</li>
							<li>
								<p>Phone: </p>
								(123) 456-7890
							</li>
							<li>
								<p>email: </p>
								MAIL@EXAMPLE.COM
							</li>
							<li>
								<p>working days/hours </p>
								MON - SUN / 9:00AM - 8:00PM
							</li>
						</ul>
					</Col>
					<Col>
						<Typography.Title level={5}>
							follow us
						</Typography.Title>
						<ul>
							<li><FacebookFilled /> FACEBOOK</li>
							<li><TwitterSquareFilled /> TWITTER</li>
							<li><InstagramFilled /> INSTAGRAM</li>

						</ul>
					</Col>
					<Col>
						<Typography.Title level={5}>
							join us
						</Typography.Title>
						<ul>
							<li>
								Subscribe to our newsletters
							</li>
							<li>
								<Input placeholder={'Email Address'} id="name01" />
							</li>
							<li>
								<Button type={'w100'}>Subscribe!</Button>
							</li>
						</ul>
					</Col>
				</Row>
				<Divider />
				<Row>

				</Row>
			</Footer>
			<FloatButton.BackTop />
		</Layout>
	);
}

export default App;
