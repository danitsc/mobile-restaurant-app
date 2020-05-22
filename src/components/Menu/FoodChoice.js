import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	Dimensions,
	ImageBackground,
	Button,
	TouchableOpacity,
	Alert,
} from 'react-native'

import Footer from '../overall/Footer'
import Header from '../overall/Header'

// import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import FoodOption from './FoodOption'
const deviceWidth = Dimensions.get('window').width

// Single general image for now, change it later...
// const generalImage = require('../assets/breakfast.jpeg')
const img = require('../../../assets/breakfast.jpeg')

const FoodChoices = ({ navigation, item, goBackToMainMenu }) => {
	const [menuChoices, setMenuChoices] = useState([
		{
			title: 'Food 1',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 2',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 3',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 4',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 5',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 6',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 7',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 8',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 9',
			imageSrc: img,
			price: 5,
		},
		{
			title: 'Food 10',
			imageSrc: img,
			price: 5,
		},
	])

	const [foodChosen, setFoodChosen] = useState(false)
	return (
		<View style={styles.backgroundMenu}>
			<View style={styles.containerOption}>
				<Button
					onPress={goBackToMainMenu}
					title='Go back'
					color='#841584'
					accessibilityLabel='Learn more about this purple button'
				/>

				{!foodChosen ? (
					<FlatList
						// horizontal={false}
						numColumns={2}
						data={menuChoices}
						renderItem={({ item }) => (
							// <View style={styles.containerOption} key={item.title}>
							// 	<Image style={styles.containerImage} source={item.imageSrc} />
							// 	<Text style={styles.containerText}>{item.title}</Text>
							// </View>

							<TouchableOpacity
								style={styles.choiceArea}
								key={item.title}
								onPress={() => setFoodChosen(true)}
							>
								<Image source={item.imageSrc} style={styles.foodImg}></Image>
								<View style={styles.foodInfo}>
									<Text style={styles.foodName}>{item.title}</Text>
									<Text style={styles.foodPrice}>${item.price}</Text>
								</View>
							</TouchableOpacity>
						)}
						keyExtractor={item => item.title}
						style={styles.foodList}
					/>
				) : (
					<FoodOption />
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundMenu: {
		// flex: 1,
		// backgroundColor: '#fffaaa',
		opacity: 0.9,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	foodImg: {
		width: deviceWidth / 2 - 30,
		height: 150,
	},
	foodName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	foodPrice: {
		fontSize: 13,
		color: 'grey',
		opacity: 0.9,
	},
	foodInfo: {
		alignItems: 'center',
	},
	containerOption: {
		// flex: 1,
		// alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 100,
	},
	foodList: {
		// borderWidth: 2,
		// borderColor: 'blue',
		// flexDirection: 'row',
	},
	selectFood: {
		flexDirection: 'row',
	},
	choiceArea: {
		marginHorizontal: 7,
		marginVertical: 7,
		borderWidth: 0.5,
		borderRadius: 3,
		borderColor: 'grey',
	},
})

export default FoodChoices
