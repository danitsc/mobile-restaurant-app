import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { create } from 'apisauce'

// define the api
const api = create({
	baseURL: 'http://localhost:5000',
})
const Header = ({ navigation }) => {
	const [data, setData] = useState(null)
	
	return (
		<View style={styles.burgerMenuView}>
			{/* <Text onPress={clickMe}>Click me !</Text> */}
			<View style={styles.title}>
				<Text style={styles.titleText}>Restuarant App</Text>
				{data ? <Text>{data}</Text> : null}
			</View>
			{/* <Button
				onPress={() => navigation.navigate('Checkout')}
				title={'CART'}
				color='white'
			/> */}
		</View>
	)
}

const styles = StyleSheet.create({
	burgerMenuView: {
		height: 50,
		backgroundColor: '#ff2a1f',
		alignItems: 'center',
		flexDirection: 'row',
	},
	title: {
		flex: 1,
		alignItems: 'center',
	},
	titleText: {
		fontSize: 16,
	},
	burgerMenu: {
		borderBottomWidth: 2,
		padding: 2,
		width: 25,
		marginLeft: 10,
		borderBottomColor: 'black',
	},
})

export default Header
