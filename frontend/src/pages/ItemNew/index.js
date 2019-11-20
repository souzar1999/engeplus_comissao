import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function ItemNew({ history, match }){
    const [value, setValue] = useState(0);
    const [type, setType] = useState('');
    const sellerId = match.params.sellerId;
    const sellId = match.params.sellId;
    
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

        data.append('value', value);
        data.append('type', type);

        await api.post(`/sellers/${sellerId}/sells/${sellId}/items`, data);

        history.push(`/seller/${sellerId}/sell/${sellId}`);
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
                        <label htmlFor="value">Valor</label>
                        <input 
                            type="number" 
                            id="value" 
                            className="form-control"
                            value={ value }
                            onChange={ event => setValue(event.target.value) }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Tipo</label>
                        <select 
                            id="type" 
                            className="form-control"
                            value={ type }
                            onChange={ event => setType(event.target.value) }
                        >
                            <option value=''>-- Tipo --</option>
                            <option value='Product'>Produto</option>
                            <option value='Service'>Serviço</option>
                        </select>

                    </div>
                    
                    <button className="btn btn-block btn-primary" type="submit">Cadastrar</button>
                </form>
                <Link className="btn btn-secondary" to={`/seller/${sellerId}/sell/${sellId}`}>Voltar</Link>
            </main>
        </>
        )
    }