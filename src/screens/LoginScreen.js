import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	AsyncStorage,
} from 'react-native'
import jwtDecode from 'jwt-decode'
import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'
import {
	createUserWithEmailAndPasswordHandler,
	signInWithEmailAndPasswordHandler,
} from '../components/auth/firebaseAuth'
import { Context } from '../context/dataContext'

const LoginScreen = ({ connectUser }) => {
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
				setError({ isError: true, reason: `Wrong email or password.` })
			} else {
				const { data } = user
				const { xa: apiKey } = data
				const decode = jwtDecode(apiKey)
				const { user_id, email: decodedEmail } = decode
				ADD_AUTH_INFO(event, decodedEmail, user_id)
				connectUser(apiKey)
				await AsyncStorage.setItem('key', apiKey)
			}
		} catch (e) {
			setError({ isError: true, reason: `Something went wrong. Try again` })
			console.log(`Couldn't sign in: ${e}`, e)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.inputext}>Sign in</Text>
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

			<Button title={'Login'} style={styles.input} onPress={handleSignIn} />
			{error.isError && <Text>{error.reason}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00FFFF',
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 3,
		marginBottom: 10,
	},
	inputext: {
		width: 200,
		height: 44,
		padding: 10,
		textAlign: 'center',
		fontWeight: 'bold',
		borderBottomWidth: 3,
		borderColor: 'black',
		marginBottom: 6,
	},
})
export default LoginScreen
