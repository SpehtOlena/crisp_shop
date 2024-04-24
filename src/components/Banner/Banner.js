import './Banner.css';
import Button from '../Button/Button';
import bannerImg from '../../assets/bannerImg.png'
import { Link } from 'react-router-dom';

const Banner = ({ type }) => {
	switch (type) {
		default: {
			return (
				<div className={'banner'}>
					<div className={'banner-container'}>
						<div className={'banner-content'}>
							<div className={'banner-container-border'}>
							</div>
							<h2 level={4} className={'banner-title'}>shopping without limits.</h2>
							<p>You can choose the best option for you, and it does not matter whether you are in Prague or San Francisco. We will deliver your purchase anywhere!</p>
							<Link to={'/shop'}>
								<Button type={'icon'} className={'banner-button'}>shop now</Button>
							</Link>
						</div>
					</div>
					<img src={bannerImg} alt="banner img" className={'banner-bgi'} />
				</div>
			)
		}
	}
}
export default Banner