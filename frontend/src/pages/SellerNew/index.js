import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function SellerNew({ history }){
    const [name, setName] = useState('');
    const [start_at, setStartAt] = useState('');
    
    useEffect(() => {
        async function userAuth() {
            const token = localStorage.getItem('token');
            await api.post('/details', '', {
                headers: { Authorization: "Bearer " + token }
            }).catch(() => {
                history.push('/');
            });
        }

        userAuth();
        
    }, []);
    

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();

        data.append('name', name);
        data.append('start_at', start_at);

        await api.post('/sellers', data);

        history.push('/dashboard');
    }
    
    return (
        <>
            <header className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/dashboard">Engeplus</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/seller/new">Cadastrar Vendedor</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sell/new">Cadastrar Venda</Link>
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
                        <label htmlFor="startAt">Data de Início</label>
                        <input 
                            type="date" 
                            id="startAt" 
                            className="form-control"
                            value={ start_at }
                            onChange={ event => setStartAt(event.target.value) }
                        />
                    </div>
                    
                    <button className="btn btn-block btn-primary" type="submit">Cadastrar</button>
                </form>
                <Link className="btn btn-secondary" to={`/dashboard`}>Voltar</Link>
            </main>
        </>
        )
    }