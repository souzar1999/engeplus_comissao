import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Sell({ history, match }){
    const [items, setItems] = useState([]);
    const sellerId = match.params.sellerId;
    const sellId = match.params.sellId;
    
    useEffect(() => {
        async function userAuth() {
            const token = localStorage.getItem('token');
            await api.post('/details', '', {
                headers: { Authorization: "Bearer " + token }
            }).then((response) => {
                loadItems();
            }).catch(() => {
                history.push('/');
            });

        }
        
        async function loadItems() {
            const response = await api.get(`/sellers/${sellerId}/sells/${sellId}/items`);

            setItems(response.data);
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
                            <li className="nav-item">
                                <Link className="nav-link" to={`/seller/${sellerId}/sell/${sellId}/item/new`}>Cadastrar Item</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="container">
                <table className="table table-bordless">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Valor</th>
                            <th>Comissão</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{(item.type == 'product' ? "Produto":"Serviço")}</td>
                            <td>R$ {item.value}</td>
                            <td>R$ {item.commission}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link className="btn btn-secondary" to={`/seller/${sellerId}`}>Voltar</Link>
            </main>
        </>
        )
    }