import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, signupUser, clearError } from '../../../Context/AuthContext/AuthState';
import { useAlert, setAlert } from '../../../Context/AlertContext/AlertState';
const SignupForm = (props) => {
	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: ''
	});
	const [ authState, authDispatch ] = useAuth();
	const [ alertState, alertDispatch ] = useAlert();
	const { isAuthenticated, error } = authState;
	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/contacts');
			}
			if (error) {
				setAlert(alertDispatch, error, 'danger');
				clearError(authDispatch);
			}
		},
		[ isAuthenticated, props.history, error, authDispatch, setAlert, alertDispatch ]
	);
	const { name, email, password } = user;

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		//send data of user by checking his credentials
		if (name === '' || email === '' || password === '') {
			setAlert(alertDispatch, 'Please enter all fields', 'danger');
		} else {
			signupUser(authDispatch, user);
		}
	};
	return (
		<div className="form-container">
			<h1>
				Account <span style={{ color: '#003699' }}>SignUp</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input id="name" type="text" name="name" value={user.name} onChange={handleChange} />
				</div>
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

				<input type="submit" className="btn btn-primary btn-block" value="SignUp" />
			</form>
			<p>
				Already have an account ? <Link to="/">Login Here</Link>
			</p>
		</div>
	);
};

export default SignupForm;
