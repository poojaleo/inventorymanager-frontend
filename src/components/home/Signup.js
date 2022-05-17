import React, {useState} from "react";
import axios from "axios";
import LoginButton from "./LoginButton";
import {Button, Form, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

const Signup = (props) => {
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [signupSuccessful, setSignup] = useState(false);
    const [consoleMessage, setConsoleMessage] = useState('');
    const baseURL = "https://4gybudb0ui.execute-api.us-west-2.amazonaws.com/inventory-manager/";

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        validatePassword(event);
        setPasswordValue(event);
    }

    const validatePassword = (event) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(passwordRegex.test(event.target.value)) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }

    const setPasswordValue = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        validateEmail(event);
        setEmailValue(event);
    }

    const validateEmail = (event) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(emailRegex.test(event.target.value)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    }

    const setEmailValue = (event) => {
        setEmail(event.target.value);
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        setConsoleMessage("Registering User in progress");
        const requestBody = {
            "companyName": companyName,
            "emailAddress": email,
            "password": password
        }

        const url = `${baseURL}/company`;


        axios.post(url, requestBody).then(response => {
            console.log(response.data);
            setSignup(true);
        }).catch(error => {
            setSignup(false);
            console.log(error.message);
            setConsoleMessage("Company name already exists. Please use a different name");
        })
    }

    return (
        <div>
            <div className={"signin"}>
                <h4>Register</h4>
                <Form className={"form"} onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label htmlFor={"companyName"}>Company Name*</Label>
                        <Input type={"text"} name={"companyName"} id={"companyName"} value={companyName}
                               onChange={handleCompanyNameChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={"password"}>Password*</Label>
                        <Input type={"password"} name={"password"} id={"password"} value={password}
                               valid={validPassword}
                               invalid={!validPassword}
                               onChange={handlePasswordChange}
                        />
                        <FormFeedback valid>
                            Password meets the requirements.
                        </FormFeedback>
                        <FormText>Your password needs to be minimum 8 characters, 1 uppercase, 1 lowercase and 1 special character.</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor={"email"}>Email*</Label>
                        <Input type={"email"} name={"email"} id={"email"} value={email}
                               valid={validEmail}
                               invalid={!validEmail}
                               onChange={handleEmailChange}
                        />

                    </FormGroup>
                    <Button>Signup</Button>
                </Form>
                <div>
                    {consoleMessage}
                </div>
                <div className={"noAccount"}>
                    <h6>Already have an account. <LoginButton />
                    </h6>
                </div>
            </div>

            <div>
                {signupSuccessful ? (
                        <div className={"text-center"}>
                            <h4>{companyName} successfully registered!!</h4>
                            <h6>Go to the Login page to login</h6>
                            <LoginButton />
                        </div>
                    ) :
                    (
                        <h3>        </h3>
                    )}

            </div>


        </div>
    )
}

export default Signup;