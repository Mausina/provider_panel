import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from '../service/AuthService'


export const ProtectedRoute = (ComponentToProtect) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            AuthService.refreshToken().then(res => {
                if (res.status === 200) {
                    let accessToken = JSON.stringify(res.data.accessToken);
                    localStorage.setItem("userToken", accessToken);
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false, redirect: true });
                }
            })
                .catch(err => {
                    console.error(err.response);
                    this.setState({ loading: false, redirect: true });
                });
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return (
                    <>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-info" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </>
                );;
            }
            if (redirect) {
                return <Redirect to="/" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
    }
};