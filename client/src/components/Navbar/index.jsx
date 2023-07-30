import './index.css'
import Login from './Login';
import Register from './Register';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {useState} from 'react';

const Navbar = () => {
	const [modalLogin, toggleLogin] = useState(false);
	const [modalRegister, toggleRegister] = useState(false);

	return (
		<nav className="navbar">
			<h1>TinyApp - React</h1>
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
		</nav>
	)
}

export default Navbar;