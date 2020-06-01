import createDataContext from './createDataContext'

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_AUTH_INFO':
			const {
				payload: { email, key },
			} = action
			return { ...state, user: { email, key } }
		case 'ADD_OPTION':
			console.log('state before add option', state)
			const {
				payload: { title, price, quantity },
			} = action
			console.log('title', title, '--', 'price', price, '--', 'quantity', quantity)
			const orders = state.order
			if (orders) {
				return { ...state, order: [...orders, { title, price, quantity }] }
			}
			return { ...state, order: [{ title, price, quantity }] }
		default:
			return state
	}
}

const ADD_OPTION = dispatch => {
	return (title, price, quantity) => {
		dispatch({ type: 'ADD_OPTION', payload: { title, price, quantity } })
	}
}

const ADD_AUTH_INFO = dispatch => {
	return (email, key) => {
		dispatch({ type: 'ADD_AUTH_INFO', payload: { email, key } })
	}
}

const ADD_SELECTED_RESTAURANT = dispatch => {
	return name => {
		dispatch({ type: 'ADD_SELECTED_RESTAURANT', payload: { name } })
	}
}

export const { Context, Provider } = createDataContext(
	dataReducer,
	{
		ADD_OPTION,
		ADD_AUTH_INFO,
		ADD_SELECTED_RESTAURANT,
	},
	{}
)
