import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, loginUser, clearError } from '../../../Context/AuthContext/AuthState';
import { setAlert, useAlert } from '../../../Context/AlertContext/AlertState';
const LoginForm = (props) => {
	const [ authState, authDispatch ] = useAuth();
	const [ alertState, alertDispatch ] = useAlert();
	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});
	const { isAuthenticated, error } = authState;
	const { email, password } = user;

	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/contacts');
			} else if (error) {
				setAlert(alertDispatch, error, 'danger');
				clearError(authDispatch);
			}
		},
		[ isAuthenticated, props.history, error, alertDispatch, setAlert, clearError, authDispatch ]
	);
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		//send data of user by checking his credentials
		if (email === '' || password === '') {
			setAlert(alertDispatch, 'Please fill in all fields ');
		}
		loginUser(authDispatch, { email, password });
	};
	return (
		<div className="form-container">
			<h1>
				Account <span style={{ color: '#003699' }}>Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input id="email" type="email" name="email" value={user.email} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						type="password"
						name="password"
						value={user.password}
						onChange={handleChange}
					/>
				</div>

				<input type="submit" className="btn btn-primary btn-block" value="Login" />
			</form>
			<p>
				Don't have an account ? <Link to="/signup">Register Here</Link>
			</p>
		</div>
	);
};

export default LoginForm;
