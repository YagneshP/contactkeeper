import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../Context/AuthContext/AuthState';
const PrivateRoute = ({ component: Component, ...rest }) => {
	const [ authState, authDispatch ] = useAuth();
	const { isAuthenticated } = authState;
	return <Route {...rest} render={(props) => (!isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)} />;
};

export default PrivateRoute;
