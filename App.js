import React, { useEffect, useState } from "react";
import {ActivityIndicator, View}  from "react-native";
import * as Font from 'expo-font';
import { Router, Stack, Scene } from 'react-native-router-flux';
import OutterWrapper from "./src/components/wrapper";
import Row from "./src/components/row";
import content from "./src/international";

import Login from './src/pages/login';
import Home from './src/pages/home';

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
        return (
            <Router>
                <Stack key="root">
                    <Scene key="login" component={Login}/>
                    <Scene key="home" component={Home}/>
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
