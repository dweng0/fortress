import React, { useState } from 'react';
import { Actions } from "react-native-router-flux";
import OutterWrapper from '../components/wrapper';
import RegisterForm from '../components/emailandpassword';
import Row from '../components/row';
import Label from '../components/label';
import Button from '../components/button';

import service from '../service';
import { useDocument }  from '../hooks'


const content = {
    missing: 'please fill in the required fields',
    submit: 'next'
}
export default props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [hasErrors, setHasErrors] = useState(false);

    const { database } = props;

    console.log(database)    ;

	const submitRegistration = () => {
		if (email && password) {
            service.auth().createUserWithEmailAndPassword(email, password)
            .then(
                console.log('todo move to next page')
            )
            .catch(e => {
                setMessage(e.message);
            })
		} else {
            setMessage(content.missing);
		}
    };
	return (
		<OutterWrapper>
			<RegisterForm
				confirmPassword={true}
				email={mail => {
					setEmail(mail);
				}}
				password={pass => {
					setPassword(pass);
                }}
                errors={err => setHasErrors(!!(err))}
			/>
            <Row>
                <Label size="small" color="tomato" position="center">
                    { (message) ? message : '' }
                </Label>
                <Button onPress={() => submitRegistration } title={content.submit} />
            </Row>
		</OutterWrapper>
	);
};
//set button disabled based on if form has errors
