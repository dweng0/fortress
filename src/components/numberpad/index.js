import React, { useState } from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: 'white'
    },
    textInputNormalStyle: {
        backgroundColor: 'white'
    }
  })

const NumPad = props => {
    const [cursorPosition, setCursorPosition] = useState(0);
    return (
        <TextInput
            style={cursorPosition > 0 ? styles.textInputStyle : styles.textInputNormalStyle}
            keyboardType={Platform.OS === `android` ? "numeric" : "number-pad"}
            maxLength={1}
            autoCorrect={false}
            onKeyPress={(event) => {console.log('use the event key here to update curor position?', event.nativeEvent.key); }}
        />
    )    
}

export default NumPad;