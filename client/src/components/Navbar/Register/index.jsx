
const Login = () => {
	return (
		<form>
			<h1>Register</h1>
			<p>Email: <input type="email" name="email"/></p>
			<p>Password:<input type="password" name="password" autoComplete="on"/></p>
			<p>Password Confirmation:<input type="password" name="passwordConf" autoComplete="on"/></p>
			<button>Register</button>
		</form>
	)
}

export default Login;