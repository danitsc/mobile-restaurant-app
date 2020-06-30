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

import { useHistory } from 'react-router-native'

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
		const fetchData = async () => {
			try {
				const { data: bestRestaurants } = await api.get(
					'/api/restaurants/getRestaurants/bestRestaurants'
				)
				if(bestRestaurants.success) {
					const { restaurantsList: bestRestaurantsList } = bestRestaurants
					setBestRestaurants(bestRestaurantsList)
					const { data: allRestaurants } = await api.get(
						'/api/restaurants/getRestaurants/allRestaurants'
					)
					const { restaurantsList: allRestaurantsList } = allRestaurants
					setCloseRestaurants(bestRestaurantsList)
				}
			} catch (e) {
				console.log('eroare', e)
			}
		}
		fetchData()
	}, [])

	let history = useHistory()

	return (
		<SafeAreaView style={styles.homeBackground}>
			{/* <ScrollView> */}
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
						<Text style={styles.sectionInfo}>Best Restaurants</Text>
						{bestRestaurants.length ? (
							<FlatList
								data={bestRestaurants}
								renderItem={({ item }) => (
									<TouchableOpacity
										key={item.name}
										style={styles.selectRestaurant}
										onPress={() => history.push(`/menu/${item.id}`)}
									>
										<View>
											<Image
												style={styles.selectRestaurantImg}
												source={{
													uri: `data:image/jpg;base64, ${item.imagePath}`,
												}}
												// source={restaurantImg2}
											></Image>
										</View>
										<View style={styles.selectRestaurantInfo}>
											<Text>{item.name}</Text>
											{/* <Text>Stars: 5</Text> */}
										</View>
									</TouchableOpacity>
								)}
								keyExtractor={item => item.name}
								horizontal={true}
							/>
						) : null}
					</View>
					<View style={styles.closeRestaurants}>
						<Text style={styles.sectionInfo}>All restaurants</Text>
						{closeRestaurants.length ? (
							<FlatList
								data={closeRestaurants}
								renderItem={({ item }) => (
									<TouchableOpacity
										key={item.name}
										style={styles.selectRestaurant}
										onPress={() => history.push(`/menu/${item.id}`)}
									>
										<View>
											<Image
												style={styles.selectRestaurantImg}
												source={{
													uri: `data:image/jpg;base64, ${item.imagePath}`,
												}}
												// source={restaurantImg1}
											></Image>
										</View>
										<View style={styles.selectRestaurantInfo}>
											<Text>{item.name}</Text>
											{/* <Text>Stars: 5</Text> */}
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
			{/* </ScrollView> */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
		// backgroundColor: '#ebe8e1',
		// backgroundColor: 'white',
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
		width: 250,
		height: 250,
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
