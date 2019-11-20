import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
    
        const response = await api.post('/login', { email, password });

        const { token } = response.data.success;
        
        localStorage.setItem('token', token);

        history.push('/dashboard');
    }

    return (
        <>
            <header className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Engeplus</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registrar-se</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="container">
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor="email">E-Mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control"
                            value={ email }
                            onChange={ event => setEmail(event.target.value) }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Senha</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control"
                            value={ password }
                            onChange={ event => setPassword(event.target.value) }
                        />
                    </div>
                    
                        
                    <button className="btn btn-block btn-primary" type="submit">Entrar</button>
                </form>
            </main>
        </>
    )
}