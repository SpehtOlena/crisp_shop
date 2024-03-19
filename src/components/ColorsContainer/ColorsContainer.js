import { useEffect } from 'react'
import './ColorsContainer.css'
import { colors } from '../../structure'
import { Space } from 'antd'
import ColorBox from '../ColorBox/ColorBox'

const ColorsContainer = ({ colorsValues, setColorsValues }) => {
	useEffect(() => {
		setColorsValues(colors.map(value => {
			return {
				value: value,
				active: false
			}
		}))
	}, [])
	return (
		<Space wrap>
			{
				colorsValues.map((value, index) => <ColorBox colorsValues={colorsValues} setColorsValues={setColorsValues} color={value} key={index} />)
			}
		</Space>
	)
}
export default ColorsContainer