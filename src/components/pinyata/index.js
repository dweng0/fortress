import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Pinny = ({ value, pinSetIndicator, pinUnsetIndicator,  ...props }) => {
  let pin = value || '';
  if (!props.pinLength) {
    throw new Error('Pin lengh is required');
  }
  
  if (pin.split("").length > props.pinLength) {
    pin = pin.slice(0, props.pinLength);
  }

  /**
   * renders the set/unset elements
   */
  const unSetPinView = () => {
    return <Text style={sheet.textStyles} >_</Text>;
  };

  const setPinView = pinNumber => {
    return <Text style={sheet.textStyles}>•</Text>
  };

  /**
   * Loops through the pin, and renders each individual pin as set or unset based on the value provided versus      * the pin length specified
   */
  const getPins = () => {
    const pinAsArray = pin.split('');
    const boxStyling = sheet.numberBox;
    const percentageWidth = 100 / props.pinLength;
    let content = [];    
    let styling = { ...{width: `${percentageWidth}%`}, ...boxStyling}
    styling.width = `${percentageWidth}%`;

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
  textStyles: {
      fontSize:24
  },
  numberBox: {
    paddingTop: '8.5%',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },
});
export default Pinny;
