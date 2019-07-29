import React from 'react';
import '../assets/stylesheets/sidebar.scss'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const SideBar = ({closeSideBar}) => {
    return (
        <div className={'sidebar'}>
            <header>
            <button type="button" className="close-sidebar" aria-label="Close" onClick={()=>{closeSideBar()}}>
                <span aria-hidden="true">&times;</span>
            </button>
                <h1 className={'title'}> BATCH</h1>
            </header>

                    <ul className={'sidebar-list'}>
                        <li>
                            <i className="fas fa-tachometer-alt"></i>
                            DASHBOARD
                        </li>
                        <li>
                            <i className="fas fa-list"></i>
                            PRODUCT LIST
                        </li>
                        <li>
                            <i className="fas fa-sign-out-alt"></i>
                            SIGN OUT
                        </li>
                    </ul>



        </div>
    );
};

export default SideBar;
