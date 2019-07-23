import React from "react";
import { View, Image } from "react-native";
import Touchable from "../touchable";
import * as Animatable from "react-native-animatable";
const Help = ({ title, message, ...props }) => {
	return (
		<View style={{ alignItems: "center", marginTop: 4 }}>
			<Touchable
				onPress={() => {
					console.log('todo help')
				}}
			>
				<Animatable.View
					animation="fadeInUp"
                    iterationCount={1}
                    delay={500}
					style={{
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center"
					}}
				>
					<Image
						source={require("../../../assets/images/icons/help.png")}
						style={{ width: 32, height: 32 }}
					/>
				</Animatable.View>
			</Touchable>
		</View>
	);
};
export default Help;
