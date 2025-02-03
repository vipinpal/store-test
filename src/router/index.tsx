import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from '../container/itemList/itemList';
import Checkout from '../container/checkout/checkout';
import OrderConfirmation from '../container/confirmOrder/confirmOrder';
import path from './path';

interface AppRoutesProps { }

interface AppRoutesState { }

// AppRoutes component to define the routes
export default class AppRoutes extends React.Component<AppRoutesProps, AppRoutesState> {
    render() {

        return (
            <Router>
                <Routes>
                    <Route path={path.home} element={<ItemList />} />
                    <Route path={path.checkout} element={<Checkout />} />
                    <Route path={`${path.confirmation}/:orderId`} element={<OrderConfirmation />} />
                </Routes>
            </Router>
        );
    }
}