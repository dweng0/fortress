//https://firebase.google.com/docs/auth/web/password-auth
import React, { useState, useEffect } from "react";
import { Image, TextInput } from "react-native";

import * as SecureStore from "expo-secure-store";
import { Actions } from "react-native-router-flux";
import * as Animatable from "react-native-animatable";
import _ from "underscore";

import OutterWrapper from "../components/wrapper";
import Row from "../components/row";
import Label from "../components/label";
import Button from "../components/button";

import service from '../service';

import { register } from "../international";

const missingRegisterCode = "Please enter a registration code";
const registrationComplete = "Your registration was succesfull! You can start using the app straightaway";
const checking = "Checking registration code";
const registrationCodePlaceholder = "Activation code";
const birthDatePlaceHolder = "MM/DD/YYYY";
const ukPostcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
const ukDateRegex = /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20\d\d)/

export default function Register() {
    const [registerCode, setRegisterCode] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [postcode, setPostcode] = useState("");
    const [registryToken, setRegistryToken] = useState(null);

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    onFormSubmit = () => {
        if (_.isEmpty(registerCode)) {
            errors.push(missingRegisterCode);
        }

        const { response, error, isLoading } = useFetch("/register", {
            method: "POST",
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
                .then(() => {
                    setMessage(registrationComplete);
                })
                .catch(e => setError(e.message));
        } else if (errors.length > 0) {
            setMessage(
                errors.reduce((p, c) => {
                    return p + " " + c;
                }, "")
            );
        } else if (loading) {
            setMessage(checking);
        }
    };

    useEffect(() => {
        console.log('change on', registerCode, dateOfBirth, postcode);

        let errors = [];
        if (!registerCode) {
            errors.push(register.errorRegistrationCodeMissing);
        }
        if (!dateOfBirth) {
            errors.push(register.errorDateOfBirthMissing);
        }
        else if (!RegExp(ukDateRegex).test(dateOfBirth)) {
            errors.push(register.errorDateOfBirthIncorrect);
        }


        if (!postcode) {
            errors.push(register.errorPostcodeMissing);
        } else if (!RegExp(ukPostcodeRegex).test(postcode)) {
            errors.push(register.errorPostcodeIncorrect)
        }

        console.log('any errors? ', errors.length );
        if(_.isEmpty(errors)) {
           const surgeries =  service.collections.get('surgeries');
           console.log('found the following surgeries', surgeries);

           let practice;
           let token;
           surgeries.forEach(surgery => {
                token = surgeries.tokens.find(c => { return (c.registryToken === registerToken && c.postcode === postcode && c.dateOfBirth === dateOfBirth)});

                if (token) {
                    practice = surgery;
                }
           });

           //if we have a surgery, then we need to register the user


        } else {
            setErrors(errors.reduce((p, c) => { return p + c }, ''));
        }
    }, [registerCode, dateOfBirth, postcode]);

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
            </Row>
            <Row>
                <Label size="medium" position="center">
                    {registrationCodePlaceholder}
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
                <Label size="medium" position="center">
                    {register.postCode}
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
                    onChangeText={text => setPostcode({ text })}
                    value={postcode}
                    placeholder={}
                />
                 <Label size="medium" position="center">
                    {register.birthDate}
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
                    onChangeText={text => setDateOfBirth({ text })}
                    value={dateOfBirth}
                    placeholder={birthDatePlaceHolder}
                />
            </Row>
            <Row />
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
