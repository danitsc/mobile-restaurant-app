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

import { create } from 'apisauce'

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
	const [user, setUser] = useState({ isConnected: false, key: '' })

	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				const apiKey = await AsyncStorage.getItem('key')
				if (apiKey) {
					setUser({ isConnected: true, key: apiKey })
				} else {
					console.log(`No api key in storage...`)
				}
			} catch (e) {
				console.log(`Error checking user status: ${e}`)
			}
		}
		checkUserStatus()
	}, [])

	const connectUser = key => {
		setUser({ isConnected: true, key })
	}

	return (
		<View style={styles.homeBackground}>
			<Provider>
				{user.isConnected ? (
					<AppContainer />
				) : (
					<Login connectUser={connectUser} />
				)}
			</Provider>
		</View>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
	},
})

export default App
