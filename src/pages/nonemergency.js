import React, { useState } from "react";
import { View, Image } from "react-native";
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Button from "../components/button";
import Calendar from '../components/calendar';
import { Actions } from "react-native-router-flux";

export default function Type() {
    const [queryStatus, setQueryStatus] = useState('searching'); //found
	return (
		<OutterWrapper>
			<Row>
				<Header
					title="Appointments"
					description="Pick from available slots"
				/>
			</Row>
            <Row>
                <Calendar/>
            </Row>
			<Row>				
                <Button onPress={() => {
						console.log('non emergency booking selected')
					}}
					title="Book"/>
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
