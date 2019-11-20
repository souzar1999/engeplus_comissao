import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Register({ history }){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('c_password', c_password);

        await api.post('/register', data);

        history.push('/');
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
                                <Link className="nav-link" to="/">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="container">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="form-control"
                            value={ name }
                            onChange={ event => setName(event.target.value) }
                        />
                    </div>

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

                    <div className="form-group">
                        <label htmlFor="email">Senha Novamente</label>
                        <input 
                            type="password" 
                            id="c_password" 
                            className="form-control"
                            value={ c_password }
                            onChange={ event => setCPassword(event.target.value) }
                        />
                    </div>
                    
                    <button className="btn btn-block btn-primary" type="submit">Cadastrar</button>
                </form>
            </main>
        </>
    )
}