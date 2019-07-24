import React, { useState } from "react";
import { Image } from "react-native";
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Button from "../components/button";
import * as Animatable from "react-native-animatable";
import List from '../components/list';
import { Actions } from "react-native-router-flux";

export default function Type() {
    const [queryStatus, setQueryStatus] = useState('searching'); //found
	return (
		<OutterWrapper>
			<Row>
				<Header
					title="Schedule"
					description="Your next appointments"
				/>
			</Row>
			<Row>
				<Animatable.View
					animation="fadeInDown"
					iterationCount={1}
					style={{
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center"
					}}
				>
					<Image
						source={require("../../assets/images/icons/184-clipboard.png")}
						style={{ width: 100, height: 100 }}
					/>
				</Animatable.View>
			</Row>
            <Row>
                    <List/>
            </Row>
			<Row>
				<Button
					onPress={() => {
						Actions.home();
					}}
					title="Cancel"
				/>
			</Row>
		</OutterWrapper>
	);
}