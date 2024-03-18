import { useEffect } from 'react'
import './SizesContainer.css'
import { sizes } from '../../structure'
import { Space } from 'antd'
import SizeBox from '../SizeBox/SizeBox'

const SizesContainer = ({ sizesState, setSizesState }) => {
	useEffect(() => {
		setSizesState(sizes.map(value => {
			return {
				value: value,
				active: false
			}
		}))
	}, [])
	return (
		<Space wrap>
			{
				sizesState.map((value, index) => <SizeBox setSizesState={setSizesState} sizesState={sizesState} size={value} key={index} />)
			}
		</Space>
	)
}
export default SizesContainer