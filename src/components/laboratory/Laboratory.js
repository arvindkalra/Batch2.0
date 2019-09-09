import React, { useEffect, useState } from "react";

import "../../assets/stylesheets/laboratory.scss";

import Layout from "../Layout";
import LabDashboard from "./LabDashboard";
import { connectToWeb3 } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";
import { getLaboratoryDetails } from "../../dbController/laboratoryRole";
import { clearLocal } from "../../helpers";

const Laboratory = ({location, history, userRole}) => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [labDetails, setLabDetails] = useState({});
  useEffect(() => {
    clearLocal();
    connectToWeb3().then(() => {
      getLaboratoryDetails().then(obj => {
        if(typeof obj !== 'undefined'){
          setUserName(obj.name);
          localStorage.setItem('name', obj.name);
          setProfileImage(obj.profileImage);
          localStorage.setItem('profileImage', obj.profileImage)
          setLabDetails(obj);
        }else{
          history.push(`/${userRole}/about`)

        }

      });
    });
  }, []);

  return (
    <Layout
      profileImage={profileImage}
      userName={userName}
      location={location}
    >
      <LabDashboard location={location} labDetails={labDetails}/>
    </Layout>
  );
};

export default Laboratory;
