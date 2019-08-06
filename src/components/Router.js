import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../App";
import Farmer from "./farmer/Farmer";
import Product from "./farmer/Product";
import About from './farmer/About';
import Laboratory from './laboratory/Laboratory';
import Manufacturer from "./manufacturer/Manufacturer";
import Transporter from "./transporter/Transporter";
import ManufacturerBatchDetail from "./manufacturer/ManufacturerBatchDetail";
import Retailer from "./retailer/Retailer";
import RetailProduct from "./retailer/RetailProduct";
const AppRouter = () => {
    return (
        <Router>
            <Route exact path={'/'} component={App} />
            <Route exact path={'/farmer/dashboard'} component={Farmer} />
            <Route exact path={'/farmer/about'} component={About} />
            <Route exact path={'/farmer/products/:product'} component={Product}  />
            <Route exact path={'/laboratory/dashboard'} component={Laboratory}/>
            <Route exact path={'/manufacturer/dashboard'} component={Manufacturer}/>
            <Route exact path={'/transporter/dashboard'} component={Transporter}/>
            <Route exact path={'/manufacturer/harvests/:buid'} component={ManufacturerBatchDetail}/>
            <Route exact path={'/retailer/dashboard'} component={Retailer} />
            <Route exact path={'/retailer/products/:id'} component={RetailProduct} />
        </Router>
    );
};

export default AppRouter;
