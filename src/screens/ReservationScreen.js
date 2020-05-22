import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'

const ReservationScreen = ({ navigation }) => {
	return (
		<View style={styles.backgroundReservation}>
			<Header navigation={navigation} />
			<View>
				<Text>Reservation Screen</Text>
			</View>
			{/* <Footer navigation={navigation} /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundReservation: {
		flex: 1,
	},
})

export default ReservationScreen
