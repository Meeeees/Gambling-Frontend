import React, { useState } from 'react';
import config from '../config.json'
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${config.Backend.url}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        }).then(async (response) => {
            let json = await response.json();
            localStorage.setItem('token', json.token)
            window.location.href = '/'
        })
    }
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type='text'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;