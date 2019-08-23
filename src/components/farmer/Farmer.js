import React, {useEffect, useState} from 'react';

import '../../assets/stylesheets/farmer.scss';
import Dashboard from "./Dashboard";

import Layout from "../Layout";
import {getFarmerDetails} from "../../dbController/farmerRole";
import {connectToMetamask} from "../../dbController/init";
import Notification from "../Notification";
import {browserHistory} from 'react-router-dom'


const Farmer = (props) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    useEffect(() => {


        if (JSON.stringify(props.location.state) !== "{}") {
          setNotificationMessage(props.location.state.setMessage);
          setShowNotification(props.location.state.setNotification);
          // props.location.state.setNotification = false
          props.history.replace({ state: {} });
        }
        connectToMetamask().then(() => {

            getFarmerDetails().then((obj) => {

                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)


            })
        })
    }, []);


    return (<>
            <Notification show={showNotification} onClose={() => {
                setShowNotification(false)
            }} message={notificationMessage}/>
            <Layout userName={userName} profileImage={profileImage} location={props.location}>
                <Dashboard location={props.location}/>

            </Layout>
        </>
    );
};

export default Farmer;
