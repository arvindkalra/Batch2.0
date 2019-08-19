import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import ManufacturerDashboard from "./ManufacturerDashboard";
import "../../assets/stylesheets/manufacturer.scss";
import {connectToMetamask} from "../../dbController/init";
import {getManufacturerDetails} from "../../dbController/manufacturerRole";

const Manufacturer = ({location}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        connectToMetamask().then(() => {
            localStorage.clear();
            getManufacturerDetails().then((obj) => {

                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)

            })
        })
    });
    return (
        <Layout userName={userName} profileImage={profileImage} location={location}>
            <ManufacturerDashboard location={location}/>
        </Layout>
    );
};

export default Manufacturer;
