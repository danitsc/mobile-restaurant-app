import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	AsyncStorage,
	TouchableOpacity,
	Dimensions,
	Image,
} from 'react-native'

// import jwtDecode from 'jwt-decode'

import {
	createUserWithEmailAndPasswordHandler,
	signInWithEmailAndPasswordHandler,
} from '../components/auth/firebaseAuth'
import { Context } from '../context/dataContext'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const restaurantLogo = require('../../assets/homescreen/restaurantLogo_test_4.jpeg')

const LoginScreen = ({ connectUser }) => {
	const [error, setError] = useState({ isError: false, reason: '' })
	const [showRegister, setShowRegister] = useState(false)

	const toggleLoginComponent = () => {
		setShowRegister(!showRegister)
		console.log(`Rendering register screen..`)
	}

	return (
		<View style={styles.container}>
			{showRegister ? (
				<Register toggleLoginComponent={toggleLoginComponent} />
			) : (
				<Login
					connectUser={connectUser}
					toggleLoginComponent={toggleLoginComponent}
					error={error}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#fff6f2',
		backgroundColor: 'white',
	}
})
export default LoginScreen
