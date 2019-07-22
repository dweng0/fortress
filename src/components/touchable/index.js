import React from 'react';
import { TouchableOpacity} from 'react-native';

export const Touchable = ({onPress, ...props}) => {
    console.assert(onPress, 'No on press event provided. This button wont do anything...');
    return(
        <TouchableOpacity onPress={(e) => onPress(e)}>
            {props.children}
        </TouchableOpacity>
    );
}

export default Touchable;