import React from 'react';

import Label from '../components/label';
import NumPad from '../components/numberpad';
import OutterWrapper from '../components/wrapper';
import Row from '../components/row';
import Header from '../components/header';

import { passcodeLogin } from '../international';


const passcodeContent = passcodeLogin;
const PassCode = props => {
    return (
        <OutterWrapper>
        <Row>
            <Header title={'passcode'}/>
        </Row>      
       <Row>
           <Label>
               Show passcode circles here
           </Label>
        </Row>
        <Row>
          <NumPad />         
        </Row>
        <Row/>
    </OutterWrapper>      
    );
}
export default PassCode;