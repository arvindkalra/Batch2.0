import React from 'react';

import '../farmer.scss';
import Dashboard from "./Dashboard";

import Layout from "../Layout";
const Farmer = (props) => {
    return (
       <Layout>
           <Dashboard location={props.location} />
       </Layout>
    );
};

export default Farmer;
