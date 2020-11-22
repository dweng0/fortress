//reusable accross login and registerimport React, { useState, useEffect } from "react";
import React, { useState, useEffect } from 'react';
import { TextInput} from 'react-native';

import Row from '../row';
import Label from '../label';

import { emailAndPassword } from '../../international';

export default props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        props.errors(null);
        if (password && password === confirm) {
            if (props.email) {
                props.email(email);
            }

            if (props.password) {
                props.password(password);
            }
        }

        if (emailError || passwordError && props.errors) {
            props.errors({ email: emailError, password: passwordError });
        }

    }, [email, password, confirm, emailError, passwordError]);
    const validateEmail = () => {
        setEmailError(false);
        if (email && !email.includes('@')) {
            setEmailError(emailAndPassword.errorEmailIncorrect);
        }
    };

    const validatePassword = () => {
        setPasswordError(false);
        if (password !== confirm) {
            setPasswordError(emailAndPassword.errorPassword);
        }
    }

    const maybeShowEmailError = () => {
        if (emailError) {
            return <Label color="tomato">{emailError}</Label>;
        }
    };

    const maybeShowPasswordError = () => {
        if (passwordError) {
            return <Label color="tomato">{passwordError}</Label>;
        }
    };

    if (props.passwordError && passwordError !== props.passwordError) {
        setPasswordError(props.passwordError);
    }

    if (props.emailError && emailError !== props.emailError) {
        setEmailError(props.emailError);
    }

    const maybeShowConfirmation = () => {
        if (props.confirmPassword) {
            return (
                <>
                    <Label size="small" position="center">
                        {emailAndPassword.confirm}
                    </Label>
                    <TextInput
                        style={{
                            marginTop: 10,
                            padding: 19,
                            marginLeft: 20,
                            marginRight: 20,
                            minWidth: 300,
                            backgroundColor: '#fff',
                            borderRadius: 7,
                            borderWidth: 2,
                            borderColor: '#000',
                            alignItems: 'center'
                        }}
                        secureTextEntry={true}
                        onChangeText={text => setConfirm(text)}
                        onBlur={() => validatePassword()}
                        value={confirm}
                    />
                </>
            );
        }
    };

    return (
        <Row>
                <Label size="small" position="center">
                    {emailAndPassword.email}
                </Label>
                <TextInput
                    style={{
                        marginTop: 10,
                        padding: 19,
                        marginLeft: 20,
                        marginRight: 20,
                        minWidth: 300,
                        backgroundColor: '#fff',
                        borderRadius: 7,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center'
                    }}
                    onChangeText={text => setEmail(text)}
                    onBlur={() => validateEmail()}
                    value={email}
                />
                {maybeShowEmailError()}
                <Label size="small" position="center">
                    {emailAndPassword.password}
                </Label>
                <TextInput
                    style={{
                        marginTop: 10,
                        padding: 19,
                        marginLeft: 20,
                        marginRight: 20,
                        minWidth: 300,
                        backgroundColor: '#fff',
                        borderRadius: 7,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center'
                    }}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                {maybeShowPasswordError()}
                {maybeShowConfirmation()}
        </Row>
    );
};
