import React, {useEffect, useState} from 'react';

import '../../assets/stylesheets/laboratory.scss';

import Layout from "../Layout";
import LabDashboard from "./LabDashboard";
import {connectToMetamask} from "../../dbController/init";
import {getFarmerDetails} from "../../dbController/farmerRole";
import {getLaboratoryDetails} from "../../dbController/laboratoryRole";


const Laboratory = (props) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        localStorage.clear();
        connectToMetamask().then(() => {

            getLaboratoryDetails().then((obj) => {
                console.log(obj);
                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)

            })
        })
    }, []);

    return (
        <Layout profileImage={profileImage} userName={userName} location={props.location}>
            <LabDashboard location={props.location}/>
        </Layout>
    );
};

export default Laboratory;
