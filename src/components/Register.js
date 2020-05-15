import React from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            login: "",
            password: "",
            role: 3,
        };
        this.changeState = this.changeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeState(e) {
        switch (e.target.id) {
            case "mail":
                this.setState({ mail: e.target.value });
                break;
            case "login":
                this.setState({ login: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const body = {
            mail: this.state.mail,
            login: this.state.login,
            password: SHA256(this.state.password).toString(),
            role: this.state.role,
        };
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        fetch("http://localhost:8080/register", request)
            .then((result) => {
                // status: 200 jesli ok
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        this.setState({
            mail: "",
            login: "",
            password: "",
        });
    }
    render() {
        return (
            <div className="login-modal-background">
                <div className="login-box-container">
                    <div className="login-box">
                        <div className="login-select-login-register">
                            <button
                                className="login-select-button"
                                type="submit"
                                onClick={this.props.toggle}
                                value="login"
                            >
                                Logowanie
                            </button>
                            <button
                                className="login-select-button-active"
                                type="submit"
                                onClick={this.props.toggle}
                                value="register"
                            >
                                Rejestracja
                            </button>
                        </div>
                        <div className="login-invalid-data-container">
                            <p>Niepoprawne dane</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <div className="login-form-row">
                                    <div className="login-form-row-item">
                                        <label className="login-form-row-input-wrapper">
                                            <svg
                                                id="mail-icon"
                                                className="login-icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z" />
                                            </svg>
                                            <input
                                                type="text"
                                                className="login-form-row-input"
                                                onChange={this.changeState}
                                                value={this.state.mail}
                                                id="mail"
                                                required
                                            />
                                            <span className="placeholder">
                                                Email
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="login-form-row">
                                    <div className="login-form-row-item">
                                        <label className="login-form-row-input-wrapper">
                                            <svg
                                                id="user-icon"
                                                className="login-icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M313.6 288c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM416 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 56.5 0 102.4 45.9 102.4 102.4V464zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
                                            </svg>
                                            <input
                                                type="text"
                                                className="login-form-row-input"
                                                onChange={this.changeState}
                                                value={this.state.login}
                                                id="login"
                                                required
                                            />
                                            <span className="placeholder">
                                                Login
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="login-form-row">
                                    <div className="login-form-row-item">
                                        <label className="login-form-row-input-wrapper">
                                            <svg
                                                id="lock-icon"
                                                className="login-icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M400 224h-16v-62.5C384 73.1 312.9.3 224.5 0 136-.3 64 71.6 64 160v64H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM96 160c0-70.6 57.4-128 128-128s128 57.4 128 128v64H96v-64zm304 320H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v192c0 8.8-7.2 16-16 16z" />
                                            </svg>
                                            <input
                                                type="password"
                                                className="login-form-row-input"
                                                onChange={this.changeState}
                                                value={this.state.password}
                                                id="password"
                                                required
                                            />
                                            <span className="placeholder">
                                                Hasło
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="login-submit-button-container">
                                <button
                                    className="login-submit-button"
                                    type="submit"
                                >
                                    Zaloguj się
                                </button>
                            </div>
                        </form>
                        <div className="login-cancel">
                            <button
                                className="login-cancel-button"
                                onClick={this.props.hideLoginRegister}
                                value="hide"
                            >
                                anuluj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
