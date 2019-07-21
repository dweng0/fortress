import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Label from '../components/label';
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";

import { loginContent } from "../international";

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export default function Login() {

	return (
		<OutterWrapper>
			<Row>
				<Header title={loginContent.title}/>
			</Row>
            <Row>
                <View style={styles.container}>
                    <Image source={require('../../assets/images/finger.png')} style={{width: 50, height: 50}}/>
                    <Label>{ loginContent.useFingerPrint }</Label>
                </View>
            </Row>
            <Row>
                <Label>{ loginContent.usePasscode }</Label>
            </Row>
		</OutterWrapper>
	);
}
