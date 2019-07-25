import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Touchable from '../touchable';
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
        backgroundColor:"white"
	},
	navbar: {
		marginTop: 10,
		paddingTop: 20,
		paddingBottom: 4,
		marginLeft: 20,
		marginRight: 20,
		alignItems: "flex-end",
        backgroundColor:"white"
	}
});

const NavBar = props => {
	return (
		<View style={styles.container}>
            <View style={ styles.navbar}>
            <Touchable  onPress={() => {Actions.home();}}>
                <Image source={require('../../../assets/images/icons/115-home.png')} style={{width: 32, height: 32}}/>
            </Touchable>
            </View>

		</View>
	);
};

export default NavBar;
