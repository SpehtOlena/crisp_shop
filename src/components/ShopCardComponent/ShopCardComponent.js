import './ShopCardComponent.css';
import { HiOutlineShoppingBag } from "react-icons/hi";

const ShopCardComponent = ({ price }) => {
	return (
		<div className={'shop-card-container'}>
			<HiOutlineShoppingBag style={{ 'fontSize': 22 }} />
			<div className={'shop-card_price'}>
				<p>Shopping Cart</p>
				<p>{price || "0.00"} EUR</p>
			</div>
		</div>
	)
}
export default ShopCardComponent