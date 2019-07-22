import React from 'react';
import { View, Image } from 'react-native';
import OutterWrapper from '../components/wrapper';
import Header from '../components/header';
import Row from '../components/row';
import Button from '../components/button';
import * as Animatable from 'react-native-animatable';
import Label from '../components/label';

export default function Type() {
	return (
		<OutterWrapper>
			<Row>
				<Header title="Booking" description="Book a GP appointment" />
			</Row>
			<Row>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
			<Image source={require('../../assets/images/icons/heart.png')} style={{width: 100, height:100}} />
			</Animatable.Text>
			
			</View>
			</Row>
			<Row>
				<View style={{alignItems: 'center'}}>
					<Label>Searching for next available appointment...</Label>
				</View>
				<Button title="Cancel" />
			</Row>
		</OutterWrapper>
	);
}
