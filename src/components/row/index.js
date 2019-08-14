import React from 'react';
import styled from 'styled-components';

const RowStyle = styled.View`
    width: 100%;
    flexGrow: 1;
`;


const Row = props => {
    let styles = {
        alignSelf: 'auto'
    }

    if(props.bottom)
    {
        styles.alignSelf = 'flexEnd'
    }
    return<RowStyle styles={styles}>{ props.children }</RowStyle>
}

export default Row;