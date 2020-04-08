import React from 'react';
import AuthService from '../../service/AuthService'
import jwt from 'jwt-decode'
import {MDBAlert, MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdbreact';


class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            msg: '',
            show: false
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    login = (e) => {
        e.preventDefault();
        const credentials = {email: this.state.email, password: this.state.password};
        this.setState({msg:'', show: false});
        AuthService.login(credentials).then(res => {
            if (res.status === 200) {
                let accessToken = JSON.stringify(res.data.access.token);
                let refreshToken = JSON.stringify(res.data.refresh.token);
                const user = jwt(accessToken);

                localStorage.setItem("userToken", accessToken);
                localStorage.setItem("userInfo", JSON.stringify(user));
                localStorage.setItem("userRefreshToken", refreshToken);
                this.props.history.push('/main');
            }
        }).catch(error => {
            console.log(error.response);
            this.setState({msg: error.response.data.msg, show: true});
        });
    };

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    render() {

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Sign in</p>
                            {this.state.show ?<MDBAlert color="danger">
                                {this.state.msg}
                            </MDBAlert> : ''}
                            <div className="grey-text">
                                <MDBInput label="Type your email" name='email' value={this.state.username}
                                          onChange={this.onChange} icon="envelope" group type="email" validate
                                          error="wrong"
                                          success="right"/>
                                <MDBInput label="Type your password" name='password' value={this.state.password}
                                          onChange={this.onChange} icon="lock" group type="password" validate/>
                            </div>
                            <div className="text-center">
                                <MDBBtn onClick={this.login}>Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )

    }

}


export default LoginComponent;