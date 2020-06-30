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

import {
	NativeRouter,
	Route,
	Link,
	Redirect,
	useHistory,
} from 'react-router-native'

import { Provider, Context } from './src/context/dataContext'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import OrdersScreen from './src/screens/Orders'
import Login from './src/screens/LoginScreen'
import RestaurantMenu from './src/components/Menu/RestaurantMenu'
import AddRestaurant from './src/components/Restaurant/AddRestaurant'
import jwt_decode from 'jwt-decode'

import { create } from 'apisauce'
import ManageRestaurants from './src/screens/ManageRestaurants'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
			cardStyle: { backgroundColor: 'blue' },
		},
	}
)

const AppContainer = createAppContainer(bottomTabNavigator)

const BottomNavigation = () => {
	let history = useHistory()

	return (
		<View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
			<TouchableOpacity
				style={styles.bottomNav}
				onPress={() => history.push('/')}
			>
				<MaterialIcon name='account' size={20} color={'red'} />
				<Text>Search</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.bottomNav}
				onPress={() => history.push('/orders')}
			>
				{/* <Link to='/orders'> */}
				<MaterialIcon name='account' size={20} color={'red'} />
				<Text>Orders</Text>
				{/* </Link> */}
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.bottomNav}
				onPress={() => history.push('/profile')}
			>
				<MaterialIcon name='account' size={20} color={'red'} />
				<Text>Profile</Text>
			</TouchableOpacity>
		</View>
	)
}

const App = () => {
	const { state, ADD_AUTH_INFO } = useContext(Context)
	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				const apiKey = await AsyncStorage.getItem('key')
				
				// console.log('apikey', apiKey)
				const decoded = jwt_decode(apiKey)
				if (apiKey && !state.user?.email) {
					const { email } = jwt_decode(apiKey)
					console.log('ce plm ba', email)
					if (email) {
						const { data: getUserInfo } = await api.get(
							`/api/users/info/${email}`
						)
						console.log('baaa', getUserInfo)
						if (getUserInfo.success) {
							const { data: userData } = getUserInfo
							ADD_AUTH_INFO(userData)
						}
					}
				}
			} catch (e) {
				return {
					success: false,
					reason: `Couldn't get user data`,
				}
			}
		}
		checkUserStatus()
	}, [])
	const PrivateRoute = ({ component: Component, ...options }) => {
		return (
			<Route
				{...options}
				render={props =>
					state.user?.email ? (
						<Component {...props} />
					) : (
						<Redirect to='/login' />
					)
				}
			/>
		)
	}

	const RedirectRoute = ({ component: Component, ...rest }) => {
		console.log(state)
		return (
			<Route
				{...rest}
				render={props =>
					state.user?.email ? (
						<Redirect to={rest.pathToRedirect} />
					) : (
						<Component {...props} />
					)
				}
			/>
		)
	}

	return (
		<SafeAreaView style={styles.homeBackground}>
			<NativeRouter>
				<PrivateRoute
					exact
					path='/manageRestaurants'
					component={ManageRestaurants}
				/>
				{/* <PrivateRoute exact path='/' component={AppContainer} /> */}
				<PrivateRoute exact path='/' component={HomeScreen} />
				<PrivateRoute exact path='/orders' component={OrdersScreen} />
				<PrivateRoute exact path='/profile' component={ProfileScreen} />
				<PrivateRoute
					exact
					path='/menu/:restaurantId'
					component={RestaurantMenu}
				/>
				<PrivateRoute
					exact
					path='/addNewRestaurant'
					component={AddRestaurant}
				/>
				<RedirectRoute component={Login} pathToRedirect='/' />
				{state.user?.email && <BottomNavigation />}
			</NativeRouter>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
		backgroundColor: 'white',
	},
	bottomNav: {
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
})

export default App
