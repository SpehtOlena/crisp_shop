import { useEffect } from 'react'
import './SizesContainer.css'
import { sizes } from '../../structure'
import { Space } from 'antd'
import SizeBox from '../SizeBox/SizeBox'

const SizesContainer = ({ selectedSizes, setSelectedSizes, dataProductPage }) => {
	const handleSizeClick = (size) => {
		if (dataProductPage) {
			// Для сторінки продукту (лише один активний розмір)
			setSelectedSizes([size]);
		} else {
			// Для сторінки магазину (декілька активних розмірів)
			setSelectedSizes((prevSelectedSizes) => {
				if (prevSelectedSizes.includes(size)) {
					return prevSelectedSizes.filter((selectedSize) => selectedSize !== size);
				} else {
					return [...prevSelectedSizes, size];
				}
			});
		}
	};

	return (
		<Space wrap>
			{sizes.map((value, index) => (
				<SizeBox
					size={value}
					key={index}
					onClick={() => handleSizeClick(value)}
					isActive={selectedSizes.includes(value)}
					disabled={!!dataProductPage && !dataProductPage.includes(value)}
				/>
			))}
		</Space>
	);
};

export default SizesContainer;