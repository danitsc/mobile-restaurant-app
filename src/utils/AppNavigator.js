import { createStackNavigator } from 'react-navigation-stack'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
// import 'react-native-gesture-handler'
import React from 'react'
// import { NativeRouter, Route, Link } from 'react-router-native'
// import { Router, Scene } from 'react-native-router-flux'

// import Home from '../screens/Home'
import HomeScreen from '../screens/HomeScreen'
import LocationScreen from '../screens/LocationScreen'
import ReservationScreen from '../screens/ReservationScreen'
import MenuScreen from '../screens/MenuScreen'
import CheckoutScreen from '../screens/CheckoutScreen'

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
		},
		Location: {
			screen: LocationScreen,
		},
		// Reservation: ReservationScreen,
		Menu: {
			screen: MenuScreen,
		},
		// Checkout: CheckoutScreen,
	},
	{
		initialRouteName: 'Menu',
	}
)

const App = createAppContainer(AppNavigator)

export default App
// const AppNavigator = () => (
// 	<Router>
// 		<Scene key='root'>
// 			<Scene key='home' component={HomeScreen} title='Home' initial={true} />
// 			<Scene key='reservations' component={ReservationScreen} title='reservations' />
// 		</Scene>
// 	</Router>
// )

// export default AppNavigator
