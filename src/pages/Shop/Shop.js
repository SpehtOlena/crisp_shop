import { useSelector } from 'react-redux';
import { Card, Space } from 'antd';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
	const { Meta } = Card;
	const products = useSelector(state => state.products.data)

	return (
		<Space wrap className={'products-container'}>
			{
				products.map((value, index) =>
					<Link to={`/shop/${value.id}`} key={index}>
						<Card
							hoverable
							style={{
								width: 240,
								minHeight: 450,
							}}
							cover={<img alt={value.title} src={value.image} style={{ width: "90%" }} />}
						>
							<Meta title={value.title} description={`${value.price} EUR`} />
						</Card>
					</Link>
				)
			}
		</Space>
	)
}
export default Shop