import React from 'react';
import { Text } from 'react-native';

const fontSizes = {
    small: 14,
    medium: 24,
    large: 32,
    huge: 46
};
let styles = {
    fontFamily: "poppins",
    fontSize: fontSizes.medium
}
const Label = ({ size, position, style, ...props }) => {
    styles = {...styles, ... props}

    if (size && fontSizes[size]) {
        styles.fontSize = fontSizes[size];
    }

    if (position) {
        styles.textAlign = position;
    }

    return <Text styles={styles}>{props.children}</Text>
}

export default Label;