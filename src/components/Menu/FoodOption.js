import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native'

import { Context } from '../../context/cartContext'

const deviceWidth = Dimensions.get('window').width

// Single general image for now, change it later...
// const generalImage = require('../assets/breakfast.jpeg')
const img = require('../../../assets/breakfast.jpeg')

const FoodOption = ({ navigation }) => {
	const [foodData, setfoodData] = useState({
		title: 'Food Choice',
		imageSrc: img,
		price: 5,
		quantity: 1,
		text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem 
Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
versions of Lorem Ipsum.`,
	})

	const [menuChosen, setMenuChosen] = useState(false)

	const comeBackToMainMenu = () => {
		setMenuChosen(false)
	}

	const { state, ADD_OPTION } = useContext(Context)

	return (
		<View style={styles.backgroundMenu}>
			<View style={styles.image}>
				<Image source={foodData.imageSrc} style={styles.image}></Image>
			</View>
			<View style={styles.foodInfo}>
				<View style={styles.foodDetails}>
					<View>
						<Text style={styles.foodTitle}>{foodData.title}</Text>
					</View>
					<View style={styles.priceAndQuantity}>
						<Text style={styles.price}>${foodData.price}</Text>
						<Text style={styles.quantity}>{foodData.quantity} grams</Text>
					</View>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.foodText}>{foodData.text}</Text>
					<Text style={styles.foodText}>{foodData.text}</Text>
				</View>
			</View>
			<Button
				title='Add To Cart'
				color='red'
				onPress={() =>
					ADD_OPTION(foodData.title, foodData.price, foodData.quantity)
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundMenu: {
		backgroundColor: '#dfcfbb',
		opacity: 0.9,
	},
	image: {
		width: deviceWidth,
		height: 250,
	},
	foodDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	foodInfo: {
		margin: 15,
		backgroundColor: 'white',
		// opacity: 0.7,
	},
	foodTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	textContainer: {
		marginTop: 15,
	},
	priceAndQuantity: {
		flexDirection: 'row',
	},
	price: {
		marginRight: 7,
		fontSize: 14,
		fontWeight: 'bold',
	},
	quantity: {
		marginLeft: 15,
		marginRight: 5,
		fontSize: 14,
		fontWeight: 'bold',
	},
	foodText: {
		fontSize: 14,
		marginTop: 20,
	},
})

export default FoodOption
