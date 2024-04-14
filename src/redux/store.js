import { configureStore } from "@reduxjs/toolkit";
import { app, auth, firestore, database, storage } from '../firebase/firebase'
import { combineReducers } from "redux";
import { actionTypes, firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import firebase from "firebase/compat/app";
import { shoppingCartProductsReducer } from './shoppingCartProductsReducer'


const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
	profileParamsToPopulate: [
		{ child: 'roles', root: 'roles' },
	],
	profileFactory: user => {
		const profile = {
			email: user.email || user.providerData[0].email,
			role: 'user',
		}
		if (user.providerData && user.providerData[0].length) {
			profile.providerData = user.providerData
		}
		return profile
	},
	enableClaims: true,
	presence: 'presence',
	sessions: 'sessions'
}

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	shoppingCartProducts: shoppingCartProductsReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(
		{
			serializableCheck: {
				ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
			}
		}
	)
})

export const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
}