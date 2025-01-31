import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { ColorPalette } from './color_palette/color_palette';
import { AboutRules } from './about_rules/about_rules';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
        <div className='body bg-dark text-light'>
            <header class="bg-black bg-gradient">
                <nav class="navbar navbar-dark">
                    <div id="title" class="navbar-brand"><img width="400px" src="/SalvoAttackTitle.png" alt="Salvo Attack"/></div>
                    <menu class="navbar-nav">
                        <li class="nav-item">
                            <NavLink className='nav-link' to=''>Login</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className='nav-link' to='play'>Play</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className='nav-link' to='color_palette'>Color Palette</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className='nav-link' to='about_rules'>About/Rules</NavLink>
                        </li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/play' element={<Play />} />
                <Route path='/color_palette' element={<ColorPalette />} />
                <Route path='/about_rules' element={<AboutRules />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer class="bg-black bg-gradient text-white-50">
                <span>Brianna Nielson</span>
                <a class="text-reset" href="https://github.com/bbair/startup">Github Repo</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}