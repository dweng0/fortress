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

const AppointmentMaker = props => {
	return (
		<Calendar
			// Initially visible month. Default = Date()
			current={"2012-03-01"}
			// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			minDate={"2012-05-10"}
			// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
			maxDate={"2012-05-30"}
			// Handler which gets executed on day press. Default = undefined
			onDayPress={day => {
				console.log("selected day", day);
			}}
			// Handler which gets executed on day long press. Default = undefined
			onDayLongPress={day => {
				console.log("selected day", day);
			}}
			// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
			monthFormat={"yyyy MM"}
			// Handler which gets executed when visible month changes in calendar. Default = undefined
			onMonthChange={month => {
				console.log("month changed", month);
			}}
			// Hide month navigation arrows. Default = false
			hideArrows={true}
			// Replace default arrows with custom ones (direction can be 'left' or 'right')
			renderArrow={direction => <Arrow />}
			// Do not show days of other months in month page. Default = false
			hideExtraDays={true}
			// If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
			// day from another month that is visible in calendar page. Default = false
			disableMonthChange={true}
			// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
			firstDay={1}
			// Hide day names. Default = false
			hideDayNames={true}
			// Show week numbers to the left. Default = false
			showWeekNumbers={true}
			// Handler which gets executed when press arrow icon left. It receive a callback can go back month
			onPressArrowLeft={substractMonth => substractMonth()}
			// Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
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
                textDayHeaderFontSize: 16
            }}
		/>
	);
};
export default AppointmentMaker;