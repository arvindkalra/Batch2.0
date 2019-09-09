import React, {useEffect, useState} from 'react';
import '../../assets/stylesheets/farmer.scss';
import Dashboard from "./Dashboard";
import Layout from "../Layout";
import {getFarmerDetails} from "../../dbController/farmerRole";
import {connectToWeb3} from "../../dbController/init";
import Notification from "../Notification";


const Farmer = ({location, history, userRole}) => {
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    useEffect(() => {


        if (location.state && JSON.stringify(location.state) !== "{}") {
          setNotificationMessage(location.state.setMessage);
          setShowNotification(location.state.setNotification);
          // props.location.state.setNotification = false
          history.replace({ state: {} });
        }
        connectToWeb3().then(() => {

            getFarmerDetails().then((obj) => {

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
    }, []);


    return (<>
            <Notification show={showNotification} onClose={() => {
                setShowNotification(false)
            }} message={notificationMessage}/>
            <Layout userName={userName} profileImage={profileImage} location={location}>
                <Dashboard location={location} history={history}/>

            </Layout>
        </>
    );
};

export default Farmer;
