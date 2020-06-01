import { auth } from './firebaseConfig'

const createUserWithEmailAndPasswordHandler = async (
	event,
	email,
	password
) => {
	event.preventDefault()
	try {
		const { user } = await auth.createUserWithEmailAndPassword(email, password)
		return { success: true, data: user }
	} catch (error) {
		const formatError = error.toString().replace('Error: ', '').replace(']', '')
		return {
			success: false,
			// reason: 'Error Signing up with email and password',
			reason: formatError,
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
		console.log(`Sign in handler error: ${error}`)
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
