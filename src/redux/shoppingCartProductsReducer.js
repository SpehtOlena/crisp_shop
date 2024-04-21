import { GET_SHOPPING_CART_PRODUCTS, GET_SHOPPING_CART_PRODUCT, CREATE_SHOPPING_CART_PRODUCT, EDIT_SHOPPING_CART_PRODUCT, DELETE_SHOPPING_CART_PRODUCT } from "./types"

const initialState = {
	data: [],
	item: {}
}

export const shoppingCartProductsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SHOPPING_CART_PRODUCTS: {
			return { ...state, data: action.payload }
		}
		case GET_SHOPPING_CART_PRODUCT: {
			return { ...state, item: action.payload }
		}
		case CREATE_SHOPPING_CART_PRODUCT: {
			if (state.data.find(value => value.id === action.payload.id)) {
				return {
					...state, data: state.data.map(value => {
						if (value.id === action.payload.id) {
							return { ...value, quantity: value.quantity + action.payload.quantity }
						} else {
							return value
						}
					})
				}
			} else {
				return { ...state, data: [...state.data, action.payload] }
			}
		}
		case EDIT_SHOPPING_CART_PRODUCT: {
			return {
				...state, data: state.data.map(value => {
					if (value.id === action.payload.id) {
						return action.payload
					} else {
						return value
					}
				})
			}
		}
		case DELETE_SHOPPING_CART_PRODUCT: {
			return {
				...state, data: state.data.filter(value => value.id !== action.payload.id)
			}
		}
		default: {
			return state
		}
	}
}