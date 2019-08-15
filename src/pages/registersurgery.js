import React, { useState } from "react";
import { Image, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

import * as Animatable from "react-native-animatable";
import _ from "underscore";

import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Label from "../components/label";
import Button from "../components/button";
import { Actions } from "react-native-router-flux";

import { register } from "../international";

const content = {
    missingRegisterCode: "Please enter a registration code",
    registrationComplete: "Your registration was succesfull! You can start using the app straightaway",
    checking: "content.checking registration code",
    registrationCodePlaceholder: "Activation code",
    details: "Your surgery will have given you an activation code, enter this now",
    name: "Surgery Name"
}

export default props => {
	const [registerCode, setRegisterCode] = useState("");
    const [surgeryName, setSurgeryName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [lastName, setLastName] = useState("");
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

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
			SecureStore.setItemAsync("patient_token_identifier", response.identifier)
				.then(() => {
					setMessage(content.registrationComplete);
				})
				.catch(e => setError(e.message));
		} else if (errors.length > 0) {
			setMessage(
				errors.reduce((p, c) => {
					return p + " " + c;
				}, "")
			);
		} else if (loading) {
			setMessage(content.checking);
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
                 <Label size="small" position="center">
					{content.details}
				</Label>
			</Row>
			<Row>
                <Label size="medium" position="center">
                    {content.name}
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
					onChangeText={text => setSurgeryName({ text })}
					value={registerCode}
				/>
                <Label size="medium" position="center">
					{content.registrationCodePlaceholder}
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
					onChangeText={text => setRegisterCode({ text })}
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
			</Row>
		</OutterWrapper>
	);
}
