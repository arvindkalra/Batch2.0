import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
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
import NewProduct from "./farmer/NewProduct";

const AppRouter = () => {

    return (
        <Router>
            <Route exact path={'/'} component={App}/>
            {/*farmer router*/}
            {localStorage.getItem('pkey') ? <>
                {/*cultivator routes*/}
                <Route exact path={'/cultivator/dashboard'} render={props => <Farmer {...props} userRole={'cultivator'}/>}/>
                <Route exact path={'/cultivator/about'} component={About}/>
                <Route exact path={'/cultivator/add-new-harvest'} component={NewHarvest}/>
                <Route exact path={'/cultivator/products/:product'} component={Product}/>
                <Route exact path={'/cultivator/NewProduct/00001A'} component={NewProduct}/>
                <Route exact path={'/cultivator/products'} component={Products}/>



                {/*lab routes*/}
                <Route exact path={'/laboratory/dashboard'}
                       render={props => <Laboratory {...props} userRole={'laboratory'}/>}/>
                <Route exact path={'/laboratory/about'} component={About}/>
                <Route exact path={'/laboratory/report/:id'} component={Report}/>




                {/*manufacturer router*/}
                <Route exact path={'/manufacturer/dashboard'} render={
                    (props) =>
                        <Manufacturer {...props} userRole={'manufacturer'}/>

                }/>
                <Route exact path={'/manufacturer/about'} component={About}/>
                <Route exact path={'/manufacturer/harvest/:buid'} component={ManufacturerBatchDetail}/>




                {/*distributor routes*/}
                <Route exact path={'/distributor/dashboard'}
                       render={props => <Distributor {...props} userRole={'distributor'}/>}/>
                <Route exact path={'/distributor/product/:buid'} component={DistributorProductDetail}/>
                <Route exact path={'/distributor/about'} component={About}/>



                {/*transporter routes*/}
                <Route exact path={'/transporter/dashboard'} render={ props => <Transporter {...props} userRole={'transporter'} />  }  />
                <Route exact path={'/transporter/about'} component={About}/>



                {/*retailer routes*/}
                <Route exact path={'/retailer/dashboard'} render={props => <Retailer {...props} userRole={'retailer'} /> }  />
                <Route exact path={'/retailer/products/:id'} component={RetailProduct}/>
                <Route exact path={'/retailer/about'} component={About}/>
            </> : <Redirect from={'/*'} to={'/'}/>}

            {/*miscellaneous*/}
            <Route exact path={'/journey/:id'} component={TrackProduct}/>
        </Router>
    );
};

export default AppRouter;
