//reusable accross login and registerimport React, { useState, useEffect } from "react";
import React, { useState, useEffect} from 'react';
import { TextInput } from "react-native";

import Row from "../components/row";
import Label from "../components/label";
import Button from "../components/button";

import { emailAndPassword } from "../international";

export default props => {

    const [email, setEmail] = useState();
    const [password, setPassword] = usetState();
    const [confirm, setConfirm] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const validateEmail = () => {
        if (email) {
            if(!email.includes('@')) {
                setEmailError(emailAndPassword.errorEmailIncorrect)
            }
        }
    };

    const validatePassword = () => {
        if (password && confirm && password != confirm) {
            setPasswordError(emailAndPassword.errorPassword);
        }
    };

    const maybeRenderConfirmation = () => {
        if (props.showConfirmation) {
            return (
                <>
                <Label size="medium" position="center">
                {emailAndPassword.confirm}
                </Label>
                <TextInput
                    style={{
                        marginTop: 10,
                        padding: 19,
                        marginLeft: 20,
                        marginRight: 20,
                        minWidth: 300,
                        backgroundColor: "#fff",
                        borderRadius: 7,
                        borderWidth: 2,
                        borderColor: "#000",
                        alignItems: "center"
                    }}
                    onChangeText={text => setConfirm({ text })}
                    value={confirm}
                />
                </>
            );
        }
    }

    const maybeShowEmailError = () => {
        if (emailError) {
            return <Label color="tomato">{emailError}</Label>
        }
    }

    const maybeShowPasswordError = () => {
        if (passwordError) {
            return <Label color="tomato">{passwordError}</Label>
        }
    }

    if (props.passwordError && passwordError !== props.passwordError) {
       setPasswordError(props.passwordError);
    }

    if (props.emailError && emailError !== props.emailError) {
        setEmailError(props.emailError);
    }

    return (
        <Row>
            <Label size="medium" position="center">
                {emailAndPassword.email}
            </Label>
            <TextInput
                style={{
                    marginTop: 10,
                    padding: 19,
                    marginLeft: 20,
                    marginRight: 20,
                    minWidth: 300,
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: "#000",
                    alignItems: "center"
                }}
                onChangeText={text => setEmail({ text })}
                onBlur={() => validateEmail()}
                value={email}
            />
            {maybeShowEmailError()}
            <Label size="medium" position="center">
                {emailAndPassword.password}
            </Label>
            <TextInput
                style={{
                    marginTop: 10,
                    padding: 19,
                    marginLeft: 20,
                    marginRight: 20,
                    minWidth: 300,
                    backgroundColor: "#fff",
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: "#000",
                    alignItems: "center"
                }}
                onChangeText={text => setPassword({ text })}
                value={password}
            />
            {maybeShowPasswordError()}
        </Row>
    );
}
