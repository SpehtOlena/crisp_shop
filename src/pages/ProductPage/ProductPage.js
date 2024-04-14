import { useParams, useLocation } from 'react-router-dom';
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
import ProductPagePhoto from '../../components/ProductPagePhoto/ProductPagePhoto';

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
	const location = useLocation();
	const dispatch = useDispatch();
	const [counterValue, setCounterValue] = useState(1);
	const [sizesState, setSizesState] = useState([]);
	const [selectedSizes, setSelectedSizes] = useState([]);
	const [color, setColor] = useState({});
	const [activeImage, setActiveImage] = useState('');
	const products = useSelector((state) => state.firestore.ordered.products);
	const [product, setProduct] = useState();

	useEffect(() => {
		if (product !== undefined) {
			window.scrollTo(0, 0);
			setColor({ value: product?.colors[0] });
			setSelectedSizes([product.sizes[0]]);
		}
	}, [product]);

	useEffect(() => {
		if (products !== undefined) {
			setProduct(products.find((value) => value.id === productId));
		}
	}, [products, location]);

	const handleAddToCart = () => {
		dispatch(addProductToShoppingCart(product, counterValue, color.value, selectedSizes[0]));
	};
	return (
		<div className={'product-page-container'}>
			{
				product &&
				<div className={'product-card-container'}>
					<Row justify={'space-between'}>
						<Col span={11}>
							<ProductPagePhoto
								colors={product.colors}
								images={product.images}
								color={color}
								setColor={setColor}
							/>
						</Col>
						<Col span={12} className={'product-info'}>
							<Space direction={'vertical'} style={{ width: "100%" }} size={'large'}>
								<p className={'product-brand'}>{product.brand.toUpperCase()}</p>
								<Typography.Title level={1}>{product.name}</Typography.Title>
								<Text strong>{(`Select Color`).toUpperCase()}</Text>
								<Space>
									{
										product.colors.map(value => <ColorBox oneColor setColorsValues={setColor} colorsValues={color} key={value} color={{ value: value, active: false }} />)
									}
								</Space>
								<Text strong>{(`Select size (Inches)`).toUpperCase()}</Text>
								<Space>
									<SizesContainer dataProductPage={product.sizes} sizesState={sizesState} setSizesState={setSizesState} selectedSizes={selectedSizes}
										setSelectedSizes={setSelectedSizes} />
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
									<Button onClick={handleAddToCart} type={'primary'}>{'Add to bag'.toUpperCase()}</Button>
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