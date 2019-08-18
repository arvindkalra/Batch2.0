import React, {useState, useEffect} from 'react';
import Layout from "../Layout";
import TransporterDashboard from "./TransporterDashboard";
import "../../assets/stylesheets/transporter.scss";
import {connectToMetamask} from "../../dbController/init";
import {getTransporterDetails} from "../../dbController/transporterRole";

const Transporter = ({location}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        connectToMetamask().then(() => {
            localStorage.clear()

            getTransporterDetails().then((obj) => {
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
            <TransporterDashboard location={location}/>
        </Layout>
    );
};

export default Transporter;
