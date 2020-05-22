import React, { useReducer } from 'react'
import createDataContext from './createDataContext'

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_OPTION':
			const {
				payload: { title, price, quantity },
			} = action
			const optionIdx = state.findIndex(opt => opt.title === title)
			if (optionIdx !== -1) {
				const initialQuantity = state[optionIdx].quantity
				state[optionIdx] = {
					title,
					price,
					quantity: initialQuantity + quantity,
				}
				return [...state]
			}
			return [...state, { title, price, quantity }]
	}
}

const ADD_OPTION = dispatch => {
	return (title, price, quantity) => {
		dispatch({ type: 'ADD_OPTION', payload: { title, price, quantity } })
	}
}

export const { Context, Provider } = createDataContext(
	cartReducer,
	{
		ADD_OPTION,
	},
	[]
)
