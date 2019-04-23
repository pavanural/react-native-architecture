import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ScreenHeader, DummyView } from '../../../../components/headerComponent'


export default class Terms extends Component {

    static navigationOptions = {
        headerTitle: <ScreenHeader name="Terms and Condition" />,
        headerRight: <DummyView />
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Terms and Condition</Text>
            </View >
        )
    }

}



