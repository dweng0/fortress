import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Pinny = ({ value, pinSetIndicator, pinUnsetIndicator,  ...props }) => {
  console.log('here');
  let pin = value || '';

  if (!props.pinLength) {
    throw new Error('Pin lengh is required');
  }

  if (pin.split("").length > props.pinLength) {
     pin = pin.slice(0, props.pinLength);
  }

  /**
   *  Use user defined input (can be another react element)
   */
  const pinSet = () => {
    return <Text>•</Text>;
  };
  const pinUnset = () => {
    return <Text>_</Text>;
  };
  const divider = `(100% / ${props.pinLength})`;

  /**
   * renders the set/unset elements
   */
  const unSetPinView = () => {
    return <Text>_</Text>;
  };

  const setPinView = pinNumber => {
    console.log(`hiding ${pinNumber}`);
    return <Text>•</Text>
  };

  /**
   * Loops through the pin, and renders each individual pin as set or unset based on the value provided versus      * the pin length specified
   */
  const getPins = () => {
    const pinAsArray = pin.split('');
    let content = [];
    let styling = sheet.numberBox;

    styling.width = `calc${divider}`;

    for (let i = 0; i < props.pinLength; i++) {
      const nPin = pinAsArray[i] || null;
      content.push(
        <View style={styling} key={i}>
          {nPin ? setPinView(nPin) : unSetPinView()}
        </View>
      );
    }
    return content;
  };

  return <View style={sheet.row}>{getPins()}</View>;
};

const sheet = StyleSheet.create({
  row: {
    flex: 1,
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBox: {
    fontSize: 24,
    paddingTop: '8.5%',
    height: '100%',
    width: '25%',
    textAlign: 'center',
  },
});
export default Pinny;
