import React, { useState, useContext, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	Button,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	TextInput,
} from 'react-native'

import { Context } from '../../context/dataContext'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { create } from 'apisauce'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

const api = create({
	baseURL: 'http://192.168.100.2:5000',
	headers: {
		Accept: 'application/json',
	},
})

const deviceWidth = Dimensions.get('window').width

import Icon from 'react-native-vector-icons/Entypo'

const RestaurantMenu = ({ match }) => {
	const { state } = useContext(Context)
	useEffect(() => {
		const requestPermissions = async () => {
			console.log('statusuuu', Constants.platform)
			if (Constants.platform.ios) {
				try {
					const {
						status,
					} = await ImagePicker.requestCameraRollPermissionsAsync()
					if (status !== 'granted') {
						alert('Sorry, we need camera roll permissions to make this work!')
					}
				} catch (e) {
					console.log(`Couldn't request permissions: ${e}`)
				}
			}
		}
		requestPermissions()
	}, [])

	const chooseImage = () => {
		let options = {
			title: 'Select Image',
			customButtons: [
				{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
			],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		}
		// ImagePicker.showImagePicker(options, response => {
		// 	console.log('Response = ', response)

		// 	if (response.didCancel) {
		// 		console.log('User cancelled image picker')
		// 	} else if (response.error) {
		// 		console.log('ImagePicker Error: ', response.error)
		// 	} else if (response.customButton) {
		// 		console.log('User tapped custom button: ', response.customButton)
		// 		alert(response.customButton)
		// 	} else {
		// 		const source = { uri: response.uri }

		// 		// You can also display the image using data:
		// 		// const source = { uri: 'data:image/jpeg;base64,' + response.data };
		// 		// alert(JSON.stringify(response));s
		// 		console.log('response', JSON.stringify(response))
		// 		// this.setState({
		// 		// 	filePath: response,
		// 		// 	fileData: response.data,
		// 		// 	fileUri: response.uri,
		// 		// })
		// 	}
		// })
	}
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		console.log('hmm', result)

		if (!result.cancelled) {
			const data = new FormData()
			data.append('image', {
				uri: result.uri,
				type: result.type,
				name: 'plm.jpg',
			})
			const config = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				body: data,
			}
			console.log('ooook')
			fetch(
				'http://192.168.100.2:5000/api/restaurant/addRestaurantImage',
				config
			)
				.then(checkStatusAndGetJSONResponse => {
					console.log('fmm', 'dafuuuck', checkStatusAndGetJSONResponse)
				})
				.catch(err => {
					console.log('aici err??', err)
				})

			// data.append('image', {
			// 	uri: result.uri,
			// 	type: result.type,
			// 	name: 'plm',
			// })
			// await api.post(
			// 	'/api/restaurant/addRestaurantImage',
			// 	{
			// 		data,
			// 	},
			// 	{
			// headers: {
			// 	Accept: 'application/json',
			// 	'Content-Type': 'multipart/form-data',
			// },
			// 	}
			// )
			// setImage(result.uri)
		}
	}
	return (
		<View style={styles.addRestaurantContainer}>
			<View>
				<TouchableOpacity onPress={() => history.push('/profile')}>
					<AntIcon size={34} name='back' color='red' />
				</TouchableOpacity>
				<Text
					style={{
						alignSelf: 'center',
						fontWeight: 'bold',
						fontSize: 20,
						color: 'grey',
					}}
					onPress={chooseImage}
				>
					ADD RESTAURANT
				</Text>
				<Button title='Pick an image from camera roll' onPress={pickImage} />
			</View>
			<View style={styles.contactInfoView}>
				<View style={styles.contactInfoOptions}>
					<View style={styles.contactOption}>
						<TextInput
							// onChangeText={value => setFirstName(value)}
							value={''}
							style={styles.text}
						/>
						<Text style={styles.text}>Restaurant Name</Text>
					</View>
					<View style={styles.contactOption}>
						<TextInput
							// onChangeText={value => setLastName(value)}
							value={''}
							style={styles.text}
						/>
						<Text style={styles.text}>Phone Number</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	addRestaurantContainer: {
		flex: 1,
		margin: 30,
	},
	inputView: {
		marginTop: 15,
	},
	text: {
		color: '#757171',
	},
	contactOption: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 9,
		borderBottomColor: '#757171',
		borderBottomWidth: 0.3,
	},
	contactInfoView: {
		marginTop: 30,
	},
})

export default RestaurantMenu
