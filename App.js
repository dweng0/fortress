import React from "react";
import { Text } from "react-native";
import OutterWrapper from "./src/components/wrapper";
import Row from "./src/components/row";

export default function App() {
	return (
		<OutterWrapper>
			<Row><Text>Top</Text></Row>
			<Row><Text>BOttom</Text></Row>
		</OutterWrapper>
	);
}
