import React, { useState, useContext, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	Button,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	SafeAreaView,
} from 'react-native'

import CustomizeChoice from './CustomizeChoice'
import { Context } from '../../context/dataContext'

import { create } from 'apisauce'

const api = create({
	baseURL: 'http://192.168.100.2:5000',
})

const deviceWidth = Dimensions.get('window').width

const restaurantLogo = require('../../../assets/homescreen/restaurant3.jpeg')
// Single general image for now, change it later...

const img = require('../../../assets/breakfast.jpeg')

import Icon from 'react-native-vector-icons/Entypo'

const deTest = [
	{
		name: 'Pizza Diavola',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Capriciosa',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Salami',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Quattro',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Prosciuto',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Rustica',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Funghi',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
	{
		name: 'Pizza Margherita',
		price: '20',
		ingredients: 'sos rosii, mozzarella, salam picant',
		customizeData: [
			{
				title: 'Alege Marimea',
				options: [
					{
						option: 'Mare',
						price: 30,
					},
					{
						option: 'Medie',
						price: 20,
					},
				],
			},
		],
	},
]

const RestaurantMenu = ({ restaurantId, match, restaurantName }) => {
	const restaurantIdToUse = restaurantId || match.params.restaurantId
	const [loading, setLoading] = useState(true)
	// const [restaurantData, setRestaurantData] = useState({ menu: [] })
	const [restaurantData, setRestaurantData] = useState([])
	const [filteredOptions, setFilteredOptions] = useState({})

	const { state, ADD_OPTION, CLEAR_OPTIONS } = useContext(Context)
	const [showCustomizer, setShowCustomizer] = useState({
		show: false,
		name: '',
	})

	useEffect(() => {
		const getRestaurantData = async () => {
			console.log('am idd da?', restaurantIdToUse)
			try {
				const { data } = await api.get(`/api/restaurant/${restaurantIdToUse}`)
				// if (data.success) {
				// setShowRestaurantMenu({ show: true, data })
				const { menu } = data
				setRestaurantData(menu)
				const [defaultOption] = menu
				setFilteredOptions({ ...defaultOption })
				setLoading(false)
				// }
			} catch (error) {
				console.log(`Show restaurant menu error: ${error}`)
			}
		}
		getRestaurantData()
	}, [])

	const customizeChoice = item => {
		const { name } = item
		setShowCustomizer({
			show: true,
			name,
		})
	}

	const filterOptions = category => {
		const newFilteredOptions = restaurantData.filter(
			options => options.category === category
		)
		const optionIdx = restaurantData.findIndex(
			option => option.category === category
		)
		const requiredOption = restaurantData[optionIdx]

		setFilteredOptions(requiredOption)
	}

	return (
		<View style={{ flex: 1 }}>
			{loading ? (
				<View>
					<Text>Se incarca</Text>
				</View>
			) : (
				<SafeAreaView>
					<View style={{ flex: 1 }}>
						<View
							style={{
								backgroundColor: 'rgba(255, 255, 255, .4)',
								height: 200,
							}}
						>
							<TouchableOpacity
								onPress={() => setShowRestaurantMenu({ show: false, data: {} })}
								style={{
									color: 'red',
									opacity: 0.9,
									position: 'absolute',
									left: 10,
									right: 0,
									bottom: 0,
									top: 10,
									backgroundColor: 'transparent',
									fontSize: 3000,
									zIndex: 50,
								}}
							>
								<Text
									style={{
										color: 'black',
										opacity: 0.9,
										position: 'absolute',
										top: 0,
										bottom: 0,
										backgroundColor: 'transparent',
										fontSize: 30,
									}}
								>
									{'<'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/* {filteredOptions.category && ( */}
					<View>
						<View style={{ backgroundColor: '#fafafa' }}>
							<Text style={{ textAlign: 'center', margin: 15 }}>OFERTE</Text>
						</View>
						<View style={{}}>
							<FlatList
								data={restaurantData}
								renderItem={({ item }) => (
									<View style={{ margin: 5 }}>
										<TouchableOpacity
											key={item.category}
											// style={styles.selectRestaurant}
											onPress={() => filterOptions(item.category)}
										>
											<Text
												style={{
													fontSize: 16,
													padding: 8,
													paddingLeft: 10,
												}}
											>
												{item.category.toUpperCase()}
											</Text>
										</TouchableOpacity>
									</View>
								)}
								keyExtractor={item => item.name}
								horizontal={true}
							/>
						</View>
						{filteredOptions && filteredOptions.menuList && (
							<View style={{}}>
								<FlatList
									data={filteredOptions.menuList}
									renderItem={({ item }) => (
										<TouchableOpacity
											key={item.name}
											onPress={() => customizeChoice(item)}
										>
											<View
												style={{
													// margin: 5,
													borderBottomColor: '#d3d5db',
													borderBottomWidth: 0.3,
													paddingBottom: 3,
													marginLeft: 15,
													marginRight: 15,
													flexDirection: 'row',
													justifyContent: 'space-between',
												}}
											>
												<View>
													<Text
														style={{
															fontSize: 16,
															paddingBottom: 5,
														}}
													>
														{item.name.toUpperCase()}
													</Text>
													<Text
														style={{
															fontSize: 12,
															// paddingLeft: 5,
															// paddingTop: 2,
														}}
													>
														{item.ingredients}
													</Text>
													<Text
														style={{
															fontSize: 12,
															// paddingLeft: 5,
															paddingTop: 4,
														}}
													>
														{item.price} RON
													</Text>
												</View>
											</View>
											<View style={styles.backgroundReservation}>
												<View>
													<View style={styles.addItemView}>
														<TouchableOpacity
															onPress={e => {
																e.preventDefault()
																ADD_OPTION(item.name, parseFloat(item.price), 1, restaurantIdToUse, restaurantName)
																return
															}}
														>
															<Text>ADD CHOICE</Text>
															<Icon
																size={18}
																name='circle-with-plus'
																style={styles.addItem}
															/>
														</TouchableOpacity>
													</View>
												</View>
											</View>
										</TouchableOpacity>
									)}
									keyExtractor={item => item.name}
								/>
							</View>
						)}
						<View
							style={{
								alignSelf: 'center',
								marginTop: 50,
								marginBottom: 20,
							}}
						>
							<TouchableOpacity onPress={CLEAR_OPTIONS}>
								<Text>SEND ORDER</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			)}
		</View>
	)
}

const styles = StyleSheet.create({})

export default RestaurantMenu
