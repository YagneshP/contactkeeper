import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from '../Layout/Navbar/Navbar';
import classes from './App.module.css';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import UserContacts from '../Pages/UserContacts/UserContacts';
import LoginForm from '../AuthForm/LoginForm/LoginForm';
import ContactState from '../../Context/ContactContext/ContactState';
import SignupForm from '../AuthForm/SignupForm/SignupForm';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AuthState from '../../Context/AuthContext/AuthState';
import AlertState from '../../Context/AlertContext/AlertState';
import Alert from '../Layout/Alert/Alert';

const App = () => {
	return (
		<AlertState>
			<AuthState>
				<ContactState>
					<BrowserRouter>
						<div className="App">
							<Navbar />
							<div className={classes.container}>
								<Alert />
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/about" component={About} />
									<PrivateRoute exact path="/contacts" component={UserContacts} />
									<Route exact path="/signup" component={SignupForm} />
								</Switch>
							</div>
						</div>
					</BrowserRouter>
				</ContactState>
			</AuthState>
		</AlertState>
	);
};

export default App;
