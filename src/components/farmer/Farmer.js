import React, {useEffect, useState} from 'react';

import '../../assets/stylesheets/farmer.scss';
import Dashboard from "./Dashboard";

import Layout from "../Layout";
import {getFarmerDetails} from "../../dbController/farmerRole";
import {connectToMetamask} from "../../dbController/init";


const Farmer = (props) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        connectToMetamask().then(() => {

            getFarmerDetails().then((obj) => {
                console.log(obj);
                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)

            })
        })
    });


    return (
        <Layout userName={userName} profileImage={profileImage}>
            <Dashboard location={props.location}/>
        </Layout>
    );
};

export default Farmer;
