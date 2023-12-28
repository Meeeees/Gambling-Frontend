import React, { useState } from 'react';
import config from '../config.json'
const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${config.Backend.url}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(async (response) => {
            let json = await response.json();
            localStorage.setItem('token', json.token)
            window.location.href = '/'
        })
    }
    return (
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signin</button>
            </form>
        </div>
    );
}

export default Signin;