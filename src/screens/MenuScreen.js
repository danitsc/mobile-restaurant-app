import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	Image,
	Dimensions,
	ImageBackground,
	Button,
	TouchableOpacity,
	Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'
import FoodChoice from '../components/Menu/FoodChoice'

const deviceWidth = Dimensions.get('window').width

// Single general image for now, change it later...
const img = require('../../assets/breakfast.jpeg')

const MenuScreen = ({ navigation }) => {
	const [menuOptions, setMenuOptions] = useState([
		{
			title: 'Appetizers',
			imageSrc: img,
		},
		{
			title: 'Breakfast',
			imageSrc: img,
		},
		{
			title: 'Desert',
			imageSrc: img,
		},
		{
			title: 'Dinner',
			imageSrc: img,
		},
	])

	const [menuChosen, setMenuChosen] = useState(false)

	const comeBackToMainMenu = () => {
		setMenuChosen(false)
	}

	return (
		<SafeAreaView style={styles.backgroundMenu}>
			<Header navigation={navigation} />
			{!menuChosen ? (
				<FlatList
					data={menuOptions}
					renderItem={({ item }) => (
						// <View style={styles.containerOption} key={item.title}>
						// 	<Image style={styles.containerImage} source={item.imageSrc} />
						// 	<Text style={styles.containerText}>{item.title}</Text>
						// </View>

						<TouchableOpacity
							style={styles.containerOption}
							key={item.title}
							onPress={() => setMenuChosen(true)}
						>
							<ImageBackground
								source={item.imageSrc}
								style={styles.containerImage}
							>
								<Text style={styles.containerText}>{item.title}</Text>
							</ImageBackground>
						</TouchableOpacity>
					)}
					keyExtractor={item => item.title}
					style={styles.mainMenu}
				/>
			) : (
				<FoodChoice
					navigation={navigation}
					goBackToMainMenu={comeBackToMainMenu}
				/>
			)}
			{/* <Footer navigation={navigation} /> */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundMenu: {
		flex: 1,
		// backgroundColor: '#fffaaa',
		opacity: 0.9,
	},
	containerOption: {
		flex: 1,
		height: 250,
		alignItems: 'center',
	},
	containerImage: {
		flex: 1,
		width: deviceWidth - 20,
		marginVertical: 5,
		resizeMode: 'contain',
		justifyContent: 'flex-end',
		// shadowOpacity: 0.2,
		// opacity: 0.8
		shadowOffset: { width: 7, height: 7 },
		shadowColor: '#000',
		shadowOpacity: 0.2,
		elevation: 10,
		backgroundColor: '#000',
	},
	containerText: {
		fontSize: 25,
		color: 'red',
	},
	mainMenu: {
		marginBottom: 40,
	},
})

export default MenuScreen
