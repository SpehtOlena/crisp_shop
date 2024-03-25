import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Space, Typography, List } from 'antd';
import Button from '../../components/Button/Button';
import { CheckOutlined, HeartOutlined } from '@ant-design/icons';
import Counter from '../../components/Counter/Counter';
import ColorBox from '../../components/ColorBox/ColorBox';
import SizesContainer from '../../components/SizesContainer/SizesContainer';
import CollapseBox from '../../components/CollapseBox/CollapseBox';
import { addProductToShoppingCart } from '../../redux/actions';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const description = {
	about_product: 'Cool off this summer in the Mini Ruffle Smocked Tank Top from our very own LA Hearts. This tank features a smocked body, adjustable straps, scoop neckline, ruffled hems, and a cropped fit.',
	advantages: [
		"Smocked body",
		"Adjustable straps",
		"Scoop neckline",
		"Ruffled hems",
		"Cropped length",
		" Model is wearing a small",
		"100% rayon",
		" Machine washable",
	],
	shipping: 'We offer Free Standard Shipping for all orders over $75 to the 50 states and the District of Columbia. The minimum order value must be $75 before taxes, shipping and handling. Shipping fees are non-refundable.\n \nPlease allow up to 2 business days (excluding weekends, holidays, and sale days) to process your order.\n \nProcessing Time + Shipping Time = Delivery Time'
}

const ProductPage = () => {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const [counterValue, setCounterValue] = useState(1);
	const [sizesState, setSizesState] = useState([]);
	const [activeImage, setActiveImage] = useState('');
	const products = useSelector(state => state.products.data)
	const product = useSelector(state => state.products.data?.filter(value => parseInt(value.id) === parseInt(productId))[0])
	useEffect(() => {
		window.scrollTo(0, 0);
		setActiveImage(`${product.photo}1 ?set=set3`)
	}, [product])
	return (
		<div className={'product-page-container'}>
			{
				!!product &&
				<div className={'product-card-container'}>
					<Row justify={'space-between'}>
						<Col span={11}>
							<Row>
								<Col span={4}>
									<Space direction={'vertical'} size={'middle'}>
										<img onClick={() => setActiveImage(`${product.photo}1 ?set=set3`)} src={`${product.photo}1 ?set=set3`} alt="" style={{ width: "100%", cursor: "pointer" }} />
										<img onClick={() => setActiveImage(`${product.photo}2 ?set=set3`)} src={`${product.photo}2 ?set=set3`} alt="" style={{ width: "100%", cursor: "pointer" }} />
										<img onClick={() => setActiveImage(`${product.photo}3 ?set=set3`)} src={`${product.photo}3 ?set=set3`} alt="" style={{ width: "100%", cursor: "pointer" }} />
									</Space>
								</Col>
								<Col span={20}>
									<img src={activeImage} alt={product.name} style={{ width: "100%" }} />
								</Col>
							</Row>
						</Col>
						<Col span={12} className={'product-info'}>
							<Space direction={'vertical'} style={{ width: "100%" }} size={'large'}>
								<p className={'product-brand'}>{product.brand.toUpperCase()}</p>
								<Typography.Title level={1}>{product.name}</Typography.Title>
								<Text strong>{(`Select Color`).toUpperCase()}</Text>
								<Space>
									{
										product.color.map(value => <ColorBox key={value} color={{ value: value, active: false }} disabled />)
									}
								</Space>
								<Text strong>{(`Select size (Inches)`).toUpperCase()}</Text>
								<Space>
									<SizesContainer dataProductPage={product.size} sizesState={sizesState} setSizesState={setSizesState} />
								</Space>
								<Row >
									<Col span={8}>
										<Space direction={'vertical'}>
											<Text strong>{'quantity'.toUpperCase()}</Text>
											<div>
												<Counter counterValue={counterValue} setCounterValue={setCounterValue} />
											</div>
										</Space>
									</Col>
									<Col span={12}>
										<Space direction={'vertical'}>
											<Text strong>{'price total'.toUpperCase()}</Text>
											<Typography.Title level={3}>{(counterValue * product.price).toFixed(2)} EUR</Typography.Title>
										</Space>
									</Col>
								</Row>
								<Space align={'end'}>
									<Button onClick={() => { dispatch(addProductToShoppingCart(product, counterValue)) }} type={'primary'}>{'Add to bag'.toUpperCase()}</Button>
									<Button type={'icon'} icon={<HeartOutlined />}>{'Save'.toUpperCase()}</Button>
								</Space>
								<Space className={'product-tag'} size={'middle'}>
									<p><span><CheckOutlined style={{ marginRight: 6, fontSize: '18px', color: "#3F3F3F" }} /></span>Free shipping</p>
									<p><span>Product code:</span> RFKK1024</p>
									<p><span>TAGS:</span> NEW arrivals, Top women</p>
								</Space>
							</Space>
						</Col>
					</Row >
					<Row className={'product-detail-information'} justify={'center'}>
						<Col span={24}>
							<CollapseBox description={description} title={'Details'} />
							<CollapseBox description={description} title={'Other information'} />
							<CollapseBox description={description} title={'Another tab	'} />
						</Col>
					</Row>
				</div>
			}
			<Row className={'similar-products-container'}>
				<h4 className={'similar-products-title'}>You May Also Like</h4>
				<List
					position={'bottom'}
					style={{ width: '100%' }}
					pagination={{
						position: 'top',
						defaultPageSize: 5,
						simple: true,
						total: 10,
						responsive: true
					}}
					grid={{
						gutter: 16,
						column: 5,
					}}

					gutter={100}
					dataSource={products}
					renderItem={(value, index) => (
						<List.Item>
							<Link to={`/shop/${value.id}`}>
								<ProductCard key={index} value={value} index={index} />
							</Link>
						</List.Item>
					)}
				/>
			</Row>
		</div >
	)
}
export default ProductPage