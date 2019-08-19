import React,{useEffect, useState} from 'react';
import Layout from "../Layout";
import DistDashboard from "./DistDashboard";
import {connectToMetamask} from "../../dbController/init";
import {getDistributorDetails} from "../../dbController/distributorRole";

const Distributor = ({location}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
            localStorage.clear()
        connectToMetamask().then(() => {

            getDistributorDetails().then((obj) => {
                console.log(obj);
                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)

            })
        })
    });


    return (
        <Layout profileImage={profileImage} userName={userName}>
            <DistDashboard location={location} />

        </Layout>
    );
};

export default Distributor;
