import './ProductCard.css';
import { Card, Typography, Space } from 'antd';
import ColorBox from '../ColorBox/ColorBox';

const { Meta } = Card;

const ProductCard = ({ value, index }) => {

	return (
		<Card
			hoverable
			style={{
				width: "100%",
				minHeight: 450,
			}}
			cover={<img alt={value.name} src={value.photo} style={{ width: "90%" }} />}
		>
			<Meta title={value.name} description={
				<Space direction={'vertical'}>
					<Typography.Text type={'secondary'}>
						{value.short_description}
					</Typography.Text>
					<Typography.Text strong level={5}>
						{value.price.toFixed(2)} EUR
					</Typography.Text>
					<Space wrap>
						{
							value.color.map((value, index) => <ColorBox disabled key={index} color={{ value: value, active: false }} onClick={() => { }} />)
						}
					</Space>
				</Space>
			} />
		</Card>
	)
}
export default ProductCard