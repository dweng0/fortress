import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    button: {
        marginTop:10,
        paddingTop:7,
        paddingBottom:7,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#fff',
        borderRadius:15,
        borderWidth: 4,
        borderColor: '#000',
        alignItems: 'center',
    },
    font: {
        fontFamily: 'poppins',
        fontSize: 32
    }
  })
  
export const ButtonWrapper = (props) => {
  //  console.assert(onPress, 'No on press event provided. This button wont do anything...');
    return(
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.button } {...props}>
                {props.children}
            </TouchableOpacity>
        </View>
    );
}

/**
 * todo navigation
 * @param {*} param0 
 */
const Button = ({ title, ...props }) => {
    return <ButtonWrapper {...props}><Text style={styles.font}>{title}</Text></ButtonWrapper>
}

export default Button;