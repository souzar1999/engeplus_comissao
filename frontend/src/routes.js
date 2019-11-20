import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Seller from './pages/Seller';
import Sell from './pages/Sell';
import SellerNew from './pages/SellerNew';
import SellNew from './pages/SellNew';
import ItemNew from './pages/ItemNew';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/register" component={Register} />
                <Route path="/seller/new"  component={SellerNew} />
                <Route path="/sell/new" component={SellNew} />
                <Route path="/seller/:sellerId/sell/:sellId/item/new" component={ItemNew} />
                <Route path="/seller/:sellerId/sell/:sellId" component={Sell} />
                <Route path="/seller/:sellerId" component={Seller} />
            </Switch>
        </BrowserRouter>
    )
}