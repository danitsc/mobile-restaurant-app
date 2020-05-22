import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'

const ProfileScreen = ({ navigation }) => {
	return (
		<View style={styles.backgroundReservation}>
			<Header navigation={navigation} />
			<View>
				<Text>Profile Screen</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundReservation: {
		flex: 1,
	},
})

export default ProfileScreen
