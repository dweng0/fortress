import React from 'react';
import { View, Image } from 'react-native';

const CenteredIcon = props => {
	
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Image {...props}
			/>
		</View>
	);
};

export default CenteredIcon;
