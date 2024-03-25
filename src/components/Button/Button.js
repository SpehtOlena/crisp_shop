import './Button.css'

const Button = ({ children, icon, type, onClick }) => {
	switch (type) {
		default: {
			return <button onClick={onClick} className={'button'}>{children}</button>
		}
		case "w100": {
			return <button onClick={onClick} className={'button-100'}>{children}</button>
		}
		case "primary": {
			return <button onClick={onClick} className={'button-primary'}>{children}</button>
		}
		case "icon": {
			return <button onClick={onClick} className={'button-icon'}>{icon}{children}</button>
		}
	}
}
export default Button