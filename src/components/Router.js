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
import TrackProduct from "./TrackProduct";
import NewHarvest from "./farmer/NewHarvest";
import Products from "./farmer/Products";
import Distributor from "./distributor/Distributor";

const AppRouter = () => {
    return (
        <Router>
            <Route exact path={'/'} component={App}/>
            {/*farmer router*/}
            <Route exact path={'/farmer/dashboard'} component={Farmer}/>
            <Route exact path={'/farmer/about'} component={About}/>
            <Route exact path={'/farmer/add-new-harvest'} component={NewHarvest}/>
            <Route exact path={'/farmer/products/:product'} component={Product}/>
            <Route exact path={'/farmer/products'} component={Products}/>
            {/*lab routes*/}
            <Route exact path={'/laboratory/dashboard'} component={Laboratory}/>
            {/*manufacturer router*/}
            <Route exact path={'/manufacturer/dashboard'} component={Manufacturer}/>
            <Route exact path={'/manufacturer/harvests/:buid'} component={ManufacturerBatchDetail}/>
            {/*distributor routes*/}
            <Route exact path={'/distributor/dashboard'} component={Distributor}/>
            {/*transporter routes*/}
            <Route exact path={'/transporter/dashboard'} component={Transporter}/>
            {/*retailer routes*/}
            <Route exact path={'/retailer/dashboard'} component={Retailer}/>
            <Route exact path={'/retailer/products/:id'} component={RetailProduct}/>
            {/*miscellaneous*/}
            <Route exact path={'/journey/:id'} component={TrackProduct}/>
        </Router>
    );
};

export default AppRouter;
