import { Button } from 'antd';
import { useState } from 'react';
import './Counter.css'

const Counter = ({ counterValue, setCounterValue }) => {

	const minus = () => {
		if (counterValue > 1) {
			setCounterValue(counterValue - 1)
		}
	}
	const plus = () => {
		setCounterValue(counterValue + 1)
	}
	return (
		<div className={'counter-container'}>
			<Button disabled={counterValue <= 1} onClick={minus}>–</Button>
			{counterValue}
			<Button onClick={plus}>+</Button>
		</div>
	)
}
export default Counter