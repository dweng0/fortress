import React, { useState } from 'react';
import _ from 'underscore';

import Label from '../label';

export default props => {
    let message = null;
    if (!_.isEmpty(props.messageArray)) {
           message = props.messageArray.reduce((p, c) => {
					return p + ' \r\n' + c;
				}, '');
    }
    return (message) ? <Label>{ message } </Label> : null
}