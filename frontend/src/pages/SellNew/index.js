import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function SellNew({ history }){
    const [description, setDescription] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [sellers, setSellers] = useState([]);
    
    useEffect(() => {
        async function userAuth() {
            const token = localStorage.getItem('token');
            await api.post('/details', '', {
                headers: { Authorization: "Bearer " + token }
            }).then((response) => {
                loadSellers();
            }).catch(() => {
                history.push('/');
            });

        }
        
        async function loadSellers() {
            const response = await api.get('/sellers');

            setSellers(response.data);
        }

        userAuth();
        
    }, []);
    

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();

        data.append('description', description);

        await api.post(`/sellers/${sellerId}/sells`, data);

        history.push(`/seller/${sellerId}`);
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
                        <label htmlFor="description">Descrição</label>
                        <input 
                            type="text" 
                            id="description" 
                            className="form-control"
                            value={ description }
                            onChange={ event => setDescription(event.target.value) }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sellerId">Vendedor</label>
                        <select 
                            id="sellerId" 
                            className="form-control"
                            value={ sellerId }
                            onChange={ event => setSellerId(event.target.value) }
                        >
                            <option value=''>-- Vendedor --</option>
                            
                            {sellers.map(seller => (
                                <option key={seller.id} value={seller.id}>{seller.name}</option>
                            ))}
                        </select>

                    </div>
                    
                    <button className="btn btn-block btn-primary" type="submit">Cadastrar</button>
                </form>
                <Link className="btn btn-secondary" to={`/dashboard`}>Voltar</Link>
            </main>
        </>
        )
    }