import { useContext, useState } from 'react'
import { userContext } from '../../../contexts/user'
import axios from 'axios'
import './index.css';

const Login = () => {
	const { setUser } = useContext(userContext)
	const [error, setError] = useState(false)

	const onLogin = async evt => {
		evt.preventDefault();
		const payload = {email: evt.target.email.value, password: evt.target.password.value}
		try {
			const result = await axios.post('/sessions/login', payload, {withCredentials: true})
			if (result.data.success) {
				if (error) setError(false)
				return setUser(result.data?.user)
			}
			console.log(result.data);
			return setError(result.data.message);

		} catch (e) {
			console.log("error", e);
		}
	}

	return (
		<form onSubmit={onLogin}>
			<h1>Login</h1>
			{error && <h4 className='login--error'>{error}</h4> }
			<p>Email: <input type="email" name="email"/></p>
			<p>Password:<input type="password" name="password" autoComplete="on"/></p>
			<button>Login</button>
		</form>
	)
}

export default Login;