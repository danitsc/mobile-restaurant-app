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
	// const { state } = useContext(Context)
	const [showOrder, setShowOrder] = useState(0)
	const [price, setPrice] = useState(0)
	// const state = {
	// 	order: {
	// 		order1: [
	// 			{
	// 				title: 'Pizza Capriciosa',
	// 				price: 30,
	// 			},
	// 			{
	// 				title: 'Pizza Margherita',
	// 				price: 40,
	// 			},
	// 			{
	// 				title: 'Pizza Diavola',
	// 				price: 40,
	// 			},
	// 			{
	// 				title: 'Burger Pui',
	// 				price: 20,
	// 			},
	// 			{
	// 				title: 'Meniul zilei',
	// 				price: 15,
	// 			},
	// 			{
	// 				title: 'Friptura',
	// 				price: 35,
	// 			},
	// 			{
	// 				title: 'Cola zero',
	// 				price: 5,
	// 			},
	// 			{
	// 				title: 'Apa plata',
	// 				price: 5,
	// 			},
	// 		],
	// 	},
	// }
	const [orders, setOrders] = useState([])
	const { state, CLEAR_OPTIONS } = useContext(Context)
	const [orderSent, setOrderSent] = useState(false)
	// state.order.forEach(ord => setPrice(price + ord.price))
	const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
	const sendOrder = async restaurantId => {
		try {
			const { data: placeOrder } = await api.post(
				'/api/restaurant/placeOrder',
				{
					order: state.order,
					restaurantId: state.restaurantId,
					user: state.user.email,
				}
			)
			if (placeOrder.success) {
				setOrders([])
				// CLEAR_OPTIONS()
			}
		} catch (e) {
			console.log('e orders\n\n', e)
		}
	}
	useEffect(() => {
		if (state.order && state.order.length) {
			let tempPrice = 0
			state.order.forEach(ord => {
				tempPrice += ord.price
			})
			setOrders(state.order)
			setPrice(tempPrice)
		}
	}, [])

	return (
		<SafeAreaView style={styles.backgroundReservation}>
			{console.log('state', state)}
			{orders && orders.length ? (
				<View>
					<View>
						<Text>Restaurant: {state.restaurantName}</Text>
					</View>
					<FlatList
						data={[1]}
						renderItem={({ item, index }) => (
							<View
								style={{
									// margin: 5,
									borderBottomColor: 'grey',
									// borderBottomWidth: 0.5,
									paddingBottom: 3,
									marginLeft: 7,
									marginRight: 7,
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<View>
									<TouchableOpacity
										// onPress={() => setShowOrder(index)}
										style={{
											alignItems: 'center',
										}}
									>
										<Text style={{ color: 'red' }}>Your Order</Text>
									</TouchableOpacity>
									{showOrder !== -1 && index === showOrder && (
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
									)}
								</View>
								<View
									style={{
										alignItems: 'center',
										marginTop: 50,
									}}
								>
									<View
										style={{
											flexDirection: 'column',
											// justifyContent: 'space-between',
										}}
									>
										<Text style={{ alignSelf: 'center', marginBottom: 30 }}>
											TOTAL: {price} RON
										</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												width: 500,
											}}
										>
											<TouchableOpacity
												// onPress={() => SEND_ORDER(item.name, parseFloat(item.price), 1)}
												onPress={() => sendOrder(item.id)}
												style={{
													flexDirection: 'column',
												}}
											>
												<Text style={{}}>SEND ORDER</Text>
											</TouchableOpacity>
											<TouchableOpacity
												// onPress={() => SEND_ORDER(item.name, parseFloat(item.price), 1)}
												onPress={CLEAR_OPTIONS}
											>
												<Text style={{}}>DELETE ORDER</Text>
											</TouchableOpacity>
										</View>
									</View>
									{orderSent && (
										<Text style={{ color: 'red', margin: 20 }}>
											ORDER SENT SUCCESSFULLY !
										</Text>
									)}
								</View>
							</View>
						)}
						keyExtractor={item => item.name}
					/>
				</View>
			) : (
				<View style={{ alignItems: 'center', marginTop: 100 }}>
					<Text>Nu aveti nicio comanda activa.</Text>
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
