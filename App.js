import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, View, StyleSheet}  from "react-native";
import * as Font from 'expo-font';

import OutterWrapper from "./src/components/wrapper";
import Header from './src/components/header';
import Row from "./src/components/row";
import Button from './src/components/button';

import content from './src/international';


const styles = StyleSheet.create({
    font: {
      fontFamily: 'poppins',
      fontSize: 32
    }
  })

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
            <OutterWrapper >               
                <Row><Header title="Village Surgery" description="something something"/></Row>
                <Row/>
                <Row>
                    <Button title={content.bookAppointment}/>
                    <Button title={content.showBookings} />
                </Row>
            </OutterWrapper>
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
