import React, { useState, useEffect, useContext } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
} from 'react-native'
import { Context } from '../context/dataContext'

import { create } from 'apisauce'

const api = create({
	baseURL: 'http://192.168.100.2:5000',
})

const Orders = ({}) => {
	const { state } = useContext(Context)
	const sendOrder = async () => {
		try {
			const placeOrder = await api.post('/api/restaurant/placeOrder', {
				order: state.order,
				restaurantId: 1,
			})
		} catch (e) {
			console.log('e orders\n\n', e)
		}
	}
	return (
		<SafeAreaView style={styles.backgroundReservation}>
			{console.log('state', state)}
			{state.order && state.order.length ? (
				<View>
					<FlatList
						data={state.order}
						renderItem={({ item }) => (
							<View
								style={{
									// margin: 5,
									borderBottomColor: 'grey',
									borderBottomWidth: 0.5,
									paddingBottom: 3,
									marginLeft: 7,
									marginRight: 7,
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<View>
									<Text
										style={{
											fontSize: 16,
											padding: 5,
										}}
									>
										{item.title.toUpperCase()}
									</Text>
									<Text
										style={{
											fontSize: 12,
											paddingLeft: 5,
											// paddingTop: 2,
										}}
									>
										{item.ingredients}
									</Text>
									<Text
										style={{
											fontSize: 12,
											paddingLeft: 5,
											// paddingTop: 2,
										}}
									>
										{item.price} RON
									</Text>
								</View>
							</View>
						)}
						keyExtractor={item => item.name}
					/>
					<View>
						<TouchableOpacity
							// onPress={() => SEND_ORDER(item.name, parseFloat(item.price), 1)}
							onPress={sendOrder}
						>
							<Text>SEND ORDER</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View>
					<Text>Ceplm</Text>
				</View>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundReservation: {
		flex: 1,
	},
})

export default Orders
