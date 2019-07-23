import React, { useEffect, useState } from "react";
import {ActivityIndicator, View, Text}  from "react-native";
import * as Font from 'expo-font';
import { Router, Stack, Scene } from 'react-native-router-flux';
import OutterWrapper from "./src/components/wrapper";
import Row from "./src/components/row";

import Login from './src/pages/login';
import Home from './src/pages/home';
import BookingType from './src/pages/bookingtype';
import Emergency from './src/pages/emergency';
import NonEmergency from './src/pages/nonemergency';
import Schedule from './src/pages/schedule';

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
            <Router>
                <Stack key="root">
                	<Scene key="login" component={Login} hideNavBar={true}/>
				    <Scene key="home" component={Home} hideNavBar={true}/>
					<Scene  hideNavBar={true} key="bookingType" component={BookingType}/>
					<Scene  hideNavBar={true} key="emergency" component={Emergency}/>
                    <Scene  hideNavBar={true} key="nonemergency" component={NonEmergency}/>
                    <Scene  hideNavBar={true} key="schedule" component={Schedule}/>
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
