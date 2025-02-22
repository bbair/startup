import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { ColorPalette } from './color_palette/color_palette';
import { AboutRules } from './about_rules/about_rules';
import { AuthState } from './login/auth_state';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [gridColor, setGridColor] = React.useState('#008000');
    const [hitColor, setHitColor] = React.useState('#FF0000');

    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className="bg-black bg-gradient">
                    <nav className="navbar navbar-dark">
                        <div id="title" className="navbar-brand"><img width="400px" src="/SalvoAttackTitle.png" alt="Salvo Attack"/></div>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to=''>Login</NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                <NavLink className='nav-link' to='play'>
                                    Play
                                </NavLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <NavLink className='nav-link' to='color_palette'>Color Palette</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='about_rules'>About/Rules</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }}
                        />
                    } exact 
                    />
                    <Route path='/play' element={<Play />} />
                    <Route path='/color_palette' element={
                        <ColorPalette
                            gridColor={gridColor}
                            onChangeGridColor={(newColor) => {
                                setGridColor(newColor);
                            }}
                            hitColor={hitColor}
                            onChangeHitColor={(newColor) => {
                                setHitColor(newColor);
                            }}
                        />
                    }
                    />
                    <Route path='/about_rules' element={<AboutRules />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="bg-black bg-gradient text-white-50">
                    <span>Brianna Nielson</span>
                    <a className="text-reset" href="https://github.com/bbair/startup">Github Repo</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}