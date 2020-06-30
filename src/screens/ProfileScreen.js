import React, { useContext, useState, useEffect } from 'react'
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

import { NativeRouter, Route, Link } from 'react-router-native'

import MapView, { Geojson } from 'react-native-maps'

import { Context } from '../context/dataContext'

const deviceWidth = Dimensions.get('window').width

const ProfileScreen = ({}) => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState({ isError: false, message: '' })
	const [disabled, setDisabled] = useState(true)

	const { state, LOG_OUT } = useContext(Context)
	const logOut = async () => {
		await AsyncStorage.removeItem('key')
		LOG_OUT()
	}

	useEffect(() => {
		setFirstName(state.user.firstName)
		setLastName(state.user.lastName)
		setEmail(state.user.email)
		setPhone(state.user.phoneNumber)
	}, [])

	useEffect(() => {
		if (
			firstName == state.user.firstName &&
			lastName == state.user.lastName &&
			email == state.user.email &&
			phone == state.user.phoneNumber
		) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}, [firstName, lastName, email, phone])

	const updateProfile = () => {
		if (!firstName || !lastName || !email || !phone) {
			return setError({ isError: true, message: 'Please complete all fields.' })
		}
	}

	return (
		<SafeAreaView style={styles.backgroundProfile}>
			<View>
				<View>
					<Text style={styles.infoTitle}>CONTACT INFORMATION</Text>
				</View>
				<View style={styles.contactInfoView}>
					<View style={styles.contactInfoOptions}>
						<View style={styles.contactOption}>
							<TextInput
								onChangeText={value => setFirstName(value)}
								value={firstName}
								style={styles.text}
							/>
							<Text style={styles.text}>First name</Text>
						</View>
						<View style={styles.contactOption}>
							<TextInput
								onChangeText={value => setLastName(value)}
								value={lastName}
								style={styles.text}
							/>
							<Text style={styles.text}>Last name</Text>
						</View>
						<View style={styles.contactOption}>
							<TextInput
								onChangeText={value => setEmailz(value)}
								value={email}
								style={styles.text}
							/>
							<Text style={styles.text}>Email</Text>
						</View>
						<View style={styles.contactOption}>
							<TextInput
								onChangeText={value => setPhone(value)}
								value={phone}
								style={styles.text}
							/>
							<Text style={styles.text}>Phone</Text>
						</View>
					</View>
				</View>
				<View>
					<Text style={styles.infoTitle}>SETTINGS</Text>
				</View>
				<View>
					<View style={styles.contactOption}>
						<TextInput
							onChangeText={value => setPassword(value)}
							value={password}
							placeholder='**********'
							secureTextEntry={true}
							style={styles.text}
						/>
						<Text style={styles.text}>Change password</Text>
					</View>
				</View>
				<View
					style={{
						backgroundColor: '#9c8180',
						alignItems: 'center',
						marginTop: 20,
						alignSelf: 'flex-end',
						maxWidth: 500,
						width: deviceWidth / 2.5,
						borderRadius: 3,
						paddingTop: 6,
						paddingBottom: 6,
					}}
				>
					<TouchableOpacity onPress={() => console.log('clicked')}>
						<Link to='/manageRestaurants'>
							<Text style={styles.manageProfile}>Manage Restaurants</Text>
						</Link>
					</TouchableOpacity>
				</View>
				<View
					style={{
						backgroundColor: disabled ? '#858284' : '#a7de83',
						alignItems: 'center',
						alignSelf: 'center',
						width: deviceWidth / 1.5,
						borderRadius: 3,
						marginTop: 40,
						padding: 10,
					}}
				>
					<TouchableOpacity onPress={updateProfile} disabled={disabled}>
						<Text style={{ color: disabled ? '#fa9791' : 'white' }}>
							Update Profile Settings
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.logOutView}>
				<View>
					<TouchableOpacity onPress={logOut}>
						<Text style={styles.logOutText}>Log out</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundProfile: {
		flex: 1,
		justifyContent: 'space-between',
		// backgroundColor: '#ebeded',
		margin: 30,
	},
	contactInfoView: {
		backgroundColor: 'white',
		marginTop: 20,
	},
	contactOption: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 9,
		borderBottomColor: '#757171',
		borderBottomWidth: 0.3,
	},
	infoTitle: {
		textAlign: 'center',
		marginTop: 20,
		fontWeight: 'bold',
		fontSize: 16,
	},
	logOutView: {
		// backgroundColor: 'transparent',
		width: deviceWidth / 2,
		alignSelf: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},
	logOutText: {
		fontSize: 20,
	},
	text: {
		color: '#757171',
	},
	// updateProfileText: {
	// 	color: '#fa9791',
	// },
	updateProfile: {
		// backgroundColor: '#e612a6',
		alignItems: 'center',
		width: deviceWidth / 1.5,
		alignSelf: 'center',
		marginTop: 30,
		borderRadius: 3,
		padding: 10,
	},
	manageProfile: {
		color: 'white',
		// fontWeight: '',
		fontSize: 13,
	},
	options: {
		flexDirection: 'row',
		marginTop: 30,
		justifyContent: 'space-between',
	},
})

export default ProfileScreen
