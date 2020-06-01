import React, { useState, useEffect, useContext } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	Dimensions,
	TouchableOpacity,
	ImageBackground,
	Button,
	TextInput,
	ScrollView,
	FlatList,
} from 'react-native'
import { create } from 'apisauce'

import { Feather as FeatherIcon } from 'react-native-vector-icons/'
import { Context } from '../context/dataContext'
import Animated from 'react-native-reanimated'
import RestaurantMenu from '../components/Menu/RestaurantMenu'

const restaurantImg1 = require('../../assets/homescreen/restaurant1.jpeg')
const restaurantImg2 = require('../../assets/homescreen/restaurant2.jpeg')
const restaurantImg3 = require('../../assets/homescreen/restaurant3.jpeg')
const restaurantLogo = require('../../assets/homescreen/restaurantLogo_test_4.jpeg')
const logorestaurantImg1 = require('../../assets/logo.jpg')
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const api = create({
	baseURL: 'http://192.168.100.2:5000',
	headers: { Accept: 'application/json' },
})

const HomeScreen = props => {
	const [searchRestaurant, setSearchRestaurant] = useState('')
	const [closeRestaurants, setCloseRestaurants] = useState([])
	const [bestRestaurants, setBestRestaurants] = useState([])
	const [showRestaurantMenu, setShowRestaurantMenu] = useState({
		show: false,
		data: {},
	})

	const { state, ADD_AUTH_INFO, ADD_OPTION } = useContext(Context)

	useEffect(() => {
		setCloseRestaurants([
			{
				id: "G4DLZnIBiwGv-DKQjZxO",
				name: 'Island Grill',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 2,
				name: 'Flavoroso',
				stars: '*****',
				image: restaurantImg2,
			},
			{
				id: 3,
				name: 'Green Curry',
				stars: '*****',
				image: restaurantImg3,
			},
			{
				id: 4,
				name: 'El Pirata Porch',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 5,
				name: 'Sweet Escape',
				stars: '*****',
				image: restaurantImg2,
			},
			{
				id: 6,
				name: 'Salty Squid',
				stars: '*****',
				image: restaurantImg3,
			},
		])

		setBestRestaurants([
			{
				id: 7,
				name: 'Restaurant 1',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 8,
				name: 'Restaurant 2',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 9,
				name: 'Restaurant 3',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 10,
				name: 'Restaurant 4',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 11,
				name: 'Restaurant 5',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				id: 12,
				name: 'Restaurant 6',
				stars: '*****',
				image: restaurantImg1,
			},
		])
	}, [])

	const getRestaurantData = async restaurantId => {
		try {
			const { data } = await api.get(`/api/restaurant/${restaurantId}`)
			if (data.success) {
				setShowRestaurantMenu({ show: true, data })
			}
		} catch (error) {
			console.log(`Show restaurant menu error: ${error}`)
		}
	}

	return (
		<SafeAreaView style={styles.homeBackground}>
			<ScrollView>
				{!showRestaurantMenu.show && (
					<View>
						<View>
							{/* <Image
						style={{
							resizeMode: 'contain',
							width: deviceWidth,
							height: deviceHeight / 7,
							opacity: 0.8,
							backgroundColor: 'white',
						}}
						source={restaurantLogo}
					></Image> */}
							<Text
								style={{ textAlign: 'center', marginBottom: 30, fontSize: 26 }}
							>
								Restaurant Home Page
							</Text>
						</View>
						<View style={styles.searchView}>
							<FeatherIcon name='search' size={20} style={styles.searchIcon} />
							<TextInput
								style={styles.searchInput}
								placeholder='Find restaurant'
								placeholderTextColor='#a8a2a2'
								onChangeText={text => setSearchRestaurant(text)}
								value={searchRestaurant}
							/>
						</View>
					</View>
				)}
				{showRestaurantMenu.show ? (
					<RestaurantMenu
						data={showRestaurantMenu.data}
						setShowRestaurantMenu={setShowRestaurantMenu}
					/>
				) : (
					// <View>
					// 	<Text>Rest menu</Text>
					// </View>
					<View>
						<View style={styles.closeRestaurants}>
							<Text style={styles.sectionInfo}>Close to you</Text>
							{closeRestaurants.length ? (
								<FlatList
									data={closeRestaurants}
									renderItem={({ item }) => (
										<TouchableOpacity
											key={item.name}
											style={styles.selectRestaurant}
											onPress={() => getRestaurantData(item.id)}
										>
											<View>
												<Image
													style={styles.selectRestaurantImg}
													source={item.image}
												></Image>
											</View>
											<View style={styles.selectRestaurantInfo}>
												<Text>{item.name}</Text>
												<Text>Stars: 5</Text>
											</View>
										</TouchableOpacity>
									)}
									keyExtractor={item => item.name}
									horizontal={true}
								/>
							) : null}
						</View>
						<View style={styles.closeRestaurants}>
							<Text style={styles.sectionInfo}>Best Restaurants</Text>
							{bestRestaurants.length ? (
								<FlatList
									data={bestRestaurants}
									renderItem={({ item }) => (
										<TouchableOpacity
											key={item.name}
											style={styles.selectRestaurant}
										>
											<View>
												<Image
													style={styles.selectRestaurantImg}
													source={item.image}
												></Image>
											</View>
											<View style={styles.selectRestaurantInfo}>
												<Text>{item.name}</Text>
												<Text>Stars: 5</Text>
											</View>
										</TouchableOpacity>
									)}
									keyExtractor={item => item.name}
									horizontal={true}
								/>
							) : null}
						</View>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
		// backgroundColor: '#ebe8e1',
		backgroundColor: 'white',
		// backgroundColor: '#c43429'
	},
	searchView: {
		marginTop: 1,
		// backgroundColor: '#f7f2f2',
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
		// backgroundColor: '#f7f2f2',
		borderRadius: 6,
		padding: 4,
		borderBottomWidth: 1,
		borderBottomColor: '#bccbe0',
	},
	searchInput: {
		height: 35,
		width: deviceWidth,
		justifyContent: 'center',
		width: deviceWidth / 1.4,
		paddingLeft: 5,
		fontSize: 17,
	},
	searchIcon: {
		alignSelf: 'center',
		padding: 5,
	},
	selectRestaurant: {
		margin: 15,
		alignSelf: 'flex-end',
	},
	selectRestaurantImg: {
		borderRadius: 5,
	},
	selectRestaurantInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	sectionInfo: {
		textAlign: 'center',
		marginTop: 25,
		fontSize: 20,
	},
})

export default HomeScreen
