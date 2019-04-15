import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, ImageBackground, Image, StatusBar } from 'react-native';

class Impressum extends Component {
    render() {
        return (
            <ImageBackground
                style={styles.containerStyle}
                source={require('../img/bg_impressum.jpg')}
                resizeMode='cover'>
                <SafeAreaView style={{ backgroundColor: "#fff0" }}>
                    <StatusBar
                        backgroundColor="#154A38"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <SafeAreaView style={{ alignItems: "center", flex: 1 }} >
                    <Image style={styles.logoBig} source={require('../img/seek_innovation_logo.png')} />
                    <Text style={styles.smallHeader}>
                        made with Passion.
                    </Text>
                    <Text style={styles.header}>
                        by SeekInnovation
                    </Text>
                    <Text style={styles.header}>
                        by SeekInnovation
                    </Text>
                </SafeAreaView>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    logoLayoutStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginTop: 18,
        flexDirection: "row",
    },
    header: {
        color: '#fff',
        fontSize: 28,
        marginTop: 6,
        fontWeight: "bold",
        alignSelf: 'center',
        textAlign
    },
    smallHeader: {
        color: '#fff',
        fontSize: 22,
        marginTop: 18,
        alignSelf: 'center'
    },
    logoBig: {
        marginTop: '12%',
        resizeMode: "contain",
        height: '12%',
        width: 194
    }
});

export default Impressum;