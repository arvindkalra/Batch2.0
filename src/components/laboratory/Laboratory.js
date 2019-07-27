import React from 'react';

import '../laboratory.scss';

import Layout from "../Layout";
import LabDashboard from "./LabDashboard";


const Laboratory = (props) => {


    return (
        <Layout>
            <LabDashboard location={props.location}/>
        </Layout>
    );
};

export default Laboratory;
