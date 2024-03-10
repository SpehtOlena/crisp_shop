import { Button, InputNumber, Space } from 'antd'
import './InputCounter.css'

const InputCounter = ({ inputCountValue, setInputCountValue }) => {
	return (
		<Space.Compact block>
			<Button disabled={inputCountValue <= 1} onClick={() => { setInputCountValue(inputCountValue - 1) }}>-</Button>
			<InputNumber min={1} readOnly style={{ width: 40 }} value={inputCountValue} />
			<Button onClick={() => { setInputCountValue(inputCountValue + 1) }}>+</Button>
		</Space.Compact>
	)
}
export default InputCounter