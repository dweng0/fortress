import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loader = props => {

    return (
        <View className="rhombus">
            <View>
                <View className="circle1"></View>
                <View className="circle2"></View>
            </View>
            <View className="text">
                <Text>Loading</Text>
            </View>
        </View>
    )
}

export default Loader