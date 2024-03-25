import { configureStore } from "@reduxjs/toolkit"
import { productsReducer } from "./productsReducer"
import { shoppingCartProductsReducer } from "./shoppingCartProductsReducer"

export default configureStore({
	reducer: {
		products: productsReducer,
		shoppingCartProducts: shoppingCartProductsReducer
	}
})