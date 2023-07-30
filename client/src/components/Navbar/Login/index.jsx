import axios from 'axios';

const Login = ({onLoggedIn}) => {

	const onLogin = async evt => {
		evt.preventDefault();
		const payload = {email: evt.target.email.value, password: evt.target.password.value}
		try {
			const result = await axios.post('http://localhost:8080/sessions/login', payload)
			if (result.data.success) {
				onLoggedIn(result.data?.user);
			}
		} catch (e) {
			console.log("error", e);
		}
	}

	return (
		<form onSubmit={onLogin}>
			<h1>Login</h1>
			<p>Email: <input type="email" name="email"/></p>
			<p>Password:<input type="password" name="password"/></p>
			<button>Login</button>
		</form>
	)
}

export default Login;