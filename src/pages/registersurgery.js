import React, { useState } from 'react';
import { Image, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import * as Animatable from 'react-native-animatable';
import _ from 'underscore';

import OutterWrapper from '../components/wrapper';
import Header from '../components/header';
import Row from '../components/row';
import Label from '../components/label';
import Button from '../components/button';
import { Actions } from 'react-native-router-flux';

import { register } from '../international';

const content = {
    missingRegisterCode: 'Please enter a registration code',
    registrationComplete: 'Your registration was succesfull! You can start using the app straightaway',
    checking: 'content.checking registration code',
    registrationCodePlaceholder: 'Activation code',
    details: 'Your surgery will have given you an activation code, enter this now',
    dob: 'Your date of birth',
    cancel: 'Cancel'
}

export default props => {
	const [registerCode, setRegisterCode] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [lastName, setLastName] = useState('');
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

    const { service } = props;

	const onFormSubmit = () => {
		if (_.isEmpty(registerCode)) {
			errors.push(content.missingRegisterCode);
		}
        if (_.isEmpty(errors)) {
            setDocument('get', 'surgeries');
        }
		if (response) {
			//user sends registration code to server,
			//server has a registration code that maps to a specific user, checks the code, generates a unique identifier token and provides this back to the app
			//the app leverages secure store to store this for the application. This can then be used to authorise user specific requests, such as making bookings.
			SecureStore.setItemAsync('patient_token_identifier', response.identifier)
				.then(() => {
					setMessage(content.registrationComplete);
				})
				.catch(e => setError(e.message));
		} else if (errors.length > 0) {
			setMessage(
				errors.reduce((p, c) => {
					return p + ' ' + c;
				}, '')
			);
		} else if (loading) {
			setMessage(content.checking);
		}
    };

	return (
		<OutterWrapper>
			<Row>
            <Label size='small' position='center'>
					{content.registrationCodePlaceholder}
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
                    textContentType = 'oneTimeCode'
					onChangeText={text => setRegisterCode({ text })}
					value={registerCode}
				/>
                <Label size='small' position='center'>
					{content.dob}
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
                    placeholder='DD/MM/YYYY'
					onChangeText={text => setDateOfBirth({ text })}
					value={registerCode}
				/>
			</Row>
			<Row />
			<Row>
				<Button
					onPress={() => {
						Actions.home();
					}}
					title={register.submit}
				/>
                <Button onPress={() => Actions.login() } title={content.cancel} />
			</Row>
		</OutterWrapper>
	);
}
