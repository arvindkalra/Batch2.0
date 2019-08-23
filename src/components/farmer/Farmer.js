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
    const [showNotification, setShowNotification] =useState(false);

    useEffect(() => {



        if(props.location.state){
            console.log(props)
            setShowNotification(props.location.state.setNotification)
            // props.location.state.setNotification = false
            props.history.replace({state:{}})
            console.log(props.location.state)

        }
        connectToMetamask().then(() => {

            getFarmerDetails().then((obj) => {

                setUserName(obj.name);
                localStorage.setItem('name', obj.name);
                setProfileImage(obj.profileImage);
                localStorage.setItem('profileImage', obj.profileImage)


            })
        })
    },[]);


    return (<>
            <Notification show={showNotification} onClose={()=>{setShowNotification(false)}} />
        <Layout userName={userName} profileImage={profileImage} location={props.location}>
            <Dashboard location={props.location}/>

        </Layout>
        </>
    );
};

export default Farmer;
