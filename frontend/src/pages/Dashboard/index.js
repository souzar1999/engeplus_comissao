import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Dashboard({ history }){
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
                            <th>Vendedor</th>
                            <th>Comissão</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sellers.map(seller => (
                        <tr key={seller.id}>
                            <td>
                                <Link to={`/seller/${seller.id}`}>
                                    {seller.name}
                                </Link>
                            </td>
                            <td>R$ {seller.commission}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </>
        )
    }