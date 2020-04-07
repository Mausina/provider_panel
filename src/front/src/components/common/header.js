import React from "react";
import auth from "../auth/auth";

export const AppLayout = props => {
    console.log(props);
    return (
        <div>
            <h1>App Layout</h1>
            <button
                onClick={() => {
                    // instas.logout(() => {
                    //     props.history.push("/");
                    // });
                }}
            >
                Logout
            </button>
        </div>
    );
};
