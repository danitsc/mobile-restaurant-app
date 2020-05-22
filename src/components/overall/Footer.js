import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { Actions, Router, Scene } from 'react-native-router-flux'
import Home from '../../screens/HomeScreen'
import MenuScreen from '../../screens/MenuScreen'


const Footer = ({ navigation }) => {
	// const goToHome = () => {
	// 	Actions.home()
	// }
	// const Home = () => {
	// 	return (
	// 	   <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
	// 		  <Text>This is HOME!</Text>
	// 	   </TouchableOpacity>
	// 	)
	//  }
	//  export default Home

	return (
		<View style={styles.Footer}>
			{/* <Router>
				<Scene key='root'>
					<Scene key='home' component={Home} title='Home' initial={true} />
					<Scene key='about' component={MenuScreen} title='About' />
				</Scene>
			</Router> */}
			{/* <Icon
				// onPress={() => navigation.navigate('Home')}
				onPress={goToHome}
				name='home'
				color='#841584'
				size={35}
			/>
			<Icon
				// onPress={() => navigation.navigate('Menu')}
				onPress={goToReservation}
				name='restaurant-menu'
				color='#841584'
				size={35}
			/>
			<Icon
				onPress={() => navigation.navigate('Reservation')}
				name='home'
				color='#841584'
				size={35}
			/>
			<Icon
				onPress={() => navigation.navigate('Location')}
				name='location-on'
				color='#841584'
				size={35}
			/> */}
		</View>
	)
}

// const Footer = ({ navigation }) => {
// 	const goToHome = () => {
// 	   Actions.home()
// 	}
// 	// const Home = () => {
// 	// 	return (
// 	// 	   <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
// 	// 		  <Text>This is HOME!</Text>
// 	// 	   </TouchableOpacity>
// 	// 	)
// 	//  }
// 	//  export default Home
// 	const goToReservation = () => {
// 		Actions.reservations()
// 	}
// 	return (
// 		<View style={styles.Footer}>
// 			<Icon
// 				// onPress={() => navigation.navigate('Home')}
// 				onPress={goToHome}
// 				name='home'
// 				color='#841584'
// 				size={35}
// 			/>
// 			<Icon
// 				// onPress={() => navigation.navigate('Menu')}
// 				onPress={goToReservation}
// 				name='restaurant-menu'
// 				color='#841584'
// 				size={35}
// 			/>
// 			<Icon
// 				onPress={() => navigation.navigate('Reservation')}
// 				name='home'
// 				color='#841584'
// 				size={35}
// 			/>
// 			<Icon
// 				onPress={() => navigation.navigate('Location')}
// 				name='location-on'
// 				color='#841584'
// 				size={35}
// 			/>
// 		</View>
// 	)
// }

const styles = StyleSheet.create({
	Footer: {
		// flex: 1,
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		padding: 10,
		paddingBottom: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		backgroundColor: 'black',
	},
})

export default Footer
