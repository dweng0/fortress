import React from 'react';
import styled from 'styled-components';

const Row = styled.View`
    border: 1px solid black;
    width: 100%;
    flexGrow: 1;
`;


const OutterWrapper = props => {
    let styles = {
        alignSelf: 'auto'
    }

    if(props.bottom)
    {
        styles.alignSelf = 'flexEnd'
    }
    return<Row styles={styles}>{ props.children }</Row>
}

export default OutterWrapper;