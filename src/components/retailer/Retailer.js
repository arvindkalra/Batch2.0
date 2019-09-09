import React, {useState, useEffect} from 'react';
import Layout from "../Layout";
import RetailerDashboard from "./RetailerDashboard";
import {connectToWeb3} from "../../dbController/init";

import {getRetailerDetails} from "../../dbController/retailerRole";
import {clearLocal} from "../../helpers";

const Retailer = ({location, history, userRole}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        connectToWeb3().then(() => {
            clearLocal();

            getRetailerDetails().then((obj) => {
                if(typeof obj !== 'undefined'){
                    setUserName(obj.name);
                    localStorage.setItem('name', obj.name);
                    setProfileImage(obj.profileImage);
                    localStorage.setItem('profileImage', obj.profileImage)
                }else{

                    history.push(`/${userRole}/about`)

                }


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
