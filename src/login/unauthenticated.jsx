import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './message_dialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <>
            <div>
                <p>Please login or create an account with your email address</p>
                <div className="input-group mb-3">
                    <span className="input-group-text">Email:</span>
                    <input className="form-control" type="email" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Password:</span>
                    <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                </div>
                <Button className="spaced-button" variant='secondary' onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <Button className="spaced-button" variant='outline-secondary' onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
