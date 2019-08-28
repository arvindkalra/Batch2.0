import React, {useState, useEffect} from 'react';
import Layout from "../Layout";
import RetailerDashboard from "./RetailerDashboard";
import {connectToMetamask} from "../../dbController/init";

import {getRetailerDetails} from "../../dbController/retailerRole";
import {clearLocal} from "../../helpers";

const Retailer = ({location}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        connectToMetamask().then(() => {
            clearLocal();

            getRetailerDetails().then((obj) => {
                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)

            })
        })
    });


    return (

        <Layout userName={userName} profileImage={profileImage} location={location}>
            <RetailerDashboard location={location}/>
        </Layout>

    );
};

export default Retailer;
