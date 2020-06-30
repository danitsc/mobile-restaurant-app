import React, { useContext, useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	AsyncStorage,
	TouchableOpacity,
	Dimensions,
	FlatList,
	useColorScheme,
	Picker,
} from 'react-native'

import { Link, useHistory } from 'react-router-native'

import { create } from 'apisauce'

import AntIcon from 'react-native-vector-icons/AntDesign'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'

import RNPickerSelect from 'react-native-picker-select'

import { Context } from '../context/dataContext'
import RestaurantMenu from '../components/Menu/RestaurantMenu'

const deviceHeight = Dimensions.get('window').height

const api = create({
	baseURL: 'http://192.168.100.2:5000',
	headers: { Accept: 'application/json' },
})

const OptionsContainer = () => {
	const [option, setOption] = useState('Menu')
	const test = () => {
		switch (option) {
			case 'Menu':
				return <Text>Menu</Text>
			case 'Offers':
				return <Text>Offers</Text>
			case 'Details':
				return <Text>Details</Text>
			default:
				return <Text>Nothing selected</Text>
		}
	}
	return (
		<View
			style={
				{
					// justifyContent: 'space-around',
					// backgroundColor: '#dbdbdb',
				}
			}
		>
			{/* <View
				style={{
					borderRightColor: 'red',
					borderRightWidth: 1,
					padding: 15,
				}}
			> */}
			<View style={{}}>
				<Picker
					selectedValue={option}
					style={{
						color: 'white',
					}}
					onValueChange={value => setOption(value)}
				>
					<Picker.Item label='Menu' value='Menu' />
					<Picker.Item label='Offers' value='Offers' />
					<Picker.Item label='Details' value='Details' />
				</Picker>
			</View>
			<View>{test()}</View>
		</View>
	)
}

const RestaurantsList = ({ restaurants, email }) => {
	const [showEditOptions, setShowEditOptions] = useState({
		show: false,
		restaurantName: null,
	})

	const { state } = useContext(Context)
	return (
		<View>
			{restaurants.map(restaurant => (
				<View style={{ marginBottom: 20, marginTop: 10 }}>
					<View
						style={{
							// borderBottomWidth: 1,
							// borderBottomColor: 'red',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View>
							<Text style={{ fontSize: 14, fontWeight: 'bold' }}>
								{restaurant.name}
							</Text>
						</View>
						<View>
							<TouchableOpacity
								onPress={() =>
									showEditOptions.restaurantName !== restaurant.name
										? setShowEditOptions({
												show: true,
												restaurantName: restaurant.name,
												restaurantId: restaurant.id,
										  })
										: setShowEditOptions({
												show: false,
												restaurantName: restaurant.name,
												restaurantId: restaurant.id,
										  })
								}
								style={{}}
							>
								<FontAwesomeIcon size={30} name='edit' />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			))}
			<View>
				{showEditOptions.show && (
					<View>
						{console.log('ce optiuni avem?', showEditOptions)}
						<RestaurantMenu
							restaurantId={showEditOptions.restaurantId}
							restaurantName={showEditOptions.name}
						/>
					</View>
				)}
			</View>
		</View>
	)
}

console.log(deviceHeight)
const NoRestaurants = () => {
	return (
		<View
			style={{
				// justifyContent: 'center',
				alignItems: 'center',
				marginTop: deviceHeight / 4,
			}}
		>
			<View>
				<Text
					style={{
						fontSize: 16,
						fontWeight: 'bold',
					}}
				>
					You have no restaurants added...{' '}
				</Text>
			</View>
			<View
				style={{
					marginTop: 20,
				}}
			>
				<TouchableOpacity
					style={{
						backgroundColor: '#a7de83',
						borderRadius: 4,
					}}
				>
					<Text
						style={{
							fontSize: 15,
							padding: 8,
						}}
					>
						Add restaurant
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const ManageRestaurants = () => {
	let history = useHistory()
	const [restaurants, setRestaurants] = useState([])
	const [error, setError] = useState({ isError: false, reason: null })
	const { state } = useContext(Context)
	useEffect(() => {
		const checkRestaurants = async () => {
			try {
				const { data: getMyRestaurants } = await api.get(
					`/api/restaurants/myRestaurants/${state.user.email}`
				)
				if (getMyRestaurants.success) {
					const { restaurantsList } = getMyRestaurants
					setRestaurants(restaurantsList)
				}
			} catch (e) {
				console.log(`Error on Manage Restaurants: ${e}`)
				setError({
					isError: true,
					reason: `Something went wrong. Please try again later !`,
				})
			}
		}
		checkRestaurants()
	}, [])
	return (
		<SafeAreaView style={styles.backgroundView}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<TouchableOpacity onPress={() => history.push('/profile')}>
					<AntIcon size={34} name='back' color='red' />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => history.push('/addNewRestaurant')}>
					<AntIcon size={34} name='pluscircle' color='green' />
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 30 }}>
				{!restaurants.length ? (
					<NoRestaurants />
				) : (
					<RestaurantsList restaurants={restaurants} email={state.user.email} />
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundView: {
		flex: 1,
		margin: 20,
	},
})

export default ManageRestaurants
