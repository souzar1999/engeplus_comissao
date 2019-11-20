import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Seller({ history, match }){
    const [sells, setSells] = useState([]);
    const sellerId = match.params.sellerId;
    
    useEffect(() => {
        async function userAuth() {
            const token = localStorage.getItem('token');
            await api.post('/details', '', {
                headers: { Authorization: "Bearer " + token }
            }).then((response) => {
                loadSells();
            }).catch(() => {
                history.push('/');
            });

        }
        
        async function loadSells() {
            const response = await api.get(`/sellers/${sellerId}/sells`);

            setSells(response.data);
        }

        userAuth();
        
    }, []);
    
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
                <table className="table table-bordless">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Comissão</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sells.map(sell => (
                        <tr key={sell.id}>
                            <td>
                                <Link to={`/seller/${sell.seller_id}/sell/${sell.id}`}>
                                    {sell.description}
                                </Link>
                            </td>
                            <td>R$ {(sell.value !== null ? sell.value : 0)}</td>
                            <td>R$ {(sell.commission !== null ? sell.commission : 0)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link className="btn btn-secondary" to={`/dashboard`}>Voltar</Link>
            </main>
        </>
        )
    }