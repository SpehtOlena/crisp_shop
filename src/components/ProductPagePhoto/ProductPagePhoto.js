import React, { useEffect } from 'react';
import './ProductPagePhoto.css';
import { Col, Image, Row } from "antd";

const ProductPagePhoto = ({ colors, images, setColor, color, activeImage, setActiveImage }) => {

	return (
		<Row>
			<Col span={4}>
				<div className={'product-page-photo'}>
					{
						images[color.value]?.map((item, index) =>
							<img key={index} className={activeImage === item ? 'product-page-photo-active' : ''}
								onClick={() => {
									setActiveImage(item)
								}} src={item} alt="" />
						)
					}
				</div>
			</Col>
			<Col span={20} className={'product-page-photo-main'}>
				<img src={activeImage} alt="" />
			</Col>
		</Row>
	);
};

export default ProductPagePhoto;