import { useSelector } from 'react-redux'
import './ShoppingCart.css'
import { Space, Typography } from 'antd'

const ShoppingCart = () => {
	const data = useSelector(state => state.shoppingCartProducts.data)
	return (
		<Space direction={'vertical'}>
			{
				data.map(value => value.product.name)
			}
			{
				data.map(value => <img src={value.product.photo} alt='' />)
			}
			{
				data.map(value => <Typography.Title level={3}>{(value.product.price * value.count).toFixed(2)} EUR</Typography.Title>)
			}
		</Space>
	);
};
export default ShoppingCart