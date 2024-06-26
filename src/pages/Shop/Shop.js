import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, Checkbox, Col, Row, Slider, Space, Typography, List } from 'antd';
import './Shop.css'
import { Link } from 'react-router-dom';
import { brands, dressLengths } from '../../structure';
import ColorBox from '../../components/ColorBox/ColorBox';
import Button from '../../components/Button/Button'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteFilter from '../../components/DeleteFilter/DeleteFilter';
import SizesContainer from '../../components/SizesContainer/SizesContainer';
import ColorsContainer from '../../components/ColorsContainer/ColorsContainer'
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';

const Shop = () => {
	const { Meta } = Card;
	const [sliderValue, setSliderValue] = useState(500);
	const [brandsValues, setBrandsValues] = useState([]);
	const [dressLengthValues, setDressLengthValues] = useState([]);
	const [colorsValues, setColorsValues] = useState([]);
	const [productsWithFilter, setProductsWithFilter] = useState([]);
	const [sizesState, setSizesState] = useState([]);
	const products = useSelector(state => state.firestore.ordered.products);
	const [showFilterDetails, setShowFilterDetails] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		setProductsWithFilter(products)
	}, [products])
	useEffect(() => {
		if (!brandsValues.length && !dressLengthValues.length && !colorsValues.filter(item => item.active).length && !sizesState.filter(item => item.active).length) {
			setShowFilterDetails(false)
		}
	}, [brandsValues, dressLengthValues, colorsValues, sizesState]);

	const changeShowFilterItems = (fieldName) => {
		setShowFilterItems({ ...showFilterItems, [fieldName]: !showFilterItems[fieldName] })
	}
	const [showFilterItems, setShowFilterItems] = useState({
		brand: true,
		size: true,
		dressLength: true,
		color: true,
		price_range: true
	});
	const onChangeSlider = (value) => {
		setSliderValue(value)
	};

	const applyFilter = () => {
		const filteredProducts = products.filter(product => {
			const meetsSliderValue = product.price <= sliderValue;

			const meetsBrands = brandsValues.length === 0 || brandsValues.includes(product.brand);

			const meetsSizes = sizesState.length === 0 || sizesState.some(size => product.sizes.includes(size));

			const meetsDressLengths = dressLengthValues.length === 0 || dressLengthValues.some(length => product.dress_length.includes(length));

			const meetsColors = colorsValues.filter(item => item.active).length === 0 || colorsValues.some(color => product.colors.some(productColor => color.value === productColor && color.active));

			return meetsSliderValue && meetsBrands && meetsDressLengths && meetsColors && meetsSizes;
		});
		if (brandsValues.length || sizesState.filter(item => item.active).length || dressLengthValues.length || colorsValues.filter(item => item.active).length) {
			setShowFilterDetails(true)
		}
		setProductsWithFilter(filteredProducts)
	}

	const resetAllFilter = () => {
		setSliderValue(500)
		setBrandsValues([])
		setSizesState(sizesState.map((value, index) => {
			return {
				value: value.value,
				active: false
			}
		}))
		setDressLengthValues([])
		setColorsValues(colorsValues.map((value, index) => {
			return {
				value: value.value,
				active: false
			}
		}))
		setShowFilterDetails(false)
	}

	const deleteOneElementFromFilter = (setFilters, filters, item, type) => {
		if (type) {
			setFilters(filters.map(value => {
				if (value.value === item) {
					return {
						value: item,
						active: false
					}
				} else {
					return {
						value: value.value,
						active: value.active
					}
				}
			}))
		} else {
			setFilters(filters.filter(value => value !== item))
		}
	}

	const onShowSizeChange = (current, pageSize) => {
		console.log(current, pageSize);
	};

	return (
		<>
			<Row>
				<Banner />
			</Row>
			<Row>
				<Col span={6} style={{ marginRight: '3%' }}>
					{/* CHOSE FILTER ITEMS */}
					<Row>
						{
							(brandsValues.length || sizesState.filter(item => item.active).length || dressLengthValues.length || colorsValues.filter(item => item.active).length) && showFilterDetails ?
								<div className={'shop-filter-box'}>
									<div className={'shop-filter-box-title'}>
										<Typography.Title level={3}>
											Filter
										</Typography.Title>
										<DeleteFilter children={"reset all"} onClick={resetAllFilter} style={{ FontFace: "Oswald" }} />
									</div>
									{!!brandsValues.length &&
										<Space direction={'vertical'}>
											<Typography.Title level={5}>
												Brands:
											</Typography.Title>
											<Space size={'large'} wrap>
												{
													brandsValues.map(value =>
														<DeleteFilter
															onClick={() => deleteOneElementFromFilter(setBrandsValues, brandsValues, value)}
															children={value}
															key={value}
														/>)
												}
											</Space>
										</Space>
									}
									{
										!!sizesState.filter(item => item.active).length &&
										<Space direction={"vertical"}>
											<Typography.Title level={5}>
												Size (Inches):
											</Typography.Title>
											<Space wrap size={"large"}>
												{
													sizesState.filter(item => item.active).map((item, index) =>
														<DeleteFilter
															key={index}
															onClick={() => deleteOneElementFromFilter(setSizesState, sizesState, item.value, true)}
															children={item.value}
														/>)
												}
											</Space>
										</Space>
									}
									{!!dressLengthValues.length &&
										<Space direction={'vertical'}>
											<Typography.Title level={5}>
												Dress length:
											</Typography.Title>
											<Space size={'large'} wrap>
												{
													dressLengthValues.map(value =>
														<DeleteFilter
															onClick={() => deleteOneElementFromFilter(setDressLengthValues, dressLengthValues, value)}
															children={value}
															key={value}
														/>)
												}
											</Space>
										</Space>
									}
									{!!colorsValues.filter(item => item.active).length &&
										<Space direction={'vertical'}>
											<Typography.Title level={5}>
												Color:
											</Typography.Title>
											<Space size={'large'} wrap>
												{
													colorsValues.filter(item => item.active).map((item, index) =>
														<DeleteFilter
															onClick={() => deleteOneElementFromFilter(setColorsValues, colorsValues, item.value, true)}
															key={index}>
															<ColorBox disabled color={item} />
														</DeleteFilter>)
												}
											</Space>
										</Space>
									}
									<Space direction={'vertical'}>
										<Typography.Title level={5}>
											Price Range:
										</Typography.Title>
										<Space>
											<DeleteFilter onClick={() => setSliderValue(500)} />
											{`0.00 EUR - ${sliderValue.toFixed(2)} EUR`}
										</Space>
									</Space>
								</div> : ''
						}
					</Row>
					{/* SELECT FILTER ITEMS */}
					<Space direction={'vertical'} size={'large'} style={{ width: "100%" }}>
						{/* BRANDS */}
						<Space direction={'vertical'} size={'middle'} style={{ width: "100%" }}>
							<Row justify={'space-between'} style={{ width: "100%" }} align={'middle'}>
								<Typography.Title level={3}>
									Brand
								</Typography.Title>
								<div className={'filter-collapse'} onClick={() => changeShowFilterItems('brand')}>
									{
										showFilterItems.brand ? <MinusOutlined /> : <PlusOutlined />
									}

								</div>
							</Row>
							{showFilterItems.brand &&
								<Checkbox.Group
									value={brandsValues}
									style={{ display: "flex", flexDirection: "column", gap: "20px 0", textTransform: "uppercase" }}
									options={brands.map((value) => {
										return {
											label: value,
											value: value
										}
									})}
									onChange={(value) => setBrandsValues(value)} />
							}
						</Space>
						{/* SIZES */}
						<Space direction={'vertical'} size={'middle'} style={{ width: "100%" }}>
							<Row justify={'space-between'} style={{ width: "100%" }} align={'middle'}>
								<Typography.Title level={3} >
									Size (Inches)
								</Typography.Title>
								<div className={'filter-collapse'} onClick={() => changeShowFilterItems('size')}>
									{
										showFilterItems.size ? <MinusOutlined /> : <PlusOutlined />
									}
								</div>
							</Row>
							<Space wrap style={{ width: "80%" }}>
								{
									showFilterItems.size &&
									<SizesContainer
										selectedSizes={sizesState}
										setSelectedSizes={setSizesState}
									/>
								}
							</Space>
						</Space>
						{/* DRESS LENGTH */}
						<Space direction={'vertical'} size={'middle'} style={{ width: "100%" }}>
							<Row justify={'space-between'} style={{ width: "100%" }} align={'middle'}>
								<Typography.Title level={3}>
									Dress length
								</Typography.Title>
								<div className={'filter-collapse'} onClick={() => changeShowFilterItems('dressLength')}>
									{
										showFilterItems.dressLength ? <MinusOutlined /> : <PlusOutlined />
									}

								</div>
							</Row>
							{showFilterItems.dressLength &&
								<Checkbox.Group
									value={dressLengthValues}
									style={{ display: "flex", flexDirection: "column", gap: "20px 0", textTransform: "uppercase" }}
									options={dressLengths.map((value) => {
										return {
											label: value,
											value: value
										}
									})}
									onChange={(value) => setDressLengthValues(value)} />
							}
						</Space>
						{/* COLORS */}
						<Space direction={'vertical'} size={'middle'} style={{ width: "100%" }}>
							<Row justify={'space-between'} style={{ width: "100%" }} align={'middle'}>
								<Typography.Title level={3}>
									Colors
								</Typography.Title>
								<div className={'filter-collapse'} onClick={() => changeShowFilterItems('color')}>
									{
										showFilterItems.color ? <MinusOutlined /> : <PlusOutlined />
									}
								</div>
							</Row>
							<Space wrap style={{ width: "80%" }}>
								{showFilterItems.color &&
									<ColorsContainer colorsValues={colorsValues} setColorsValues={setColorsValues} />
								}
							</Space>
						</Space>
						{/* PRICE */}
						<Space direction={'vertical'} size={'middle'} style={{ width: "100%" }}>
							<Row justify={'space-between'} style={{ width: "100%" }} align={'middle'}>
								<Typography.Title level={3}>
									Price Range
								</Typography.Title>
								<div className={'filter-collapse'} onClick={() => changeShowFilterItems('price_range')}>
									{
										showFilterItems.price_range ? <MinusOutlined /> : <PlusOutlined />
									}
								</div>
							</Row>
							{
								showFilterItems.price_range &&
								<>
									<Row justify={'space-between'}>
										<Col>0.00 EUR</Col>
										<Col>
											{`${sliderValue.toFixed(2)} EUR`}
										</Col>
									</Row>
									<div style={{ width: "100%" }}>
										<Slider step={0.01} min={1} max={500} onChange={onChangeSlider} value={sliderValue} />
									</div>
								</>
							}
						</Space>
						<Row justify={'end'}>
							<Button onClick={() => applyFilter()}>Apply</Button>
						</Row>
					</Space>
				</Col>
				<Col span={17}>
					{/* ALL PRODUCTS */}
					{/* <Divider type={"vertical"} style={{ height: "100%", margin: '0 30px' }} /> */}
					<List

						position={'top'}
						style={{ width: '100%' }}
						pagination={{
							position: 'top',
							defaultPageSize: 12,
							pageSizeOptions: ['12', '18'],
						}}
						grid={{
							gutter: 16,
							xs: 1,
							sm: 2,
							md: 3,
							lg: 3,
							xl: 4,
							xxl: 5,
						}}

						gutter={100}
						dataSource={productsWithFilter}
						renderItem={(value, index) => (
							<List.Item>
								<Link to={`${value.id}`}>
									<ProductCard key={index} value={value} index={index} />
								</Link>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</>
	)
}
export default Shop