import React from 'react';
import Spinner from "react-bootstrap/es/Spinner";

const Loader = () => {
    return (
        <div className={'loader'}>
            <div className={'loader-container'}>

                Your Transaction is mining <br/>
                <span>

                <Spinner animation="grow" variant="dark"/>
                </span>
            </div>

        </div>
    );
};

export default Loader;
