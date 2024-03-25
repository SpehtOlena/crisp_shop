import { useState } from 'react';
import './CollapseBox.css';
import { Divider, Row, Col, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const CollapseBox = ({ title, description }) => {
	const [boxIsOpen, setBoxIsOpen] = useState(false);
	return (
		<div className={'collapse-box-container'}>
			<Row className={'collapse-box-header'} justify={'space-between'} onClick={() => setBoxIsOpen(!boxIsOpen)}>
				<span >{title}</span>
				<span>
					{
						boxIsOpen ? <MinusOutlined /> : <PlusOutlined />
					}
				</span>
			</Row>
			{
				boxIsOpen &&
				<>
					<Divider />
					<Row justify={'space-between'}>
						<Col span={11}>
							<Space direction={'vertical'} className={'collapse-box-detail-container'}>
								<h4 className={'collapse-box-detail-title'}>About product</h4>
								<p className={'collapse-box-detail-item'}>{description.about_product}</p>
							</Space>
							<Space direction={'vertical'} className={'collapse-box-detail-container'}>
								<h4 className={'collapse-box-detail-title'}>advantages</h4>
								<ul className={'collapse-box-detail-item'}>
									{
										description.advantages.map((value, index) => <li key={index}>{value}</li>)
									}
								</ul>
							</Space>
						</Col>
						<Col span={11}>
							<Space direction={'vertical'} className={'collapse-box-detail-container'}>
								<h4 className={'collapse-box-detail-title'}>SHIPPING</h4>
								<p className={'collapse-box-detail-item'}>{description.shipping}</p>
							</Space>
						</Col>
					</Row>
				</>
			}
		</div>
	)
}
export default CollapseBox