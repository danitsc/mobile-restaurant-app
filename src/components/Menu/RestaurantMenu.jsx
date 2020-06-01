import React, { useState, useContext } from 'react'
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
} from 'react-native'

import CustomizeChoice from './CustomizeChoice'
import { Context } from '../../context/dataContext'

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

const RestaurantMenu = ({ data, setShowRestaurantMenu }) => {
	const { data: restaurantData, restaurantId } = data
	const { menu } = restaurantData
	const { state, ADD_OPTION } = useContext(Context)
	const [showCustomizer, setShowCustomizer] = useState({
		show: false,
		name: '',
	})

	console.log(state)

	// const optionIdx = restaurantData.menu.findIndex(
	// 	option => option.category === category
	// )
	const requiredOption = restaurantData.menu[0]

	const [filteredOptions, setFilteredOptions] = useState(requiredOption)

	const customizeChoice = item => {
		const { name } = item
		setShowCustomizer({
			show: true,
			name,
		})
	}

	const filterOptions = category => {
		const newFilteredOptions = restaurantData.menu.filter(
			options => options.category === category
		)
		const optionIdx = restaurantData.menu.findIndex(
			option => option.category === category
		)
		const requiredOption = restaurantData.menu[optionIdx]

		setFilteredOptions(requiredOption)
	}

	return (
		<View style={{}}>
			<View style={{}}>
				<ImageBackground
					style={{
						height: 200,
						width: deviceWidth,
						opacity: 1,
					}}
					source={restaurantLogo}
				>
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
				</ImageBackground>
			</View>
			{filteredOptions.category && (
				<View>
					<View style={{ backgroundColor: '#fafafa' }}>
						<Text style={{ textAlign: 'center', margin: 15 }}>AICI OFERTE</Text>
					</View>
					<View style={{}}>
						<FlatList
							data={menu}
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
									{showCustomizer.show && showCustomizer.name === item.name ? (
										<CustomizeChoice item={item} />
									) : null}
								</TouchableOpacity>
							)}
							keyExtractor={item => item.name}
						/>
					</View>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({})

export default RestaurantMenu
