import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../App";
import Farmer from "./farmer/Farmer";
import Product from "./farmer/Product";
import About from './farmer/About';
import Laboratory from './laboratory/Laboratory';
import Manufacturer from "./manufacturer/Manufacturer";
const AppRouter = () => {
    return (
        <Router>
            <Route exact path={'/'} component={App} />
            <Route exact path={'/farmer/dashboard'} component={Farmer} />
            <Route exact path={'/farmer/about'} component={About} />
            <Route exact path={'/farmer/products/:product'} component={Product}  />
            <Route exact path={'/laboratory/dashboard'} component={Laboratory}/>
            <Route exact path={'/manufacturer/dashboard'} component={Manufacturer}/>
        </Router>
    );
};

export default AppRouter;
