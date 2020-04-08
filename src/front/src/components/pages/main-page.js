import React, {Component} from 'react';
import '../css/main.css'
import {
    MDBCollapse,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink,
    MDBCard, MDBCardTitle, MDBCardText, MDBContainer
} from "mdbreact";

import CustomerService from '../../service/CustomerService'


export default class PersistentDrawerLeft extends Component {
    state = {
        isOpen: false,
        user: JSON.parse(localStorage.getItem('userInfo')),
        userInfo: null
    };


    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    };


    componentDidMount(): void {
        CustomerService.getInfo(this.state.user.id).then(
            user => this.setState({userInfo: user.data.user})
        );
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md">
                    <div className="container">
                        <MDBNavbarBrand>
                            <span
                                className="white-text">Добрый день <strong>{this.state.userInfo ? this.state.userInfo.firstname : ''}</strong></span>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse}/>
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav right>
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="viber://chat?number=380503986114">
                                            <MDBIcon fab icon="viber"/>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="tg://resolve?domain=@ZooComplex"><MDBIcon fab
                                                                                                                icon="telegram-plane"/></a>
                                    </li>
                                </ul>
                                <MDBNavItem>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <MDBIcon icon="user"/>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu className="dropdown-default">
                                            <MDBDropdownItem href="/">Exit</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </div>
                </MDBNavbar>

                <MDBContainer>
                    <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
                        <MDBCardTitle>Panel Title</MDBCardTitle>
                        <MDBCardText>
                            Some quick example text to build on the panel title and make up the
                            bulk of the panel's content.
                        </MDBCardText>
                        <div className="flex-row">
                            <a href="#!">MDBCard link</a>
                            <a href="#!" style={{ marginLeft: "1.25rem" }}>Another link</a>
                        </div>
                    </MDBCard>
                </MDBContainer>
            </div>
        );
    }
}

