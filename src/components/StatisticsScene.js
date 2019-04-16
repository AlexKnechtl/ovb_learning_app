//@ts-check
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { StatisticsCategory } from './common/StatisticsCategory';
import {connect} from 'react-redux';

class StatisticsScene extends Component {

    navigateHome =() => {
        this.props.navigation.navigate('main');
    }

    render() {
        const bestandenText = this.props.exam.percentageRight >= 0.8 ? 'Prüfung bestanden!' : 'Prüfung leider nicht bestanden!';
        const percentageRight = this.props.exam.percentageRight*100;
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
                        percent={percentageRight}
                        radius={54}
                        borderWidth={8}
                        color="#2EEF6A"
                        shadowColor="#fff"
                        bgColor="#003A65">
                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            {percentageRight.toFixed(0)}%
                        </Text>
                    </ProgressCircle>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22, marginTop: 12 }}>
                        {bestandenText}
                    </Text>
                </View>
                <View style={styles.lineColor} />
                <ScrollView style={{ paddingVertical: 12 }}> 
                    {Object.keys(this.props.exam.finishedStats).map(key=>{ 
                        var currModResult = this.props.exam.finishedStats[key];
                        var moduleName = this.props.modules.modules[key].name;
                        var imageUri = this.props.modules.modules[key].image;
                    return <StatisticsCategory 
                    titleText={moduleName} 
                    questionsFalse={currModResult.falseQuestions} 
                    questionsRight={currModResult.rightQuestions}
                    success={currModResult.percentageRight>=0.8}
                    learningState={currModResult.percentageRight}
                    imageUri={imageUri}
                    onPress={()=>{}}
                    />;})}
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

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScene);