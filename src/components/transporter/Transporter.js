import React, {useState, useEffect} from 'react';
import Layout from "../Layout";
import "../../assets/stylesheets/transporter.scss";
import {connectToMetamask} from "../../dbController/init";
import {getTransporterDetails} from "../../dbController/transporterRole";
import {clearLocal} from "../../helpers";
import NewDashboard from "./newDashboard";
import TransporterDashboard from "./TransporterDashboard";

const Transporter = ({location}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        connectToMetamask().then(() => {
            clearLocal();

            getTransporterDetails().then((obj) => {

                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)

            })
        })
    });

    return (
        <Layout userName={userName} profileImage={profileImage} location={location}>
            {/*<TransporterDashboard location={location}/>*/}
            <NewDashboard location={location}/>
        </Layout>
    );
};

export default Transporter;
