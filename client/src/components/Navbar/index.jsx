import './index.css'
import Login from './Login';
import Register from './Register';
import { useContext } from 'react'
import { userContext } from '../../contexts/user';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Navbar = () => {
	const [modalLogin, toggleLogin] = useState(false)
	const [modalRegister, toggleRegister] = useState(false)
	const {user, setUser} = useContext(userContext)

	const onLogout = async () => {
		try {
			const res = await axios.post('/sessions/logout', null, {withCredentials: true})
			if (res.data?.success) {
				setUser(undefined);
				toggleLogin(false);
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<nav className="navbar">
			<h1>TinyApp - React</h1>
			{user ? 
				<div>
					<Link to= '/profile'><h3>Hello {user?.email}</h3></Link>
					<button onClick={onLogout} className="btn--register">Logout</button>
				</div>
			: 
			<div className="sessions">
				<button className="btn--login" onClick={() => toggleLogin(true)}>Login</button>
				<button className="btn--register" onClick={() => toggleRegister(true)}>Register</button>
				<Modal open={modalLogin} onClose={() => toggleLogin(false)} center>
					<Login/>
				</Modal>
				<Modal open={modalRegister} onClose={() => toggleRegister(false)} center>
					<Register/>
				</Modal>
			</div>
			}
		</nav>
	)
}

export default Navbar;