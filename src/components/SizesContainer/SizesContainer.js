import { useEffect } from 'react'
import './SizesContainer.css'
import { sizes } from '../../structure'
import { Space } from 'antd'
import SizeBox from '../SizeBox/SizeBox'

const SizesContainer = ({ sizesState, setSizesState, dataProductPage }) => {
	useEffect(() => {

		setSizesState(sizes.map(value => {
			return {
				value: value,
				active: false
			}
		}))

	}, [setSizesState]);
	if (dataProductPage) {
		return (
			<Space wrap style={{ width: '100%' }}>
				{sizesState.map((value, index) => {
					const dataProduct = dataProductPage.find(item => item === value.value);

					if (dataProduct) {
						return (
							<SizeBox
								sizesState={sizesState}
								setSizesState={setSizesState}
								size={value}
								key={index}
							/>
						);
					} else {
						return (
							<SizeBox
								disabled
								sizesState={sizesState}
								setSizesState={setSizesState}
								size={value}
								key={index}
							/>
						);
					}
				})

				}
			</Space>
		)
	} else {
		return (
			<Space wrap>
				{sizesState.map((value, index) => <SizeBox sizesState={sizesState} setSizesState={setSizesState}
					size={value} key={index} />)}
			</Space>
		);
	}
};

export default SizesContainer;