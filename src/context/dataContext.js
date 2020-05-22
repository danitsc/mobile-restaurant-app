import React, { useReducer } from 'react'
import createDataContext from './createDataContext'

const dataReducer = (state, action) => {
	console.log('dai aici?')
	switch (action.type) {
		case 'ADD_OPTION':
			break
		// const {
		// 	payload: { title, price, quantity },
		// } = action
		// const optionIdx = state.findIndex(opt => opt.title === title)
		// if (optionIdx !== -1) {
		// 	const initialQuantity = state[optionIdx].quantity
		// 	state[optionIdx] = {
		// 		title,
		// 		price,
		// 		quantity: initialQuantity + quantity,
		// 	}
		// 	return [...state]
		// }
		// return [...state, { title, price, quantity }]
		case 'ADD_AUTH_INFO':
			const {
				payload: { email, userId },
			} = action
			return [...state, { user: { email, userId } }]
	}
}

const ADD_OPTION = dispatch => {
	return (title, price, quantity) => {
		dispatch({ type: 'ADD_OPTION', payload: { title, price, quantity } })
	}
}

const ADD_AUTH_INFO = dispatch => {
	return (email, userId) => {
		dispatch({ type: 'ADD_AUTH_INFO', payload: { email, userId } })
	}
}

export const { Context, Provider } = createDataContext(
	dataReducer,
	{
		ADD_OPTION,
		ADD_AUTH_INFO,
	},
	[]
)
