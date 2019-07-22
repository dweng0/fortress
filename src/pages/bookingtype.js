import React from 'react';
import { View, Image } from 'react-native';
import OutterWrapper from '../components/wrapper';
import Header from '../components/header';
import Row from '../components/row';
import Button from '../components/button';
import CenteredIcon from '../components/centeredimage';

import { bookingTypeContent } from '../international';

export default function Type() {
	return (
		<OutterWrapper>
			<Row>
				<Header title="Booking" description="Schedule a new booking" />
			</Row>
			<Row>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Image source={require('../../assets/images/icons/fortressassets.png')} style={{width: 100, height:100}}} />
			</View>
			</Row>
			<Row>
				<Button title={bookingTypeContent.emergency} />
				<Button title={bookingTypeContent.scheduled} />
			</Row>
		</OutterWrapper>
	);
}
