
const Login = () => {
	return (
		<form>
			<h1>Register</h1>
			<p>Email: <input type="email" name="email"/></p>
			<p>Password:<input type="password" name="password"/></p>
			<p>Password Confirmation:<input type="passwordConf" name="passwordConf"/></p>
			<button>Register</button>
		</form>
	)
}

export default Login;