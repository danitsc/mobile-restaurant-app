import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from 'react-native'

import { create } from 'apisauce'

import { createUserWithEmailAndPasswordHandler } from '../auth/firebaseAuth'

const api = create({
	baseURL: 'http://192.168.100.2:5000',
	headers: { Accept: 'application/json' },
})

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const Register = ({ toggleLoginComponent }) => {
	const [signUpData, setSignUpData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [error, setError] = useState({ isError: false, reason: '' })
	const [registerDone, setRegisterDone] = useState(false)

	const handleError = reason => {
		setTimeout(() => setError({ isError: false, reason: '' }), 2000)
		setError({ isError: true, reason })
	}

	const handleSignup = async event => {
		const {
			firstName,
			lastName,
			phoneNumber,
			email,
			password,
			confirmPassword,
		} = signUpData

		const isEveryFieldCompleted = Object.keys(signUpData).every(
			key => signUpData[key] !== ''
		)

		if (!isEveryFieldCompleted) {
			const reason = 'Please complete all fields before we move on'
			return handleError(reason)
		}
		if (password !== confirmPassword) {
			const reason = `Password and Confirm password fields don't match.`
			return handleError(reason)
		}
		try {
			const createUser = await createUserWithEmailAndPasswordHandler(
				event,
				email.toLowerCase(),
				password
			)
			if (!createUser.success) {
				handleError(createUser.reason)
			} else {
				const { data: addUserInES } = await api.post('/api/users/addNewUser', {
					firstName,
					lastName,
					phoneNumber,
					email: email.toLowerCase(),
					role: 'user'
				})
				if (addUserInES.success) {
					const { message } = addUserInES
					console.log(message)
				} else {
					const { reason } = addUserInES
					return handleError(reason)
				}
				setRegisterDone(true)
				toggleLoginComponent()
			}
		} catch (e) {
			console.log(`Error on signup: ${e}`)
			const reason = `Couldn't register. try again please`

			handleError(reason)
		}
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={{ fontSize: 24, marginBottom: 40 }}>Restaurant App</Text>
			</View>
			<View style={styles.inputView}>
				<TextInput
					onChangeText={firstName =>
						setSignUpData({ ...signUpData, firstName })
					}
					label='First Name'
					placeholder='First Name'
					style={styles.input}
				/>
				<TextInput
					onChangeText={lastName => setSignUpData({ ...signUpData, lastName })}
					label='Last Name'
					placeholder='Last Name'
					style={styles.input}
				/>
				<TextInput
					onChangeText={phoneNumber =>
						setSignUpData({ ...signUpData, phoneNumber })
					}
					label='Phone Number'
					placeholder='Phone Number'
					style={styles.input}
				/>
				<TextInput
					onChangeText={email => setSignUpData({ ...signUpData, email })}
					label='Email'
					placeholder='Email'
					style={styles.input}
				/>
				<TextInput
					value={signUpData.password}
					onChangeText={password => setSignUpData({ ...signUpData, password })}
					label='Password'
					placeholder='Password'
					secureTextEntry={true}
					style={styles.input}
				/>
				<TextInput
					value={signUpData.confirmPassword}
					onChangeText={confirmPassword =>
						setSignUpData({ ...signUpData, confirmPassword })
					}
					label='Confirm password'
					placeholder='Confirm password'
					secureTextEntry={true}
					style={styles.input}
				/>
			</View>
			{error.isError && (
				<View style={styles.errorMessageView}>
					<Text>{error.reason}</Text>
				</View>
			)}
			{registerDone && (
				<View>
					<Text style={{ color: 'black' }}>Register succeeded</Text>
				</View>
			)}
			<View>
				<View style={styles.signupView}>
					<TouchableOpacity onPress={handleSignup}>
						<Text style={styles.signupButton}>Sign Up</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.loginView}>
					<Text style={{ textAlign: 'center' }}>Or go to </Text>

					<TouchableOpacity onPress={toggleLoginComponent}>
						<Text style={styles.loginButton}>login</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* <View style={styles.signupView}>
				<Text style={styles.signupTextInfo}>Don't have an account?</Text>
				<TouchableOpacity onPress={showRegisterScreen}>
					<Text style={styles.signupText}>Sign up</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	)
}

const styles = StyleSheet.create({
	errorMessageView: {
		justifyContent: 'space-between',
		flexDirection: 'row',
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
	// signupView: {
	// 	flexDirection: 'row',
	// 	padding: 10,
	// },
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
	button: {
		fontSize: 13,
		color: '#4343f7',
		marginLeft: 6,
		opacity: 0.7,
	},
	signupButton: {
		width: deviceWidth / 1.4,
		padding: 7,
		textAlign: 'center',
		color: 'white',
	},
	signupView: {
		backgroundColor: '#ff1c49',
		marginTop: 20,
		fontSize: 13,
		borderRadius: 5,
		opacity: 0.7,
		marginBottom: 10,
	},
	loginButton: {
		color: 'red',
		marginLeft: 3,
	},
	loginView: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
})

export default Register
