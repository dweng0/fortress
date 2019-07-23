import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

const appointmentsMock = [
    {
        doctor: 'Patel',
        date:  moment().add(getRandomInt(5), 'day')
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
const ListContainer = ({data, ...props}) => {
    return (
        <SwipeListView
            data={data}
            renderItem={ () => renderItem(data) }
            renderHiddenItem={ () => renderHiddenItem(data) }
            rightOpenValue={-75}
        />
    )
}