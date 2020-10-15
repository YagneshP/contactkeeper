import React, { useState, Fragment } from 'react';

import LoginForm from '../../AuthForm/LoginForm/LoginForm';
import Spinner from '../../Layout/Spinner/Spinner';
import SignupForm from '../../AuthForm/SignupForm/SignupForm';

const Home = (props) => {
	const [ login, setLogin ] = useState(true);
	return <Fragment>{login ? <LoginForm {...props} /> : <SignupForm {...props} />}</Fragment>;
};

export default Home;
