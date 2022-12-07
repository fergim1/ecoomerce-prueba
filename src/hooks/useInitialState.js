import { useState } from 'react'
import initialState from '../initialState'

export const useInitialState = () => {
	const [state, setState] = useState(initialState)

	const addToCart = payload => {
		const element = state.cart.findIndex(item => item.id === payload.id)
		let updateCart = [...state.cart]

		if (element > -1) {
			updateCart[element].qty += 1
		} else {
			updateCart = [...updateCart, { ...payload, qty: 1 }]
		}
		setState({ ...state, cart: updateCart })
	}

	const discountOne = payload => {
		const element = state.cart.findIndex(item => item.id === payload.id)
		const updateCart = [...state.cart]

		if (updateCart[element].qty > 1) {
			updateCart[element].qty -= 1
			setState({ ...state, cart: updateCart })
		} else {
			alert('La cantidad minima es 1')
		}
	}

	const removeFromCart = id => {
		setState({
			...state,
			cart: state.cart.filter(el => el.id !== id),
		})
	}

	const addToBuyer = buyer => {
		setState({
			...state,
			buyer: [...state.buyer, buyer],
		})
	}

	const addNewOrder = newOrder => {
		setState({
			...state,
			order: [...state.order, newOrder],
		})
	}

	const cleanCart = () => {
		console.log('nº de art ANTES de hacer CLEAN', state.cart.length)
		setState({
			...state,
			cart: [],
		})
		console.log('nº de art DESPUES de hacer CLEAN', state.cart.length)
	}

	return {
		state,
		addToCart,
		discountOne,
		removeFromCart,
		addToBuyer,
		addNewOrder,
		cleanCart,
	}
}
