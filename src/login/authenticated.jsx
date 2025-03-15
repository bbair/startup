import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
        .catch(() => {
            // Logout failed. Assuming offline
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        });
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
