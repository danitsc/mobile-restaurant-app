import React, { useState, useEffect } from 'react'
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

import { Feather as FeatherIcon } from 'react-native-vector-icons/'
import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'
import Animated from 'react-native-reanimated'

const restaurantImg1 = require('../../assets/homescreen/restaurant1.jpeg')
const restaurantImg2 = require('../../assets/homescreen/restaurant2.jpeg')
const restaurantImg3 = require('../../assets/homescreen/restaurant3.jpeg')
const restaurantLogo = require('../../assets/homescreen/restaurantLogo_test_4.jpeg')
const logorestaurantImg1 = require('../../assets/logo.jpg')
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const HomeScreen = () => {
	const [searchRestaurant, setSearchRestaurant] = useState('')
	const [closeRestaurants, setCloseRestaurants] = useState([])
	const [bestRestaurants, setBestRestaurants] = useState([])

	useEffect(() => {
		setCloseRestaurants([
			{
				name: 'Island Grill',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Flavoroso',
				stars: '*****',
				image: restaurantImg2,
			},
			{
				name: 'Green Curry',
				stars: '*****',
				image: restaurantImg3,
			},
			{
				name: 'El Pirata Porch',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Sweet Escape',
				stars: '*****',
				image: restaurantImg2,
			},
			{
				name: 'Salty Squid',
				stars: '*****',
				image: restaurantImg3,
			},
		])

		setBestRestaurants([
			{
				name: 'Restaurant 1',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Restaurant 2',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Restaurant 3',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Restaurant 4',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Restaurant 5',
				stars: '*****',
				image: restaurantImg1,
			},
			{
				name: 'Restaurant 6',
				stars: '*****',
				image: restaurantImg1,
			},
		])
	}, [])
	return (
		<SafeAreaView style={styles.homeBackground}>
			<ScrollView>
				<View>
					<Image
						style={{
							resizeMode: 'contain',
							width: deviceWidth,
							height: deviceHeight / 4.5,
							opacity: 0.8,
							backgroundColor: '#ebe8e8'
						}}
						source={restaurantLogo}
					></Image>
				</View>
				<View style={styles.searchView}>
					<FeatherIcon name='search' size={20} style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder='Find restaurant'
						onChangeText={text => setSearchRestaurant(text)}
						value={searchRestaurant}
					/>
				</View>
				<View style={styles.closeRestaurants}>
					<Text style={styles.sectionInfo}>Close to you</Text>
					{closeRestaurants.length ? (
						<FlatList
							data={closeRestaurants}
							renderItem={({ item }) => (
								// <View style={styles.containerOption} key={item.title}>
								// 	<Image style={styles.containerImage} source={item.imageSrc} />
								// 	<Text style={styles.containerText}>{item.title}</Text>
								// </View>
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
							// style={styles.mainMenu}
						/>
					) : null}
				</View>
				<View style={styles.closeRestaurants}>
					<Text style={styles.sectionInfo}>Best Restaurants</Text>
					{bestRestaurants.length ? (
						<FlatList
							data={bestRestaurants}
							renderItem={({ item }) => (
								// <View style={styles.containerOption} key={item.title}>
								// 	<Image style={styles.containerImage} source={item.imageSrc} />
								// 	<Text style={styles.containerText}>{item.title}</Text>
								// </View>
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
							// style={styles.mainMenu}
						/>
					) : null}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
		backgroundColor: '#ebe8e1',
		// backgroundColor: '#c43429'
	},
	searchView: {
		marginTop: 1,
		backgroundColor: '#f7f2f2',
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	searchInput: {
		height: 35,
		width: deviceWidth,
		justifyContent: 'center',
		width: deviceWidth / 1.4,
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
