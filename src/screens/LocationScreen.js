import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'

const LocationScreen = ({ navigation }) => {
	return (
		<View style={styles.backgroundLocation}>
			<Header navigation={navigation} />
			<View>
				<Text>Location Screen</Text>
			</View>
			{/* <Footer navigation={navigation} /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundLocation: {
		flex: 1,
	},
})

export default LocationScreen
