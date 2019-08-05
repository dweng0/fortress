import React, { useState } from "react";
import { Image, TextInput } from "react-native";
import * as SecureStore from 'expo-secure-store';

import * as Animatable from "react-native-animatable";
import _ from 'underscore';

import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Label from '../components/label';
import Button from "../components/button";
import { Actions } from "react-native-router-flux";

import useFetch from '../hooks';

import { register } from "../international";

const missingRegisterCode = "Please enter a registration code";
const registrationComplete = "Your registration was succesfull! You can start using the app straightaway";
const checking = "Checking registration code";

export default function Register() {
    const [registerCode, setRegisterCode] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messsage, setMessage] = useState('')

    onFormSubmit = () => {
        if (_.isEmpty(registerCode)) {
            errors.push(missingRegisterCode);
        }

        const { response, error, isLoading } = useFetch('/register', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `registartionId=${registerCode}`
        });

        if (error) {
            setErrors.push(error);
        }

        setLoading(isLoading);

        if (response) {
            //user sends registration code to server,
            //server has a registration code that maps to a specific user, checks the code, generates a unique identifier token and provides this back to the app
            //the app leverages secure store to store this for the application. This can then be used to authorise user specific requests, such as making bookings.
            SecureStore.setItemAsync("patient_token_identifier", response.identifier)
            .then(() => { setMessage(registrationComplete); })
            .catch(e => setError(e.message))

        }
        else if (errors.length > 0) {
            setMessage(errors.reduce( (p, c) => { return p + ' ' + c; }, ''))
        } else if(loading) {
            setMessage(checking);
        }
    };

	return (
		<OutterWrapper>
			<Row>
				<Animatable.View
					animation="fadeInDown"
                    iterationCount={1}
                    delay={200}
					style={{
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center"
					}}
				>
					<Image
						source={require("../../assets/images/icons/005-pencil.png")}
						style={{ width: 100, height: 100 }}
					/>
				</Animatable.View>
                 <Label size="small" position="center">{register.smallDescription}</Label>
                 <TextInput
                    style={
                    {
                        marginTop:10,
                    padding:19,
                        marginLeft:20,
                        marginRight:20,
                        minWidth: 300,
                        backgroundColor:'#fff',
                        borderRadius:7,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                    }
                    }
                    onChangeText={(text) => setRegisterCode({text})}
                    value={registerCode}
            />
			</Row>
			<Row> <Label size="small" position="center">{message}</Label></Row>
			<Row>
				<Button
					onPress={() => {
						Actions.bookingType();
					}}
					title={register.submit}
				/>
			</Row>
		</OutterWrapper>
	);
}
