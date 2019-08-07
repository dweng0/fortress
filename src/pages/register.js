import React, { useState } from 'react';

import RegisterForm from '../components/emailandpassword';
import Row from '../components/row';

import service from '../service';

const content = {
    missing: 'please fill in the required fields',
    submit: 'next'
}
export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [hasErrors, setHasErrors] = useState(false);
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
                    { (message) ? message : '' };
                </Label>
                <Button onPress={() => submitRegistration } title={content.next} />
            </Row>
		</OutterWrapper>
	);
};
//set button disabled based on if form has errors
