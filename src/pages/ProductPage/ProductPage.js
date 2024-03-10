import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './ProductPage.css';
import { useSelector } from 'react-redux';
import { Row, Col, Space, Typography, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import InputCounter from '../../components/ShopCardComponent/InputCounter/InputCounter';

const ProductPage = () => {
	const [inputCountValue, setInputCountValue] = useState(1);
	const { productId } = useParams()
	const product = useSelector(state => state.products.data.find(value => value.id === Number(productId)))
	return (
		<div className={'product-card-container'}>
			{
				!!productId &&
				<Row justify={'space-between'}>
					<Col span={10}>
						<img src={product.image} alt={product.title} style={{ width: "100%" }} />
					</Col>
					<Col span={10} className={'product-info'}>
						<Space direction={'vertical'}>
							<Typography.Title>{product.title}</Typography.Title>
							<Row>
								<Col span={10}>
									<Space direction={'vertical'}>
										<div>{'quantity'.toUpperCase()}</div>
										<div>
											<InputCounter inputCountValue={inputCountValue} setInputCountValue={setInputCountValue} />
										</div>
									</Space>
								</Col>
								<Col span={10}>
									<Space direction={'vertical'}>
										<div>{'price total'.toUpperCase()}</div>
										<div>{inputCountValue * product.price} EUR</div>
									</Space>
								</Col>
							</Row>

							<Space>
								<Button type={'primary'}>{'Add to bag'.toUpperCase()}</Button>
								<Button icon={<HeartOutlined />}>{'Save'.toUpperCase()}</Button>
							</Space>
						</Space>
					</Col>
				</Row>
			}
		</div>
	)
}
export default ProductPage