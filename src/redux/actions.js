import { CREATE_SHOPPING_CART_PRODUCT, EDIT_SHOPPING_CART_PRODUCT } from "./types";



export function addProductToShoppingCart(product, quantity, color, size) {
	return {
		type: CREATE_SHOPPING_CART_PRODUCT, payload:
		{
			name: product.name,
			color: color,
			id: product.id + color + size,
			price: product.price,
			quantity: quantity,
			size: size,
			image: product.images[color][0]
		}
	}
}

export function editProductToShoppingCard(product, quantity) {
	return {
		type: EDIT_SHOPPING_CART_PRODUCT, payload: { ...product, quantity: quantity }
	}

}

