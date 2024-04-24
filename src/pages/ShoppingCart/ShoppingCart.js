import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './ShoppingCart.css'
import { Space, Table, Col, Row, Divider } from 'antd'
import ColorBox from '../../components/ColorBox/ColorBox';
import Button from '../../components/Button/Button'
import Counter from '../../components/Counter/Counter';
import { editProductToShoppingCard } from '../../redux/actions';
import { FaPencil } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
	const [data, setData] = useState([]);
	const dispatch = useDispatch();
	const shoppingCartProducts = useSelector(state => state.shoppingCartProducts.data);
	useEffect(() => {
		setData(shoppingCartProducts)
	}, [shoppingCartProducts]);

	const columns = [
		{
			title: 'PRODUCT',
			dataIndex: "",
			key: 'product',
			render: (value) => <Space>
				<div>
					<img src={value.image} style={{ maxWidth: 100 }} alt="" />
				</div>
				<div className={'shopping-cart-product-name'}>{value.name}</div>
				<div>
					<ColorBox disabled color={{ value: value.color }} />
				</div>
			</Space>
		},
		{
			title: 'PRICE',
			dataIndex: "price",
			key: 'price',
			render: (value) => value.toFixed(2) + ' EUR'
		},
		{
			title: 'SIZE',
			dataIndex: "size",
			key: 'size'
		},
		{
			title: 'QUANTITY',
			dataIndex: '',
			key: 'quantity',
			render: (value) => {
				return <Counter counterValue={value.quantity} setCounterValue={(quantity) => {
					dispatch(editProductToShoppingCard(value, quantity))
				}} />

			}

		},
		{
			title: 'TOTAL',
			dataIndex: '',
			key: 'Total',
			render: (value) => (value.price * value.quantity).toFixed(2) + " EUR"
		},
		{
			title: '',
			dataIndex: 'address',
			key: 'address',
			render: (value) => {
				return (
					<Space>
						<div className={'icon-container'}>
							<IoMdHeartEmpty />
						</div>
						<div className={'icon-container'}>
							<FaPencil />
						</div>
						<div className={'icon-container'}>
							<CloseOutlined />
						</div>
					</Space>
				)
			}
		},
	]

	return (
		<div>
			<h1 className={'shopping-cart-title'}>Shopping Cart</h1>
			<Row justify={'space-around'}>
				<Col span={14} align={'center'}>
					<Space direction={'vertical'} size={'middle'}>
						<Table rowKey={value => value.id} dataSource={data} columns={columns} size={'large'} align={'center'} pagination={false} />
						<Space style={{ width: '100%', justifyContent: 'space-between' }}>
							<Link to={'/shop'}>
								<Button>continue shopping</Button>
							</Link>
							<Button >clear shopping cart</Button>
						</Space>
					</Space>
				</Col>
				<Col span={8} align={'center'}>
					<div className={'shopping-cart-window'}>
						<div style={{ padding: "30px 30px 0 30px" }}>
							<div className={'shopping-cart-window-container'}>
								<Row justify={"space-between"} className={'shopping-cart-window-text'}>
									<p>
										Subtotal
									</p>
									<p>
										{data.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} EUR
									</p>
								</Row>
								<Row justify={"space-between"} className={'shopping-cart-window-text'}>
									<p>
										Tax
									</p>
									<p>
										{data.reduce((sum, item) => sum + item.price * 0.2 * item.quantity, 0).toFixed(2)} EUR
									</p>
								</Row>
								<Row justify={"space-between"} className={'shopping-cart-window-main-text'}>
									<p>
										Order Total
									</p>
									<p>
										{data.reduce((sum, item) => sum + item.price * item.quantity + item.price * 0.2 * item.quantity, 0).toFixed(2)} EUR
									</p>
								</Row>
							</div>
							<Divider />
						</div>
						<p className={'shopping-cart-main-text-secondary'}>Check Out with Multiple Addresses</p>
						<Button style={{ width: '100%' }} type={"primary"}>proceed to checkout</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
};
export default ShoppingCart