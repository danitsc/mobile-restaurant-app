import createDataContext from './createDataContext'

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_AUTH_INFO':
			const {
				payload: { userData },
			} = action

			const { email, firstName, lastName, phoneNumber } = userData
			return {
				...state,
				user: { email, firstName, lastName, phoneNumber },
			}
		case 'ADD_OPTION':
			const {
				payload: { title, price, quantity, restaurantId, restaurantName },
			} = action
			const orders = state.order
			const { restaurantId: oldRestaurantId } = state
			console.log('resttt', restaurantId, '---', oldRestaurantId, restaurantName)
			if (oldRestaurantId && oldRestaurantId !== restaurantId) {
				return state
			}
			// if (orders && orders.length) {
			state.order.push({ title, price, quantity })
			state.restaurantId = restaurantId
			state.restaurantName = restaurantName
			return state
		case 'CLEAR_OPTIONS': {
			return { ...state, order: [], restaurantId: null }
		}
		case 'LOG_OUT':
			return {}
		default:
			return state
	}
}

const ADD_OPTION = dispatch => {
	return (title, price, quantity, restaurantId, restaurantName) => {
		dispatch({
			type: 'ADD_OPTION',
			payload: { title, price, quantity, restaurantId, restaurantName },
		})
	}
}

const ADD_AUTH_INFO = dispatch => {
	return (userData, key) => {
		dispatch({ type: 'ADD_AUTH_INFO', payload: { userData, key } })
	}
}

const ADD_SELECTED_RESTAURANT = dispatch => {
	return name => {
		dispatch({ type: 'ADD_SELECTED_RESTAURANT', payload: { name } })
	}
}

const LOG_OUT = dispatch => {
	return () => {
		dispatch({ type: 'LOG_OUT' })
	}
}

const CLEAR_OPTIONS = dispatch => {
	return () => {
		dispatch({ type: 'CLEAR_OPTIONS' })
	}
}

export const { Context, Provider } = createDataContext(
	dataReducer,
	{
		ADD_OPTION,
		ADD_AUTH_INFO,
		ADD_SELECTED_RESTAURANT,
		LOG_OUT,
		CLEAR_OPTIONS,
	},
	{
		restaurantId: null,
		order: [],
		user: {},
	}
)
