import React from "react";
import { Route, Redirect } from "react-router-dom";
import CutomerService from "../service/CustomerService";

export const ProtectedRoute = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (CutomerService.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};