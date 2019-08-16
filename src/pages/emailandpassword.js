import React, { useState } from 'react';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import _ from 'underscore'

import Header from '../components/header';
import OutterWrapper from '../components/wrapper';
import Row from '../components/row';
import RegisterForm from '../components/emailandpassword';
import MessageList from '../components/messagelist';
import Button from '../components/button';

const content = {
    title: 'Login',
    noEmail: 'Please provide your email address',
    noPassword: 'Please provide your password',
    authenticating: 'Authenticating',
    login: 'login',
    cancel: 'cancel'
}

export default props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState('');
    const { firebase } = props;

    /**
    * Checks that the user has all the necessary stuff to login
    */
    const attemptLogin = () => {
        let loginAttemptErrors = [];
        if (!email) {
            loginAttemptErrors.push(content.noEmail);
        }

        if (!password) {
            loginAttemptErrors.push(content.noPassword);
        }

        if (_.isEmpty(loginAttemptErrors)) {
            setMessages([content.authenticating])
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                Actions.home();
            })
            .catch((e) => setMessages([e.message]))
        } else {
            setMessages(loginAttemptErrors);
        }
    }

    return (
        <OutterWrapper>
            <Row>
                <Animatable.View
                    animation='fadeInDown'
                    iterationCount={1}
                    delay={400}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                  <Header title={content.title} />
                </Animatable.View>
            </Row>
            <RegisterForm
                        email={mail => {
                            setEmail(mail);
                        }}
                        password={pass => {
                            setPassword(pass);
                        }}
                        errors={err => setMessages(err)}
                    />
            <Row>
                <MessageList messageArray={messages}/>
                <Button onPress={() => attemptLogin() } title={content.login} />
                <Button onPress={() => Actions.login() } title={content.cancel} />
            </Row>
        </OutterWrapper>
    );
}