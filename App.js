// import React from 'react'
// import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
// import AppNavigator from './src/utils/AppNavigator'
// // import { NativeRouter, Route, Link } from 'react-router-native'
// // import { Router, Scene } from 'react-native-router-flux'
import { Provider } from './src/context/cartContext'

import Header from './src/components/overall/Header'
import HomeScreen from './src/screens/HomeScreen'
// // import Home from './src/screens/Home'
import LocationScreen from './src/screens/LocationScreen'
import ReservationScreen from './src/screens/ReservationScreen'
import MenuScreen from './src/screens/MenuScreen'
import CheckoutScreen from './src/screens/CheckoutScreen'
// const App = () => {
// 	return (
// 		<Provider>
// 			<View style={{ flex: 1 }}>
// 				{/* <Header /> */}
// 				<AppNavigator />
// 			</View>
// 		</Provider>
// 	)
// }

// // const styles = StyleSheet.create({})

// export default App

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

const bottomTabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='home' size={25} color={tintColor} />
				),
			},
		},
		Search: {
			screen: MenuScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='Menu' size={25} color={tintColor} />
				),
			},
		},
		Reservation: {
			screen: ReservationScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='reservation' size={25} color={tintColor} />
				),
			},
		},
		// LocationScreen: {
		// 	screen: LocationScreen,
		// 	navigationOptions: {
		// 		tabBarIcon: ({ tintColor }) => (
		// 			<Icon name='Location' size={25} color={tintColor} />
		// 		),
		// 	},
		// },
	},
	{
		initialRouteName: 'Home',
		tabBarOptions: {
			activeTintColor: '#eb6e3d',
		},
	}
)

const AppContainer = createAppContainer(bottomTabNavigator)

// const App = () => {
// 	return (
// <Provider>
// <View style={{ flex: 1 }}>
// <Header />
// <AppContainer />
// </View>
// </Provider>
// 	)
// }

const App = () => {
	return (
		<Provider>
			<AppContainer />
		</Provider>
	)
}

const styles = StyleSheet.create({})

export default App
