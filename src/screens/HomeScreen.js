import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	Dimensions,
	Button,
} from 'react-native'
import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'

const imgSource = require('../../assets/food.jpeg')
const logoImgSource = require('../../assets/logo.jpg')
const deviceWidth = Dimensions.get('window').width

const HomeScreenOptions = [
	{
		text: 'Menu',
		image: imgSource,
		id: 1,
	},
	{
		text: 'Cart',
		image: imgSource,
		id: 2,
	},
	{
		text: 'Reservation',
		image: imgSource,
		id: 3,
	},
	{
		text: 'Gallery',
		image: imgSource,
		id: 4,
	},
	// {
	// 	text: 'News',
	// 	image: imgSource,
	// 	id: 5,
	// },
	// {
	// 	text: 'Location',
	// 	image: imgSource,
	// 	id: 6,
	// },
]

const HomeScreen = () => {
	return (
		<View style={styles.backgroundHomeScreen}>
			{/* <Header />
			<View style={styles.backgroundHomeScreen}>
				<View style={styles.welcomeInfo}>
					<Text>Welcome to Your Restaurant App</Text>
					<Image style={styles.logoImage} source={logoImgSource} />
				</View>
				<View style={styles.optionsInfo}>
					<Text style={styles.optionsInfoText}>Our best offers</Text>
					<View style={styles.rowImageContainer}>
						<View style={styles.independentImageContainer}>
							<Image style={styles.image} source={imgSource} />
							<Text>Image info</Text>
						</View>
						<View style={styles.independentImageContainer}>
							<Image style={styles.image} source={imgSource} />
							<Text>Image info</Text>
						</View>
					</View>
					<View style={styles.rowImageContainer}>
						<View style={styles.independentImageContainer}>
							<Image style={styles.image} source={imgSource} />
							<Text>Image info</Text>
						</View>
						<View style={styles.independentImageContainer}>
							<Image
								style={styles.image}
								source={imgSource}
								resizeMode='contain'
							/>
							<Text>Image info</Text>
						</View>
					</View>
				</View>
			</View> */}
			{/* <Footer navigation={navigation} /> */}
		</View>
		// <View>
		// 	<Text>fdjsaiofdiasj</Text>
		// </View>
	)
}

const styles = StyleSheet.create({
	backgroundHomeScreen: {
		// margin: 10,
		flex: 1,
	},
	optionsInfoText: {
		textAlign: 'center',
	},
	welcomeInfo: {
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10,
		paddingHorizontal: 10,
		height: 200,
		width: deviceWidth,
	},
	optionsInfo: {
		marginTop: 20,
	},
	rowImageContainer: {
		flexDirection: 'row',
		margin: 6,
		padding: 3,
		justifyContent: 'space-around',
	},
	independentImageContainer: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: 'grey',
		paddingBottom: 20,
		width: 160,
		height: 160,
	},
	image: {
		flex: 1,
		// width: undefined,
		// height: undefined,
		width: deviceWidth / 3,
		height: deviceWidth / 3,
	},
	logoImage: {
		flex: 1,
		width: deviceWidth,
		resizeMode: 'contain',
	},
})

export default HomeScreen
