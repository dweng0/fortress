import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Platform, Image } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import * as AppAuth from 'expo-app-auth';

import ShakingText from 'react-native-shaking-text';
import * as Animatable from "react-native-animatable";
import Label from '../components/label';
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Button from "../components/button";

import { loginContent } from "../international";
import { Actions } from "react-native-router-flux";
import Touchable from "../components/touchable";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default props => {
    const [compatible, setCompatible] = useState(false);
    const [hasPrints, setHasPrints] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scannerButton, setScannerButtonPressed] = useState(false);
    const [authenticating, setAuthenticating] = useState(true);
    const { firebase } = props;

    //handle check
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            Actions.home();
        }
         setAuthenticating(false)
    });

    useEffect(() => {
        console.log('scan button? ', scannerButton)
        if (scannerButton === true) {
            scanBiometrics();
        }
    }, [scannerButton]);

    const deviceCompatible = async () => {
        let enrolled = await LocalAuthentication.isEnrolledAsync();
        let isCompatible = await LocalAuthentication.hasHardwareAsync();
        setHasPrints(isCompatible);
        setCompatible(enrolled);
    }

    const scanBiometrics = async () => {
        console.log('scan biometrics activated...')
        let result = await LocalAuthentication.authenticateAsync('Biometric Scan.');
        if (result.success) {
            setAuthenticated(result.success);
        } else if (result.error && result.error !== 'user_cancel') {
            Alert.alert(
                loginContent.failedToAuthenticateTitle,
                loginContent.fingerPrintErrorAlert,
                [
                    { text: "Yes", onPress: () => scanBiometrics() },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }
                ]
            );
            setErrorMessage(loginContent.fingerPrintError);
        }
        setAuthenticated(result.success);
    };

    useEffect(() => {
        console.log('authenticated', authenticated);
        if (authenticated) {
            Actions.home();
        }
        console.log(`authenticated? ${authenticated}`);
        return () => {
            console.log('clean up')
            setAuthenticated(false);
            setScannerButtonPressed(false);
        }
    }, [authenticated])

    const maybeShowFingerPrintScan = () => {
        if (compatible || hasPrints) {
            return (

                <Button
                    onPress={() => { setScannerButtonPressed(true); }}
                    title={loginContent.useFingerPrint} />
            );
        }
    }

    deviceCompatible();
    const maybeShowLoading = () => {
        if (authenticating) {
            return (<>
            <Row>
                <Label size="large" position="center">Authenticating</Label>
                  <Animatable.View
                    animation="fadeInUp"
                    iterationCount={1}
                    delay={2500}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}
                >
                <Image
                    source={require("../../assets/images/icons/hourglass.png")}
                    style={{ width: 50, height: 50 }}
                />
				</Animatable.View>
            </Row>
            <Row />
            </>)
        }
        else {
            return (
                <>
                    <Row>
                        <View style={styles.container}>
                            <Label position="center">{loginContent.loginOptions}</Label>
                            {(scannerButton) ? <Label> {loginContent.fingerScanPromptMessage}</Label> : null}
                            <ShakingText>
                                {errorMessage}
                            </ShakingText>
                            {maybeShowFingerPrintScan()}
                            <Button onPress={() => {Actions.emailpassword() }} title={loginContent.usePasscode} />
                        </View>
                    </Row>
                    <Row>
                        <Touchable onPress={() => { Actions.register() }} style={styles.container}>
                            <Label position="center">{loginContent.register}</Label>
                        </Touchable>
                    </Row>
                </>
            )
        }

    }

    return (
        <OutterWrapper>
            <Row>
                <Header title={loginContent.title} />
            </Row>
            <Row>
                <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    delay={200}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}
                >
                    <Image
                        source={require("../../assets/images/icons/cardiogram.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </Animatable.View>
            </Row>
            {maybeShowLoading()}

        </OutterWrapper>
    );
}
