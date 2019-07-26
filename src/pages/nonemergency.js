import React, { useState, useEffect } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";

import OutterWrapper from "../components/wrapper";
import Header from "../components/header";
import Row from "../components/row";
import Button from "../components/button";
import Calendar from '../components/calendar';
import { sheet } from '../styles/structure';

const markedDatesExample = {
    '2012-05-20': { textColor: 'green' },
    '2012-05-22': { startingDay: true, color: 'green' },
    '2012-05-23': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
    '2012-05-04': { disabled: true, startingDay: true, color: 'green', endingDay: true }
};

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export default function Type() {
    const [queryStatus, setQueryStatus] = useState('searching'); //found
    const [calenderData, setCalendarData] = useState({});

    //we only care if the day is fully booked
    let unavailableDays = {}
    let maxDates = null
    useEffect(() => {
        //set unavailable dates
    }, [calenderData])

    const maybeLoadCalender = () => {
        //negative for testing
        if (!isEmpty(calenderData)) {
            return (
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            return <Calendar maxDates={maxDates} markedDates={unavailableDays} />
        }
    };

    return (
        <OutterWrapper>
            <Row>
                <Header
                    title="Appointments"
                    description="Pick from available slots"
                />

            </Row>
            <Row>{maybeLoadCalender()}</Row>
            <Row>
                <Button
                    onPress={() => {
                        Actions.bookingType();
                    }}
                    title="Cancel"
                />
            </Row>

        </OutterWrapper>
    );
}
