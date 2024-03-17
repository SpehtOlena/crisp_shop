import { useState, useEffect } from 'react';
import './ColorBox.css';

const ColorBox = ({ color, onClick }) => {
	const [activeColor, setActiveColor] = useState(false);
	useEffect(() => {
		onClick(activeColor)
	}, [activeColor])
	return (
		<div onClick={() => setActiveColor(!activeColor)}
			className={`color-box ${activeColor ? 'color-box-active' : ''}`}>
			<div style={{ backgroundColor: color }} className={'color-box-item'} />
		</div>
	)
}
export default ColorBox