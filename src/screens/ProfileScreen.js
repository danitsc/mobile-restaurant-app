import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	AsyncStorage,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import Header from '../components/overall/Header'

const deviceWidth = Dimensions.get('window').width

const ProfileScreen = ({}) => {
	const logOut = async () => {
		await AsyncStorage.removeItem('key')
	}
	return (
		<SafeAreaView style={styles.backgroundReservation}>
			<View style={styles.infoView}>
				<Text style={styles.infoTitle}>CONTACT INFORMATION</Text>
			</View>
			<View style={styles.logOutView}>
				<TouchableOpacity onPress={logOut}>
					<Text>Log Out</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundReservation: {
		flex: 1,
	},
	infoView: {
		// textAlign: 'center'
	},
	infoTitle: {
		textAlign: 'center',
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 16,
	},
	logOutView: {
		backgroundColor: 'red',
		width: deviceWidth / 2,
		alignSelf: 'center',
		justifyContent: 'flex-end'
	},
})

export default ProfileScreen
