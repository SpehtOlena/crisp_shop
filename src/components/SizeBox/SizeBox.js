import './SizeBox.css';
import { useEffect, useState } from 'react';

const SizeBox = ({ children, disabled, onClick }) => {
	const [active, setActive] = useState(false);
	useEffect(() => {
		onClick(active)
	}, [active])
	return (
		<div onClick={() => {
			if (!disabled) {
				setActive(!active)
			}
		}}
			className={`${disabled ? 'size-box-disabled' : 'size-box'} ${active ? 'size-box-active' : ''}`}>
			{children}
		</div>
	)
}
export default SizeBox