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
import MessageList from '../components/messagelist';
import { Actions } from 'react-native-router-flux';

import { register } from '../international';
import data from '../pages/tokens';

const content = {
    missingRegisterCode: 'Please enter a registration code',
    registrationComplete: 'Your registration was succesfull! You can start using the app straightaway',
    checking: 'content.checking registration code',
    registrationCodePlaceholder: 'Activation code',
    details: 'Your surgery will have given you an activation code, enter this now',
    missingBirthdate: 'Please add a birthdate',
    dob: 'Your date of birth',
    cancel: 'Cancel',
    registering: 'Registering...'
}

export default props => {
	const [registerCode, setRegisterCode] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [lastName, setLastName] = useState('');
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

    const { service } = props;
    const db = service.firestore();
    //db.collection('tokens').add(data);
    //https://firebase.google.com/docs/firestore/quickstart?authuser=0

	const onFormSubmit = () => {
        setErrors([]);
		if (_.isEmpty(registerCode)) {
			errors.push(content.missingRegisterCode);
		}

        if(_.isEmpty(dateOfBirth)) {
            errors.push(content.missingBirthdate);
        }
        if (_.isEmpty(errors)) {
            setMessage(content.registering);
            service.db.collection().get()
            .then(() => {
                console.log('todo homie')
            })
            .catch((e) => {
                setMessage(e.message);
            });
        } else {
            setMessage(
				errors.reduce((p, c) => {
					return p + ' \r\n' + c;
				}, '')
			);
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
					onChangeText={text => setRegisterCode(text)}
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
					onChangeText={text => setDateOfBirth(text)}
					value={dateOfBirth}
				/>
			</Row>

			<Row>
                <Label>{message}</Label>
				<Button onPress={() => onFormSubmit() } title={register.submit}/>
                <Button onPress={() => Actions.login() } title={content.cancel} />
			</Row>
		</OutterWrapper>
	);
}
