//reference: https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import { Logout } from '../../store/account';
import { useNavigate } from 'react-router-dom';

const clientId = '94833549478-6h6jples3m5hfhunmqtbv82il1cphn2n.apps.googleusercontent.com';

function LogoutButton() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSuccess = () => {
        alert('Logout made successfully!');
        dispatch(Logout.action());
        navigate('/');
    };

    return (
        <div>
            <GoogleLogout 
                render={renderProps => (
                    <button onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            className='logout-btn'>
                        Logout
                    </button>
                  )}
                clientId = {clientId}
                buttonText = 'Logout'
                onLogoutSuccess = {onSuccess}>
            </GoogleLogout>
        </div>
    );
}

export default LogoutButton;