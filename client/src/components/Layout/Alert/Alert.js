import React from 'react';
import { useAlert } from '../../../Context/AlertContext/AlertState';

const Alert = () => {
	const [ alertState, alertDispatch ] = useAlert();
	return (
		alertState.alert.length > 0 &&
		alertState.alert.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<i className="fas fa-info-circle" /> {alert.msg}
			</div>
		))
	);
};

export default Alert;
