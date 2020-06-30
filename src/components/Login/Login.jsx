import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import jwtDecode from 'jwt-decode'

import {
	createUserWithEmailAndPasswordHandler,
	signInWithEmailAndPasswordHandler,
} from '../auth/firebaseAuth'

import { AsyncStorage } from 'react-native'

import { create } from 'apisauce'

import { Context } from '../../context/dataContext'

const api = create({
	baseURL: 'http://192.168.100.2:5000',
	headers: { Accept: 'application/json' },
})

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const Login = ({ toggleLoginComponent }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({ isError: false, reason: '' })

	const { state, ADD_AUTH_INFO } = useContext(Context)

	const handleSignIn = async event => {
		try {
			const user = await signInWithEmailAndPasswordHandler(
				event,
				email,
				password
			)
			if (!user.success) {
				setError({ isError: true, reason: user.reason })
			} else {
				const { data } = user
				const { xa: apiKey } = data
				const decode = jwtDecode(apiKey)
				const { user_id, email: decodedEmail } = decode
				const { data: getUserInfo } = await api.get(
					`/api/users/info/${email.toLowerCase()}`
				)
				if (getUserInfo.success) {
					const { data: userData } = getUserInfo
					ADD_AUTH_INFO(userData)
				}
				await AsyncStorage.setItem('key', apiKey)
			}
		} catch (e) {
			setError({ isError: true, reason: `Something went wrong. Try again` })
			console.log(`Couldn't sign in: ${e}`, e)
		}
	}
	return (
		<View style={styles.container}>
			<View>
				<Text style={{ fontSize: 24, marginBottom: 40 }}>Restaurant App</Text>
			</View>
			<View style={styles.inputView}>
				<TextInput
					onChangeText={mail => setEmail(mail)}
					label='Email'
					placeholder='Email'
					style={styles.input}
				/>
				<TextInput
					value={password}
					onChangeText={pass => setPassword(pass)}
					label='Password'
					placeholder='Password'
					secureTextEntry={true}
					style={styles.input}
				/>
			</View>
			{error.isError && (
				<View style={styles.errorMessageView}>
					<Text style={styles.errorMessageReason}>{error.reason}</Text>
				</View>
			)}
			<View style={styles.loginView}>
				<TouchableOpacity onPress={handleSignIn}>
					<Text style={styles.loginButton}>Log In</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.signupView}>
				<Text style={styles.signupTextInfo}>Don't have an account?</Text>
				<TouchableOpacity onPress={toggleLoginComponent}>
					<Text style={styles.signupText}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	errorMessageView: {
		// justifyContent: 'space-between',
		// resizeMode: 'contain',
		// flexDirection: 'column',
		justifyContent: 'center',
		width: deviceWidth / 1.5,
	},
	signupTextInfo: {
		fontSize: 15,
		color: 'black',
		// fontWeight: 'bold',
	},
	signupText: {
		color: '#ff1c49',
		marginLeft: 7,
		fontSize: 15,
	},
	signupView: {
		flexDirection: 'row',
		padding: 10,
	},
	imageStyle: {
		resizeMode: 'contain',
		width: deviceWidth / 1.4,
		height: deviceHeight / 4.5,
		opacity: 0.8,
		backgroundColor: '#fff6f2',
	},
	logoView: {
		height: 44,
	},
	logoMessage: {
		height: 44,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 26,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: '#fff6f2',
		backgroundColor: 'white',
	},
	inputView: {
		marginTop: 15,
	},
	input: {
		width: deviceWidth / 1.5,
		height: 44,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#bccbe0',
		borderRadius: 5,
		marginBottom: 15,
		// backgroundColor: '#f7f7f2',
	},
	inputext: {
		width: deviceWidth / 1.4,
		height: 44,
		padding: 10,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 26,
	},
	buttons: {
		flexDirection: 'row',
		width: deviceWidth / 1.4,
		justifyContent: 'space-around',
	},
	errorMessageReason: {
		textAlign: 'center',
	},
	forgotMessage: {
		fontSize: 13,
		color: '#4343f7',
		textAlign: 'center',
		marginTop: 7,
		opacity: 0.7,
	},
	loginButton: {
		width: deviceWidth / 1.4,
		padding: 7,
		textAlign: 'center',
		color: 'white',
	},
	loginView: {
		backgroundColor: '#ff1c49',
		marginTop: 20,
		fontSize: 13,
		borderRadius: 5,
		opacity: 0.7,
		marginBottom: 10,
	},
})

export default Login
