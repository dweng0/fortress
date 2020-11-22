import React, { useEffect, useState } from "react";
import {ActivityIndicator, View, Text}  from "react-native";
import * as Font from 'expo-font';
import { Router, Stack, Scene } from 'react-native-router-flux';
import OutterWrapper from "./src/components/wrapper";
import Row from "./src/components/row";

import Home from './src/pages/Home';
import Settings from './src/pages/Settings';
import Exercise from './src/pages/Exercise';

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
            <Router  navBar = {NavBar}>
                <Stack key="root">
                    <Scene key="index" component={Home} hideNavBar={true}/>
                    <Scene key="settings" component={Settings} hideNavBar={true}/>
                    <Scene key="exercise" component={Exercise} hideNavBar={true}/>
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
