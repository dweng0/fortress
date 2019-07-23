import React from 'react';
import { Text } from 'react-native';

const fontSizes = {
    small: 14,
    mediumSmall: 18,
    medium: 24,
    large: 32,
    huge: 46
};
const Label = ({ size, position, style, color, ...props }) => {

	let styles = style || {};
	styles.fontFamily = "poppins";
    if (size && fontSizes[size]) {
        styles.fontSize = fontSizes[size];
    }

    if (position) {
        styles.textAlign = position;
	}

	if(color) {
		styles.color = 'red'
	}
	
    return <Text style={styles}>{props.children}</Text>
}

export default Label;