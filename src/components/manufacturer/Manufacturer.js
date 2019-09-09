import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import ManufacturerDashboard from "./ManufacturerDashboard";
import "../../assets/stylesheets/manufacturer.scss";
import {connectToMetamask} from "../../dbController/init";
import {getManufacturerDetails} from "../../dbController/manufacturerRole";
import {clearLocal} from "../../helpers";

const Manufacturer = ({location,history, userRole}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {

        connectToMetamask().then(() => {
            clearLocal();
            getManufacturerDetails().then((obj) => {
                console.log(obj);
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
            <ManufacturerDashboard location={location}/>
        </Layout>
    );
};

export default Manufacturer;
