import React from "react";
import { Image } from "react-native";
import * as Animatable from "react-native-animatable";
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Button from "../components/button";
import { Actions } from "react-native-router-flux";
import { homeContent } from "../international";

export default function Home() {
	return (
		<OutterWrapper>
			<Row>
				<Header title="Village Surgery" description="something something" />
			</Row>
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
						source={require("../../assets/images/icons/206-first-aid-kit.png")}
						style={{ width: 100, height: 100 }}
					/>
				</Animatable.View>
			</Row>
			<Row />
			<Row>
				<Button
					onPress={() => {
						Actions.bookingType();
					}}
					title={homeContent.bookAppointment}
				/>
				<Button onPress={
                    () => {
                        Actions.schedule();
                    }
                } title={homeContent.showBookings} />
			</Row>
		</OutterWrapper>
	);
}
