import React, { useState } from 'react';

import Paddle from '../components/paddle';
import Pinyata from '../components/pinyata';
import OutterWrapper from '../components/wrapper';
import Row from '../components/row';
import Header from '../components/header';
import { Actions } from 'react-native-router-flux';

const MAX_PIN_LENGTH = 6;
const PassCode = props => {
    const [pin, setPin] = useState('');

    const updatePin = pinValue => {
        
        if(pinValue.length && isNaN(pinValue) || pinValue.length > MAX_PIN_LENGTH) return;
        setPin(pinValue)
    }
    
    return (
        <OutterWrapper>
        <Row>
            <Header title={'passcode'}/>          
        </Row>
        <Pinyata value={pin} pinLength={MAX_PIN_LENGTH}/>
        <Paddle style={{height:'100%', width: '100%'}} maxLength={MAX_PIN_LENGTH} submitOnMaxLength={true} value={pin} onChangeText={(val) => {updatePin(val);}} onSubmitEditing={(v) => {console.log('todo submit'); Actions.home()}} />     
        <Row/>
    </OutterWrapper>      
    );
}
export default PassCode;