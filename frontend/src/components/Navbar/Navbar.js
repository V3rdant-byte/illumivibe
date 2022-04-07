import React from 'react';
import './Navbar.css';
import LogoutButton from '../../components/Loginout/LogoutButton';

import { useSelector, useDispatch } from 'react-redux';
import { SetView } from '../../store/navigation';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo-with-name.png';

// General instruction on how to create new page and link to Navbar
// 1. go to store/navigation/index.js add new page name in comment
// 2. create the view component for the new page
// 3. create a new route in App.js
// 4. in this file, add a goto handler that navigate to that page
// 5. in this file, add a div then link the onclick to the goto handler just created

export const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const state = useSelector((state) => state);
	const username = state.account === undefined ? '' : state.account.googleOAuthResponse.profileObj.givenName;
	const usericon = state.account === undefined ? '' : state.account.googleOAuthResponse.profileObj.imageUrl;
	const currentView = state.navigation === undefined ? 'main' : state.navigation.currentView;

	const gotoDashboard = () => {
		dispatch(SetView.action('dashboard'));
		navigate('/dashboard');
	}

	const gotoDevice = () => {
		dispatch(SetView.action('device'));
		navigate('/device');
	}

	const gotoMusic = () => {
		dispatch(SetView.action('music'));
		navigate('/music');
	}

	return (
		<div className='navbar-container'>
			<div className='navbar-user'>
			<div className='navbar-user-icon'>
				<img src={usericon} alt="usericon" style={{"borderRadius":"50%"}} />
			</div>
			<div className='navbar-user-name'>
				{username}
			</div>
			</div>
			<LogoutButton />
			<div className='navbar-line'></div>
			<div className={currentView === 'dashboard' ? 'navbar-link navbar-current-page': 'navbar-link'} onClick={gotoDashboard}>
				Home
			</div>
			<div className={currentView === 'device' ? 'navbar-link navbar-current-page': 'navbar-link'} onClick={gotoDevice}>
				Device
			</div>
			<div className={currentView === 'music' ? 'navbar-link navbar-current-page': 'navbar-link'} onClick={gotoMusic}>
				Music
			</div>
			<div className='navbar-line'></div>

			<div className='navbar-logo'>
			<img src={logo} alt='logo' />
			</div>
		</div>
	);
}
