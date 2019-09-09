import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import DistDashboard from "./DistDashboard";
import {connectToWeb3} from "../../dbController/init";
import {getDistributorDetails} from "../../dbController/distributorRole";
import {clearLocal} from "../../helpers";

const Distributor = ({location, history, userRole}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        clearLocal();
        connectToWeb3().then(() => {
            getDistributorDetails().then((obj) => {
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
        <Layout profileImage={profileImage} userName={userName} location={location} history={history}>
            <DistDashboard location={location}/>

        </Layout>
    );
};

export default Distributor;
