import React from 'react';
import { View, Image } from 'react-native';
import OutterWrapper from '../components/wrapper';
import Header from '../components/header';
import Row from '../components/row';
import Button from '../components/button';

import { Actions } from 'react-native-router-flux';
import { homeContent } from '../international';

export default function Home() {
	return (
		<OutterWrapper>
			<Row>
				<Header
					title="Village Surgery"
					description="something something"
				/>
			</Row>
			<Row>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			   <Image source={require('../../assets/images/icons/finger.png')} style={{width: 50, height: 50}}/>
			</View>
			</Row>
			<Row />
			<Row>
				<Button
					onPress={() => {
						console.log('test');
						Actions.bookingType();
					}}
					title={homeContent.bookAppointment}
				/>
				<Button title={homeContent.showBookings} />
			</Row>
		</OutterWrapper>
	);
}
