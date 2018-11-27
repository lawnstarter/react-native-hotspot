import React, { Component } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RNHotspot, RNHotspotHelper } from 'react-native-hotspot';

export default class App extends Component {
    constructor(props) {
        super(props);

        // in your screen's constructor, use the helper with an array of onPress actions you want your hotspots to trigger
        this.componentRefs = RNHotspotHelper([
            () => {
                Alert.alert(null, 'This button does this thing.');
            },
            () => {
                Alert.alert(null, 'This button does other thing.');
            },
        ]);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {/* drop the component below the outer wrapping parent of your screen */}
                <RNHotspot componentRefs={this.componentRefs} />
                <View style={styles.container}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <View style={{ marginVertical: 100 }}>
                        {/* expose the refs in the same order as the array definied above */}
                        <Button
                            title="Button #1"
                            onPress={() => {}}
                            ref={this.componentRefs[0].ref}
                        />
                    </View>
                    <View style={{ marginVertical: 200 }}>
                        <Button
                            title="Button #2"
                            onPress={() => {}}
                            ref={this.componentRefs[1].ref}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        marginTop: 50,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 100,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
