import './ShopCardComponent.css';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useSelector } from 'react-redux';

const ShopCardComponent = () => {
	const data = useSelector(state => state.shoppingCartProducts.data)
	return (
		<div className={'shop-card-container'}>
			<HiOutlineShoppingBag style={{ 'fontSize': 22 }} />
			<div className={'shop-card_price'}>
				<p>Shopping Cart</p>
				<p>
					{!!data && data.reduce((sum, item) => sum + item.price * item.quantity + item.price * 0.2 * item.quantity, 0).toFixed(2)} EUR
				</p>
			</div>
		</div>
	)
}
export default ShopCardComponent