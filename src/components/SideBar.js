import React from "react";
import "../assets/stylesheets/sidebar.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

const SideBar = ({closeSideBar, userName, profileImage, profession, hidden, history}) => {
    const getProductListLink = () => {
        switch (profession) {
            case "cultivator":
                return "/cultivator/products";
            default:
                return "#";
        }
    };

    return (
        <Container>
            <div className={hidden}>
                <header>
                    <button
                        type="button"
                        className="close-sidebar"
                        aria-label="Close"
                        onClick={() => {
                            closeSideBar();
                        }}
                    >
                        &times;
                    </button>
                    <h1 className={"title"}> BATCH</h1>
                </header>
                <section className={"sidebar-profile-section"}>
                    <Row>
                        <Col md={5} sm={5} xs={5}>
                            <img
                                src={
                                    profileImage ||
                                    localStorage.getItem("profileImage") ||
                                    "https://picsum.photos/id/1074/100"
                                }
                                alt=""
                                className={"profile-image"}
                            />
                        </Col>
                        <Col md={7} sm={7} xs={7} className={"sidebar-profile-details"}>
              <span className={"name"}>
                {" "}
                  {userName || localStorage.getItem("name") || "Loading..."}
              </span>{" "}
                            <br/>
                            <span className={'profession'}>{profession.toUpperCase() || "Loading..."}</span>
                        </Col>
                    </Row>
                </section>

                <ul className={"sidebar-list"}>
                    <li>
                        <i className="fas fa-user-circle"/>
                        <Link to={`/${profession}/about`}>PROFILE</Link>
                    </li>
                    <li>
                        <i className="fas fa-tachometer-alt"/>
                        <Link to={`/${profession}/dashboard`}>DASHBOARD</Link>
                    </li>
                    <li>
                        <i className="fas fa-list"/>
                        <Link to={getProductListLink()}>PRODUCT LIST</Link>
                    </li>
                    <li>
                        <i className="fas fa-chart-line"/>
                        Reports and Summaries
                    </li>
                    <li>
                        <i className="fas fa-sign-out-alt"/>
                        <Link  to={'/'} onClick={(e)=>{
                            e.preventDefault()
                          localStorage.setItem("pkey", '');
                            history.push('/',{
                                signOut: 'false'
                            })

                        }}>
                            Sign Out
                        </Link>
                    </li>
                </ul>

                <section className={"sidebar-footer-section"}>
                    <ul>
                        <li>
                            <i className="fas fa-bell"/>
                        </li>
                        <li>
                            <i className="fas fa-envelope"/>
                        </li>
                        <li>
                            <i className="fas fa-cog"/>
                        </li>
                    </ul>
                </section>
            </div>
        </Container>
    );
};

export default SideBar;
