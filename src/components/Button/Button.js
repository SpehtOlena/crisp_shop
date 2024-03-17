import './Button.css'

const Button = ({ children, icon, type, onClick }) => {
	switch (type) {
		default: {
			return <button onClick={onClick} className={'button'}>{children}</button>
		}
		case "primary": {
			return <button className={'button-primary'}>{children}</button>
		}
		case "icon": {
			return <button className={'button-icon'}>{icon}{children}</button>
		}
	}
	return (
		<div>
			Button
		</div>
	)
}
export default Button