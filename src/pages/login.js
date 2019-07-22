import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

import Label from '../components/label';
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Touchable from '../components/touchable'

import { loginContent } from "../international";

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

const commenceScan = async () => {
    let result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
    console.log('Scan Result:', result)
   }

export default function Login() {
    const [compatible, setCompatible] = useState(false);
    const [hasPrints, setHasPrints] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    
    const deviceCompatible = async () => {
        let enrolled = await LocalAuthentication.isEnrolledAsync();
        let isCompatible = await LocalAuthentication.hasHardwareAsync();
        setHasPrints(isCompatible);
        setCompatible(enrolled);
    }
    
    const maybeShowFingerPrintScan = () => {
        
        if (compatible || hasPrints) {            
            return (
               <>
                <Touchable onPress={ async () => {
                    console.log('authenticating');
                    let auth = await LocalAuthentication.authenticateAsync();
                    setAuthenticated(auth.success);
                    }}>
                    <Image source={require('../../assets/images/finger.png')} style={{width: 50, height: 50}}/>
                    </Touchable>                    
                <Label>{ loginContent.useFingerPrint }</Label>
            </>
            );
        }        
    }

    deviceCompatible();
	return (
		<OutterWrapper>
			<Row>
				<Header title={loginContent.title}/>
			</Row>
           <Row/>
           <Row>
                <View style={styles.container}>
                    { maybeShowFingerPrintScan()}
                </View>
            </Row>
            <Row>
                <View style={styles.container}>
                    <Label size='large'>{ loginContent.usePasscode }</Label>
                </View>               
            </Row>
		</OutterWrapper>
	);
}
