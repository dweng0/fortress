import React from 'react';
import { Text } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import moment from 'moment';
const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

const appointmentsMock = [
    {
        doctor: 'Patel',
        date:  moment().add(getRandomInt(5), 'day').toISOString()
    }
]
const renderItem = data => {return(
    <TouchableHighlight onPress={console.log('todo')}>
        <View>
            <Text>Appointment with DR. ${data.doctor} ${moment(data.date).calendar() }; </Text>
        </View>
    </TouchableHighlight>
)};
const renderHiddenItem = (data, secId, rowId, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Text style={styles.backTextWhite}>Right</Text>
      </View>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  )

  const dataSource = [
    {
        name: 'Andy',
        age: 12,
        disableRightSwipe: true,
    },
    {
        name: 'Betty',
        age: 11,
        leftOpenValue: 150,
    },
    {
        name: 'Carl',
        age: 11,
    },
];
const ListContainer = ({data, ...props}) => {
    return (
<>
<Text>{dataSource[0].name}</Text>
<SwipeListView
    dataSource={dataSource}
    renderItem={ (rowData, rowMap) => (
        <SwipeRow
            disableRightSwipe={parseInt(rowId) % 2 !== 0}
            disableLeftSwipe={parseInt(rowId) % 2 === 0}
            leftOpenValue={20 + parseInt(rowId) * 5}
            rightOpenValue={-150}
        >
            {console.log('test')}
            <View style={styles.rowBack}>
                <Text>Left Hidden</Text>
                <Text>Right Hidden</Text>
            </View>
            <View style={styles.rowFront}>
                <Text>{data.item.name} | {data.item.key}</Text>
            </View>
        </SwipeRow>
    )}
/>
</>


    )
}
export default ListContainer