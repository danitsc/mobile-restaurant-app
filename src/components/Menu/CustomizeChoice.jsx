import React, { useContext } from 'react'
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { Context } from '../../context/dataContext'

const CustomizeChoice = ({item}) => {
	const { state, ADD_OPTION } = useContext(Context)
	return (
		<View style={styles.backgroundReservation}>
			<View>
				<Text>Customize Choice</Text>
				<View style={styles.addItemView}>
					<TouchableOpacity
						onPress={() => ADD_OPTION(item.name, parseFloat(item.price), 1)}
					>
						<Icon size={18} name='circle-with-plus' style={styles.addItem} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundReservation: {
		flex: 1,
	},
	addItem: {
		alignSelf: 'center',
		color: 'green',
	},
	addItemView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
})

export default CustomizeChoice
