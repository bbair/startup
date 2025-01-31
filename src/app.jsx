import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body bg-dark text-light'>
        <header class="bg-black bg-gradient">
            <nav class="navbar navbar-dark">
                <div id="title" class="navbar-brand"><img width="400px" src="public/SalvoAttackTitle.png" alt="Salvo Attack"/></div>
                <menu class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="login.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="play.html">Play</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="color_palette.html">Color Palette</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about_rules.html">About/Rules</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main>App components go here</main>
        
        <footer class="bg-black bg-gradient text-white-50">
            <span>Brianna Nielson</span>
            <a class="text-reset" href="https://github.com/bbair/startup">Github Repo</a>
        </footer>
    </div>
  );
}