import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation'
import {
	createBottomTabNavigator,
	createStackNavigator,
} from 'react-navigation-tabs'
import { NavigationContainer } from '@react-navigation/native'

import { AsyncStorage } from 'react-native'
import {
	FontAwesome as AwesomeIcon,
	MaterialCommunityIcons as MaterialIcon,
} from 'react-native-vector-icons'

import { Provider, Context } from './src/context/dataContext'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import OrdersScreen from './src/screens/Orders'
import Login from './src/screens/LoginScreen'

import jwt_decode from 'jwt-decode'

import { create } from 'apisauce'

const api = create({
	baseURL: 'http://192.168.100.2:5000',
	headers: { Accept: 'application/json' },
})

const deviceWidth = Dimensions.get('window').width

const bottomTabNavigator = createBottomTabNavigator(
	{
		Search: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<AwesomeIcon name='home' size={20} color={tintColor} />
				),
			},
		},
		Orders: {
			screen: OrdersScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcon name='account' size={20} color={tintColor} />
				),
			},
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcon name='account' size={20} color={tintColor} />
				),
			},
		},
	},
	{
		initialRouteName: 'Search',
		tabBarPosition: 'bottom',
		tabBarOptions: {
			activeTintColor: 'red',
			style: {
				backgroundColor: '#fafafa',
			},
		},
		defaultNavigationOptions: {
			cardStyle: { backgroundColor: 'green' },
		},
	}
)

const AppContainer = createAppContainer(bottomTabNavigator)

const App = () => {
	const { state, ADD_AUTH_INFO } = useContext(Context)

	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				const apiKey = await AsyncStorage.getItem('key')
				// console.log('apikey', apiKey)
				if (apiKey && !state.user?.email) {
					const decoded = jwt_decode(apiKey)
					const { email } = jwt_decode(apiKey)
					if (email) {
						const { data: getUserInfo } = await api.get(
							`/api/users/info/${email}`
						)
						if (getUserInfo.success) {
							const { data: userData } = getUserInfo
							ADD_AUTH_INFO(userData)
						}
					}
				}
			} catch (e) {
				console.log('vreo eroare?', e)
				return {
					success: false,
					reason: `Couldn't get user data`,
				}
			}
		}

		checkUserStatus()
	}, [])

	return (
		<View style={styles.homeBackground}>
			{state.user?.email ? <AppContainer /> : <Login />}
		</View>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
	},
})

export default App
