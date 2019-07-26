import React from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';

const getRandomDoctor = () => {
    let doctors = ['Beefer', 'Martin-Smith', 'Picard', 'Spock', 'StarLord', 'Stark', 'Connor', 'May', 'Cameron'];
    return doctors[Math.floor(Math.random() * doctors.length)];
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const generateBookingSlots = (numberOfSlots) => {
    let availableSlots = [];

    for (var i = 0; i < numberOfSlots; i++) {
        availableSlots.push({
            doctor: getRandomDoctor(),
            date: moment(randomDate(new Date(2020, 12, 25), new Date())).toISOString()
        })
    }

    return availableSlots;
}

generateBookingSlots(23)

const CLOSED = {key:'Closed', color: 'grey', selectedDotColor: 'grey'};
const FULLYBOOKED = {key:'full', color: 'red', selectedDotColor: 'blue'};


const AppointmentMaker = ({ maxDates, markedDates, ...props}) => {
    const unavailableDates = markedDates || {};
    const maximum = maxDates;
	return (
		<CalendarList
            pastScrollRange={0}
            horizontal={true}
            pagingEnabled={true}
            futureScrollRange={4}
            calendarWidth={320}
            style={{
                marginLeft: 20,
                marginRight: 20,
                overflow: 'hidden'
            }}

            markedDates={unavailableDates}
			// Initially visible month. Default = Date()
			current={Date()}
			// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			minDate={Date()}
			// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
			maxDate={maximum}
			// Handler which gets executed on day press. Default = undefined
			onDayPress={day => {
				console.log("selected day", day);
			}}
			// Handler which gets executed on day long press. Default = undefined
			onDayLongPress={day => {
				console.log("selected day", day);
			}}
			// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
			monthFormat={"MMM yyyy"}
			// Handler which gets executed when visible month changes in calendar. Default = undefined
			onMonthChange={month => {
				console.log("month changed", month);
			}}

			// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
			firstDay={1}

			// Show week numbers to the left. Default = false
			showWeekNumbers={true}

			// Handler which gets executed when press arrow icon left. It receive a callback can go back month
			onPressArrowLeft={substractMonth => substractMonth()}

			// Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            showScrollIndicator={true}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: 'black',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: 'black',
                todayTextColor: 'black',
                dayTextColor: 'black',
                textDisabledColor: 'black',
                dotColor: 'black',
                selectedDotColor: 'black',
                arrowColor: 'black',
                monthTextColor: 'black',
                indicatorColor: 'black',
                textDayFontFamily: 'poppins',
                textMonthFontFamily: 'poppins',
                textDayHeaderFontFamily: 'poppins',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12
            }}
		/>
	);
};
export default AppointmentMaker;