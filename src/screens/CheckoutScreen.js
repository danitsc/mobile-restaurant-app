import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
} from 'react-native'

import Footer from '../components/overall/Footer'
import Header from '../components/overall/Header'

// import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'



const deviceWidth = Dimensions.get('window').width

const CheckoutScreen = ({ navigation }) => {
	return (
		<View style={styles.backgroundMenu}>
			<Header navigation={navigation} />
            <Text>Checkout</Text>
			<Footer navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
    backgroundMenu: {
        flex: 1
    }
})

export default CheckoutScreen
