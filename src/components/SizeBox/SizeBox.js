import './SizeBox.css';

const SizeBox = ({ size, isActive, onClick, disabled }) => {
	const boxClassName = `size-box ${isActive ? 'size-box-active' : ''}`;

	const handleClick = () => {
		if (!disabled) {
			onClick();
		}
	};

	return (
		<div onClick={handleClick} className={boxClassName + (disabled ? ' size-box-disabled' : '')}>
			{size}
		</div>
	);
};

export default SizeBox