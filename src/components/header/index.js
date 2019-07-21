import React from "react";
import { View, Text, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    items: {
        alignItems: 'center',
    },
    font: {
        fontFamily: 'poppins',
        fontSize: 32
    },
    description: {
        fontFamily: 'poppins',
        fontSize: 24
    }
  })
  

const Header = ({title, description}) => {
    return ( 
        <View style={styles.container}>
            <View style={ styles.items }>
                <Text style={ styles.font}>{title}</Text>
                <Text style={ styles.description}>{ description }</Text>
            </View>
        </View>
    )
}

export default Header;