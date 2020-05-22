import { auth } from './firebaseConfig'

const createUserWithEmailAndPasswordHandler = async (
	event,
	email,
	password
) => {
	event.preventDefault()
	try {
		const { user } = await auth.createUserWithEmailAndPassword(email, password)
		return user
	} catch (error) {
		return {
			success: false,
			reason: 'Error Signing up with email and password',
		}
	}
}

const signInWithEmailAndPasswordHandler = async (event, email, password) => {
	event.preventDefault()
	try {
		const { user } = await auth.signInWithEmailAndPassword(email, password)
		return {
			success: true,
			data: user,
		}
	} catch (error) {
		console.log('fmm ba', error)
		const { message } = error
		return {
			success: false,
			reason: message,
		}
	}
}
export {
	createUserWithEmailAndPasswordHandler,
	signInWithEmailAndPasswordHandler,
}
