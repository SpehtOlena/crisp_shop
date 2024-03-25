import axios from "axios";
import { CREATE_PRODUCT, CREATE_SHOPPING_CART_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT, GET_PRODUCTS } from "./types";

// const URL = "https://fake-server-crisp.vercel.app/";
const URL = "http://localhost:3000/";



export function addProductToShoppingCart(product, count) {
	return { type: CREATE_SHOPPING_CART_PRODUCT, payload: { product: product, count: count } }
}


export function axiosRequest(data, namePage, request) {
	const httpRequest = request.toLowerCase();
	switch (request) {
		default:
			return async dispatch => {
				axios
					.get(URL + namePage)
					.then(response => {
						dispatch({
							type: GET_PRODUCTS,
							payload: response.data
						})
					})
			}
		case "post": {
			return async dispatch => {
				axios
					.post(URL + namePage, data)
					.then(response => {
						dispatch({
							type: CREATE_PRODUCT,
							payload: response.data
						})
					})
			}
		}
		case "put": {
			return async dispatch => {
				axios
					.put(`${URL}${namePage}/${data.id}`, data)
					.then(response => {
						dispatch({
							type: EDIT_PRODUCT,
							payload: response.data
						})
					})
			}
		}
		case "delete": {
			return async dispatch => {
				axios
					.delete(`${URL}${namePage}/${data.id}`)
					.then(response => {
						dispatch({
							type: DELETE_PRODUCT,
							payload: data
						})
					})
			}
		}
		case "get": {
			return async dispatch => {
				axios
					.get(`${URL}${namePage}/${data.id}`)
					.then(response => {
						dispatch({
							type: GET_PRODUCT,
							payload: response.data
						})
					})
			}
		}
	}
}
