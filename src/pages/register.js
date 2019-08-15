import React, { useState } from 'react';
import { Actions } from "react-native-router-flux";

import OutterWrapper from '../components/wrapper';
import RegisterForm from '../components/emailandpassword';
import Row from '../components/row';
import Label from '../components/label';
import Button from '../components/button';

import { useDocument }  from '../hooks'


const content = {
    missing: 'please fill in the required fields',
    submit: 'next'
}
export default props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [hasErrors, setHasErrors] = useState(false);

    const { service } = props;

    const firebase = service;

    const wrappedValidation = () => {

    }

	const submitRegistration = () => {
		if (email && password) {
            setMessage('Registering....')
            service.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                Actions.surgerySelect();
            })
            .catch(e => {
                setMessage(e.message);
            })
		} else {
            setMessage(content.missing);
		}
    };
	return (
		<OutterWrapper>
			<RegisterForm
				confirmPassword={true}
				email={mail => {
					setEmail(mail);
				}}
				password={pass => {
					setPassword(pass);
                }}
                errors={err => setHasErrors(!!(err))}
			/>
            <Row>
                <Label size="small" position="center">
                    { (message) ? message : '' }
                </Label>
                <Button onPress={() => submitRegistration() } title={content.submit} />
            </Row>
		</OutterWrapper>
	);
};