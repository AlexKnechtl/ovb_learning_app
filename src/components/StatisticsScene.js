import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { StatisticsCategory } from './common';

class StatisticsScene extends Component {

    navigateHome =() => {
        this.props.navigation.navigate('main');
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#154A38"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <View style={{ height: '25%', widht: '100%', backgroundColor: "#003A65", justifyContent: "center", alignItems: "center" }}>
                    <ProgressCircle
                        percent={30}
                        radius={54}
                        borderWidth={8}
                        color="#2EEF6A"
                        shadowColor="#fff"
                        bgColor="#003A65">
                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            {'30%'}
                        </Text>
                    </ProgressCircle>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 12 }}>
                        Prüfung bestanden!
                    </Text>
                </View>
                <View style={styles.lineColor} />
                <ScrollView style={{ paddingVertical: 12 }}>
                    <StatisticsCategory>

                    </StatisticsCategory>
                    <StatisticsCategory>

                    </StatisticsCategory>
                </ScrollView>
                <TouchableOpacity style={styles.floatingActionButton} onPress={() => this.navigateHome()}>
                    <Image source={require('../img/ic_back.png')} style={styles.backIcon} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    lineColor: {
        backgroundColor: "#00B7E5",
        height: 7,
        width: '100%'
    },
    floatingActionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00B7E5',
        position: 'absolute',
        bottom: 24,
        right: 20
    },
    backIcon: {
        height: 32,
        width: 32,
        transform: [{ rotate: '180deg'}]
    }
});

export default StatisticsScene;