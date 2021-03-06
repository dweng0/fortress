import React, { useState } from "react";
import { View, Image } from "react-native";
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Button from "../components/button";
import * as Animatable from "react-native-animatable";
import Label from "../components/label";
import { Actions } from "react-native-router-flux";
import useFetch from '../hooks';

export default function Type() {
    const [queryStatus, setQueryStatus] = useState('searching'); //found
    const { response, error, isLoading } = useFetch('/surgeries/dbbec180a7f3a63c978d9ee0f31212fd');

    if(response) {
        console.log(response);
    }
	return (
		<OutterWrapper>
			<Row><Header title="Appointments" description="Finding closest booking" /></Row>
			<Row>
				<Animatable.View
					animation="pulse"
					iterationCount="infinite"
					style={{
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center"
					}}
				>
					<Image
						source={require("../../assets/images/icons/heart.png")}
						style={{ width: 100, height: 100 }}
					/>
				</Animatable.View>
			</Row>
			<Row>
				<View style={{ alignItems: "center" }}>
					<Label size="large">Searching...</Label>
				</View>
				<Button
					onPress={() => {
						Actions.bookingType();
					}}
					title="Cancel"
				/>

			</Row>
		</OutterWrapper>
	);
}
