import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AsyncStorage } from 'react-native'
import {
	FontAwesome as AwesomeIcon,
	MaterialCommunityIcons as MaterialIcon,
} from 'react-native-vector-icons'

import { Provider, Context } from './src/context/dataContext'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import Login from './src/screens/LoginScreen'

import { create } from 'apisauce'

const bottomTabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<AwesomeIcon name='home' size={25} color={tintColor} />
				),
			},
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcon name='account' size={25} color={tintColor} />
				),
			},
		},
	},
	{
		initialRouteName: 'Home',
		tabBarOptions: {
			activeTintColor: '#eb6e3d',
		},
	}
)

const AppContainer = createAppContainer(bottomTabNavigator)

const App = () => {
	const [user, setUser] = useState({ isConnected: false, key: '' })
	useEffect(() => {
	    const checkUserStatus = async () => {
			try {
				const apiKey = await AsyncStorage.getItem('key')
				if(apiKey) {
					setUser({ isConnected: true, key: apiKey })
				} else {
					console.log(`No api key in storage...`)
				}
			} catch(e) {
				console.log(`Error checking user status: ${e}`)
			}
		}
		checkUserStatus()
	}, [])

	const connectUser = key => {
		setUser({ isConnected: true, key })
	}

	return (
		<Provider>
			{user.isConnected ? (
				<AppContainer />
			) : (
				<Login connectUser={connectUser} />
			)}
		</Provider>
	)
}

const styles = StyleSheet.create({})

export default App
