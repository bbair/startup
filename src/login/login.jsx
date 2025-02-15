import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="text-center">
        <div>
            <h1 className="green-text">Welcome to Salvo Attack!</h1>
            <p>Please login or create an account with your email address</p>
            <form method="get" action="play.html">
                <div className="input-group mb-3">
                  <span className="input-group-text">Email:</span>
                  <input className="form-control" type="email" placeholder="your@email.com"/>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Password:</span>
                  <input className="form-control" type="password" id="password" placeholder="password"/>
                </div>
                <button type="submit" className="btn btn-secondary spaced-button">Login</button>
                <button type="submit" className="btn btn-outline-secondary spaced-button">Create</button>
            </form>
        </div>
    </main>
  );
}