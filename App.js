import React, { useEffect, useState } from "react";
import {ActivityIndicator, View, Text}  from "react-native";
import * as Font from 'expo-font';
import { Router, Stack, Scene } from 'react-native-router-flux';
import OutterWrapper from "./src/components/wrapper";
import Row from "./src/components/row";
import service from './src/service';
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

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

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

    if(fontLoaded)
    {
		//move login to top when finished
        return (
            <Router  navBar = {NavBar}>
                <Stack key="root">
                <Scene key="register" component={Register} service={service}/>
                    <Scene key="login" component={Login} hideNavBar={true}/>
                    <Scene key="nonemergency" component={NonEmergency}/>
                    <Scene key="passcodeLogin" component={PassCode} hideNavBar={true}/>
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
