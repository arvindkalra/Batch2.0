import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "../App";
import Farmer from "./farmer/Farmer";

const AppRouter = () => {
    return (
        <Router>
            <Route exact path={'/'} component={App} />
            <Route path={'/farmer'} component={Farmer} />
        </Router>
    );
};

export default AppRouter;
