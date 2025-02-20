import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <div>
            <div className='player-name'>{props.userName}</div>
            <Button className="spaced-button" variant='light' onClick={() => navigate('/play')}>
                Play
            </Button>
            <Button className="spaced-button" variant='secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}
