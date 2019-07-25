import React from 'react';
import { View, Image } from 'react-native';
import OutterWrapper from '../components/wrapper';
import { Actions } from 'react-native-router-flux';

import { bookingTypeContent } from '../international';

import Header from '../components/header';
import Row from '../components/row';
import Button from '../components/button';
import Label from '../components/label';
import Help from '../components/help';

export default function Type() {
	return (
		<OutterWrapper>
			<Row>
				<Header title="Booking" description="Book a GP appointment" />
			</Row>
			<Row>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <   Image source={require('../../assets/images/icons/206-first-aid-kit.png')} style={{width: 100, height:100}} />
			    </View>
			</Row>            
			<Row>
				<View style={{alignItems: 'center'}}>
					<Label>Booking type</Label>
				</View>
				<Button onPress={() => {Actions.emergency() }} title={bookingTypeContent.emergency} />
				<Button onPress={() => {Actions.nonemergency()}} title={bookingTypeContent.scheduled} />
			</Row>
		</OutterWrapper>
	);
}
