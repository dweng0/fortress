import React, { useState } from "react";
import { Image, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Label from '../components/label';
import Button from "../components/button";
import { Actions } from "react-native-router-flux";
import { register } from "../international";

export default function Home() {
    const [registerCode, setRegisterCode] = useState('');
	return (
		<OutterWrapper>
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
						source={require("../../assets/images/icons/005-pencil.png")}
						style={{ width: 100, height: 100 }}
					/>
				</Animatable.View>
                 <Label size="small" position="center">{register.smallDescription}</Label>
                 <TextInput
                style={
                 {
                    marginTop:10,
                   padding:19,
                    marginLeft:20,
                    marginRight:20,
                    minWidth: 300,
                    backgroundColor:'#fff',
                    borderRadius:7,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                 }
                }
                onChangeText={(text) => setRegisterCode({text})}
                value={registerCode}
            />
			</Row>
			<Row/>
			<Row>
				<Button
					onPress={() => {
						Actions.bookingType();
					}}
					title={register.submit}
				/>
			</Row>
		</OutterWrapper>
	);
}
