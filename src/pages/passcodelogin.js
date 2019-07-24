import React, { useState } from 'react';

import Paddle from '../components/paddle';
import Pinyata from '../components/pinyata';
import OutterWrapper from '../components/wrapper';
import Row from '../components/row';
import Header from '../components/header';

import { passcodeLogin } from '../international';


const passcodeContent = passcodeLogin;
const PassCode = props => {
    const [pin, setPin] = useState('');

    const updatePin = pinValue => {
        if(pinValue.length && isNaN(pinValue) || pinValue.length > 6) return;
        setPin(pinValue)
    }

    return (
        <OutterWrapper>
        <Row>
            <Header title={'passcode'}/>          
        </Row>
        <Pinyata value={pin} pinLength={6}/>
        <Paddle style={{height:'100%', width: '100%'}} value={pin} onChangeText={(val) => {updatePin(val);}} onSubmitEditing={(v) => {console.log('woooo submit',v)}} />     
        <Row/>
    </OutterWrapper>      
    );
}
export default PassCode;