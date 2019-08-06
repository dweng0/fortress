import React, { useEffect, useState } from "react";
import {ActivityIndicator, View, Text}  from "react-native";
import * as Font from 'expo-font';
import { Router, Stack, Scene } from 'react-native-router-flux';
import OutterWrapper from "./src/components/wrapper";
import Row from "./src/components/row";

import Register from './src/pages/register';
import Login from './src/pages/login';
import Home from './src/pages/home';
import BookingType from './src/pages/bookingtype';
import Emergency from './src/pages/emergency';
import NonEmergency from './src/pages/nonemergency';
import Schedule from './src/pages/schedule';
import NavBar from './src/components/navbar';
import PassCode from "./src/pages/passcodelogin";
import ScheduleDetail from "./src/pages/scheduledetails";
import firebase from 'firebase'
import '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyCGcYuwhC_TgSa09SxpUdeZe_v770UoFfg",
  authDomain: "localhost",
  projectId: "fortress-da186"
};

firebase.initializeApp(firebaseConfig);

const dbh = firebase.firestore();

console.log(dbh)

const surgeryFlat = {
    name: "Village Surgery",
    website: "www.bear.care",
    openingTimes: {
        monday: ["09:00:00", "15:00:00"],
        tuesday: ["09:00:00", "15:00:00"],
        wednesday: ["09:00:00", "15:00:00"],
        thursday: ["09:00:00", "15:00:00"],
        friday: ["09:00:00", "15:00:00"],
    },

    staff: {
        "23e23ead": {
            profession:"Doctor"
        }
    },
    //the key is the uid
    patients: {
        "asdf323": {
            dateOfBirth:"03/12/2019",
            hasChildren:true
        },
        "sdw4223r2r": {
            dateOfBirth:"03/12/2019",
            hasChildren:false,
        }
    },
    practiceDays: {
        "13/08/2019": { //have practice days as an array
            "09:00:00": {
                emergencyOnly:false,
                staff:"2323ij2o3irj"
            },
            "10:00:00":{
                emergencyOnly:true,
                staff:"2312fefe"
            },
            "09:30:00": {
                emergencyOnly:false,
                staff:"2312fefe",
                patient:"sdw4223r2r"
            }
        }
    },
    //tokens waiting on people to register, if they match up, then they can be added to this surgeries patient object.
    //user flow:
    // user gets a registry token from their surgery
    // user downloads app
    //user selects register
    // user finds their surgery by typing in its name in the app
    // user enters their token, dataof birth and postcode.
    // if it matches, they are added to the surgery patient list and can begin making appointments straight away
    tokens: [
        {
            lastName: "Martin-Smith", //we dont care about this, but if they phone up, the receptionist can confirm their db, postcode and last name
            registryToken: "123",
            postCode: "bh88py",
            dateOfBirth: "01/16/1988"
        }
    ]
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [connectionMade, setConnectionMade] = useState(false);


    useEffect(()=>{ const loadFonts = async () => {
        try {
            await Font.loadAsync({
                'poppins': require('./assets/fonts/Poppins-SemiBold.ttf')
			});

            setFontLoaded(true);
        }
        catch(e) {
            console.log('failed to load custom font... ')
        }

    }
    loadFonts();
    }, []);


    dbh.collection("surgeries").doc("surgery").set(surgeryFlat)
    .then(() => {setConnectionMade(true)})
    .catch(e => {console.log(e)});

    if(fontLoaded && connectionMade)
    {
		//move login to top when finished
        return (
            <Router  navBar = {NavBar}>
                <Stack key="root">
                    <Scene key="login" component={Login} hideNavBar={true}/>
                    <Scene key="nonemergency" component={NonEmergency}/>
                    <Scene key="passcodeLogin" component={PassCode} hideNavBar={true}/>
                    <Scene key="register" component={Register} hideNavBar={true}/>
				    <Scene key="home" component={Home}  hideNavBar={true}/>
					<Scene key="bookingType" component={BookingType}/>
					<Scene key="emergency" component={Emergency}/>
                    <Scene key="schedule" component={Schedule}/>
                    <Scene key="scheduleDetail" component={ScheduleDetail}/>
                </Stack>
            </Router>
        );
    }
    else
    {
        return(
            <OutterWrapper>
                <Row/>
                <Row>
                    <View>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                </Row>
            </OutterWrapper>
        );
    }

}
