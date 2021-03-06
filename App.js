import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native'

import { NativeRouter, Route, Link, Redirect } from 'react-router-native'

import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import OrdersScreen from './src/screens/Orders'
import Login from './src/screens/LoginScreen'

import { Provider } from './src/context/dataContext'
import AppContainer from './AppContainer'

import { getStatusBarHeight } from 'react-native-status-bar-height'
import { HeaderBackground } from 'react-navigation-stack'

console.log(getStatusBarHeight())

const App = () => {
	return (
		<>
			<SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
			<SafeAreaView style={styles.homeBackground}>
				<Provider>
					<AppContainer />
				</Provider>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	homeBackground: {
		flex: 1,
	},
})

export default App
