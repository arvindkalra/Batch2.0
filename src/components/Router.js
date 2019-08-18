import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../App";
import Farmer from "./farmer/Farmer";
import Product from "./farmer/Product";
import About from './About';
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
import Report from "./laboratory/Report";
import DistributorProductDetail from "./distributor/DistributorProductDetail";

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
            <Route exact path={'/laboratory/about'} component={About}/>
            <Route exact path={'/laboratory/report/:id'} component={Report}/>
            {/*manufacturer router*/}
            <Route exact path={'/manufacturer/dashboard'} component={Manufacturer}/>
            <Route exact path={'/manufacturer/about'} component={About}/>
            <Route exact path={'/manufacturer/harvest/:buid'} component={ManufacturerBatchDetail}/>
            {/*distributor routes*/}
            <Route exact path={'/distributor/dashboard'} component={Distributor}/>
            <Route exact path={'/distributor/product/:buid'} component={DistributorProductDetail}/>
            <Route exact path={'/distributor/about'} component={About}/>
            {/*transporter routes*/}
            <Route exact path={'/transporter/dashboard'} component={Transporter}/>
            <Route exact path={'/transporter/about'} component={About}/>
            {/*retailer routes*/}
            <Route exact path={'/retailer/dashboard'} component={Retailer}/>
            <Route exact path={'/retailer/products/:id'} component={RetailProduct}/>
            <Route exact path={'/retailer/about'} component={About}/>
            {/*miscellaneous*/}
            <Route exact path={'/journey/:id'} component={TrackProduct}/>
        </Router>
    );
};

export default AppRouter;
