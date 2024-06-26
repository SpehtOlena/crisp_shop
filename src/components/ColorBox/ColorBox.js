import './ColorBox.css';

const ColorBox = ({ color, disabled, colorsValues, setColorsValues, oneColor }) => {
	if (disabled) {
		return <div className={`color-box-disabled`}>
			<div style={{ backgroundColor: color.value }} className={'color-box-item'} />
		</div>
	} else {
		return (
			<div onClick={(event) => {
				event.stopPropagation()
				event.preventDefault()
				setColorsValues(
					oneColor ?
						{ value: color.value, active: !color.active }
						:
						colorsValues.map(item => {
							if (item.value === color.value) {
								return {
									value: color.value,
									active: !color.active
								}
							} else {
								return item
							}
						})
				)

			}}
				className={`color-box ${oneColor ? (colorsValues.value === color.value ? 'color-box-active' : '') : (color.active ? 'color-box-active' : '')}`}>
				<div style={{ backgroundColor: color.value }} className={'color-box-item'} />
			</div>
		)
	}


}
export default ColorBox