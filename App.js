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
				<Scene key="home" component={Home} hideNavBar={true}/>
					<Scene key="login" component={Login} hideNavBar={true}/>
					<Scene key="bookingType" component={Emergency}/>
					<Scene key="emergency" component={BookingType}/>
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
