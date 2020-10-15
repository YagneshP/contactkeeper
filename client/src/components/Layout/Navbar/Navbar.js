import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useAuth, logout } from '../../../Context/AuthContext/AuthState';
const Navbar = ({ title, icon }) => {
	const [ authState, authDispatch ] = useAuth();
	const { isAuthenticated, user } = authState;

	const authLink = (
		<Fragment>
			<li> Welcome {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</li>
			<li>
				<a onClick={() => logout(authDispatch)} href="/">
					LogOut
				</a>
			</li>
		</Fragment>
	);
	const guestLink = (
		<Fragment>
			<li>
				<NavLink to="/">LogIn</NavLink>
			</li>
			<li>
				<NavLink to="/signup">SignUp</NavLink>
			</li>
		</Fragment>
	);
	return (
		<div className={classes.Navbar}>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>
				{isAuthenticated ? authLink : guestLink}

				<li>
					<NavLink to="/about">About</NavLink>
				</li>
			</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};
Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt'
};
export default Navbar;
