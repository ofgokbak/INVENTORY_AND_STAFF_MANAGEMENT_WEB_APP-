import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import *  as FaIcons from "react-icons/fa";
import AuthService from "../Services/AuthenticationService";
import { Button, Form } from 'react-bootstrap';
import './Login.css';

const LoginPage = () => {

    const initialSignUpRequest = {
        email: "",
        password: "",
    }

    const [data, setData] = useState(initialSignUpRequest);
    let history = useHistory();
    const [message, setMessage] = useState("");

    const submit = e => {
        e.preventDefault();
        setData({ ...data, loading: true });
        const finalData = {
            email: data.email,
            password: data.password
        }

        AuthService.signin(finalData).then(
            res => {
                history.push("/dashboard");
            }).catch(e => setMessage(
                "Invalid Credentials"
            ));
        setData(initialSignUpRequest);
        console.log(message);
    }

    const handle = e => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)

    }

    return (
        <Form className="form-wrapper" onSubmit={(e) => submit(e)} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FaIcons.FaUser className="user-profile" />
            <Form.Group >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id="email" name="email" value={data.email} onChange={(e) => handle(e)} required />
            </Form.Group>

            <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="password" name="password" value={data.password} onChange={(e) => handle(e)} required />
            </Form.Group>
            <Form.Text controlid="text-muted" className="alert-danger">
                {message}
            </Form.Text>
            <Button variant="primary" type="submit" >
                Log In
            </Button>
        </Form>
    );
}
export default LoginPage;