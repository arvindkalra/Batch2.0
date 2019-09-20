import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "../../assets/stylesheets/transporter.scss";
import { connectToWeb3 } from "../../dbController/init";
import { getTransporterDetails } from "../../dbController/transporterRole";
import { clearLocal } from "../../helpers";
import NewDashboard from "./newDashboard";
import TransporterDashboardUnused from "./TransporterDashboard (unused)";

const Transporter = ({ location, history, userRole }) => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    connectToWeb3().then(() => {
      clearLocal();

      getTransporterDetails().then(obj => {
        if (obj !== null) {
          setUserName(obj.name);
          localStorage.setItem("name", obj.name);
          setProfileImage(obj.profileImage);
          localStorage.setItem("profileImage", obj.profileImage);
        } else {
          history.push(`/${userRole}/about`);
        }
      });
    });
  }, []);

  return (
    <Layout
      userName={userName}
      profileImage={profileImage}
      location={location}
      history={history}
    >
      {/*<TransporterDashboard location={location}/>*/}
      <NewDashboard location={location} />
    </Layout>
  );
};

export default Transporter;
