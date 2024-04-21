import './ProductCard.css';
import { Card, Typography, Space } from 'antd';
import ColorBox from '../ColorBox/ColorBox';
import { useState, useEffect } from 'react';

const { Meta } = Card;

const ProductCard = ({ value, index }) => {
	const [color, setColor] = useState({})

	useEffect(() => {
		setColor({ value: value.colors[0], active: true })
	}, [value]);

	return (
		<Card
			hoverable
			style={{
				width: "100%",
				minHeight: 450,
			}}
			cover={
				value.images[color.value]?.length &&
				<img
					alt={value.name}
					src={value.images[color.value][0]}
				/>
			}
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
							value.colors.map((value, index) =>
								<ColorBox
									oneColor
									setColorsValues={setColor}
									colorsValues={color}
									key={index}
									color={{ value: value, active: false }} />)
						}
					</Space>
				</Space>
			} />
		</Card>
	)
}
export default ProductCard