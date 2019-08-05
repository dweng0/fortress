import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Touchable from '../touchable';
import Label from '../label';
import moment from "moment";
const getRandomInt = max => {
	return Math.floor(Math.random() * Math.floor(max));
};


const styles = StyleSheet.create({
    row: {
        marginTop:10,
        paddingTop:7,
        paddingBottom:7,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#fff',
        borderBottomWidth: 1,
        borderColor: '#000'
    }
  })


const appointmentsMock = [
	{
        id: 1,
		doctor: "Picard",
		date: moment()
			.add(getRandomInt(5), "day")
			.toISOString()
    },
    {
        id: 2,
		doctor: "Spock",
		date: moment()
			.add(getRandomInt(12), "day")
			.toISOString()
    },
    {
        id: 3,
		doctor: "Creed",
		date: moment()
			.add(getRandomInt(50), "day")
			.toISOString()
    },
    {
		doctor: "Uthred",
		date: moment()
			.add(getRandomInt(12), "day")
			.toISOString()
    },
    {
		doctor: "Egbert",
		date: moment()
			.add(getRandomInt(50), "day")
			.toISOString()
	}
];
const renderItem = ({onPress, item, ...props}) => {

	return (
		<Touchable onPress={() => onPress(item.id)} >
            <View  style={styles.row}>
                <Label size="mediumSmall" >
                    Dr. {item.doctor}
                </Label>
                <Label size="small">
                    {moment(item.date).calendar()}
                </Label>
            </View>
		</Touchable>
	);
};

const ListContainer = ({ data, ...props }) => {
    let list = appointmentsMock.map((dataItem, index) => { dataItem.key = `${index}`; return dataItem});
	return (
        <FlatList data={list.slice(0, 3)} renderItem={(item) => renderItem(item)}/>
	);
};
export default ListContainer;
