import React from 'react';
import Spinner from "react-bootstrap/es/Spinner";

const Loader = ({message}) => {
    return (
        <div className={'loader'}>
            <div className={'loader-container'}>

                {message ||'Your Transaction is mining'} <br/>
                <span>

                <Spinner animation="grow" variant="light"/>
                </span>
            </div>

        </div>
    );
};

export default Loader;
