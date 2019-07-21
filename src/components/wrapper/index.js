import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
	flex: 1;
	background-color: white ;
	justify-content: space-evenly;
    align-items: center;
    padding-top: 25px;
`;


const OutterWrapper = props => {
    return<Container>{props.children}</Container>
}

export default OutterWrapper;