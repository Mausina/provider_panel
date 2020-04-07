import React from "react";

export const LandingPage = props => {
    console.log(props);
    return (
        <div>
            <h1>Landing Page</h1>
            <button
                // onClick={() => {
                //     auth.login(() => {
                //         props.history.push("/app");
                //     });
                // }}
            >
                Login
            </button>
        </div>
    );
};
