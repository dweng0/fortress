import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Platform } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import ShakingText from 'react-native-shaking-text';

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

export default function Login() {
    const [compatible, setCompatible] = useState(false);
    const [hasPrints, setHasPrints] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [scannerButton, setScannerButtonPressed] = useState(false);
    
    const deviceCompatible = async () => {
        let enrolled = await LocalAuthentication.isEnrolledAsync();
        let isCompatible = await LocalAuthentication.hasHardwareAsync();
        setHasPrints(isCompatible);
        setCompatible(enrolled);
	}

	const showAndroidAlert = () => {
		Alert.alert(
			loginContent.fingerScanPromptTitle,
			 loginContent.fingerScanPromptMessage,
		  [
			{ text: "OK", onPress: () => {} }
		  ]
		);
		scanBiometrics();
	};
 
	
	const checkForBiometrics = async () => {
		let biometricRecords = await LocalAuthentication.isEnrolledAsync(); 
		if (!biometricRecords) {
		 console.log('no metrics')
		} else {
		  handleLoginPress();
		}
	  };
	  	  
	const handleLoginPress = () => {
		if (Platform.OS === 'android') {
		  showAndroidAlert();
		} else {
		  scanBiometrics();
		}
	  };
	
	
	const scanBiometrics = async () => {
		let result = await LocalAuthentication.authenticateAsync('Biometric Scan.');
		console.log(result);
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
		if (authenticated) 
		{
			Actions.home();
		}
		console.log(`authenticated? ${authenticated}`);
	}, [authenticated])
    
    const maybeShowFingerPrintScan = () => {        
        if (compatible || hasPrints) {
            return (
                
                <Button
                onPress={() => { setScannerButtonPressed(true); checkForBiometrics();}}
                title={loginContent.useFingerPrint}/>
            );
        }        
    }
	deviceCompatible();
	return (
		<OutterWrapper>
			<Row>
				<Header title={loginContent.title}/>
			</Row>
          
           <Row>
                <View style={styles.container}>                   
                    { maybeShowFingerPrintScan()}
                </View>
            </Row>
			<Row>
                <View style={styles.container}>
                    {(scannerButton) ? <Label> { loginContent.fingerScanPromptMessage }</Label> : null}
					<ShakingText>
						{errorMessage }
					</ShakingText>
                </View>          
            </Row>
            <Row>
                <Touchable onPress={() => { Actions.passcodeLogin() }} style={styles.container}>
                    <Label position="center">{ loginContent.usePasscode }</Label>
                </Touchable>           
            </Row>
		</OutterWrapper>
	);
}
