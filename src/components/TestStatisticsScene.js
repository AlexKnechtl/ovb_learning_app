import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { StatisticsCategory } from './common/StatisticsCategory';
import { connect } from 'react-redux';
import { getExamResultStatsForModuleAction } from 'core/lib/adapters/redux/actions/ExamResultActions';
import { Fonts } from '../utils/Fonts';

class TestStatisticsScene extends Component {
    state = {
        icon: null,
    }

    navigateHome = () => {
        this.props.navigation.navigate('main');
    }

    render() {
        const bestandenText = this.props.exam.percentageRight >= 0.6 ? 'Bestanden!' : 'Nicht bestanden.';
        const infoText = this.props.exam.percentageRight >= 0.6 ? 'Weiter so! :)' : 'Nächstes mal schaffst du es!';
        const percentageRight = this.props.exam.percentageRight * 100;
        return (
            <View style={styles.containerStyle}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#003A65"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <ScrollView style={{ paddingBottom: 88, flexGrow: 1 }}>
                    <View style={{ paddingBottom: 88, flexGrow: 1 }}>
                        <View style={{ minHeight: '15%', width: '100%', backgroundColor: "#003A65", padding: 12, alignItems: "center" }}>
                            <View style={{
                                padding: 8,
                                borderRadius: 100,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: '#fff0',
                                borderColor: this.props.exam.percentageRight >= 0.6 ? 'rgba(46, 239, 106, 0.4)' : 'rgba(244, 75, 75, 0.4)',
                                borderWidth: 2
                            }}>
                                <ProgressCircle
                                    percent={percentageRight}
                                    radius={64}
                                    borderWidth={8}
                                    color={this.props.exam.percentageRight >= 0.6 ? '#2EEF6A' : '#F44B4B'}
                                    shadowColor="#003A65"
                                    bgColor="#003A65">
                                    <Text style={{ fontSize: 32, fontFamily: Fonts.RobotoSlabBold, color: "#fff" }}>
                                        {percentageRight.toFixed(0)}%
                            </Text>
                                </ProgressCircle>
                            </View>
                            <Text style={{ color: "#fff", fontFamily: Fonts.RobotoSlabBold, fontSize: 38, marginTop: 4, marginLeft: 12 }}>
                                {bestandenText}
                            </Text>
                            <Text style={{ color: "#fff", fontSize: 22, fontFamily: Fonts.RobotoSlab, marginTop: 4, marginLeft: 12 }}>
                                {infoText}
                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: this.props.exam.percentageRight >= 0.6 ? '#2EEF6A' : '#F44B4B',
                            height: 7,
                            marginBottom: 12,
                            width: '100%'
                        }} />
                        {Object.keys(this.props.exam.finishedStats).map(key => {
                            var currModResult = this.props.exam.finishedStats[key];
                            var moduleName = this.props.modules.modules[key].name;
                            var imageUri = this.props.modules.modules[key].image;
                            return <StatisticsCategory
                                key={key}
                                titleText={moduleName}
                                questionsFalse={currModResult.falseQuestions}
                                questionsRight={currModResult.rightQuestions}
                                success={currModResult.percentageRight >= 0.6}
                                buttonText="Details"
                                learningState={currModResult.percentageRight}
                                imageUri={imageUri}
                                onPress={() => this.props.dispatchInitStatsForModule(key)}
                            />;
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.navigateHome()}
                    style={{
                        position: "absolute",
                        bottom: 32,
                        right: 0,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                    <View style={styles.buttonStyle}>
                        <Text style={{ fontSize: 20, color: '#fff', fontFamily: Fonts.RobotoSlabBold, marginRight: 8 }}>
                            Weiter lernen
                        </Text>
                        <Image source={require('../img/ic_back.png')} style={{ transform: [{ rotate: '180deg' }], width: 32, height: 20 }} />
                    </View>
                    <View style={{
                        height: 5,
                        width: '100%',
                        backgroundColor: this.props.exam.percentageRight >= 0.6 ? '#2EEF6A' : '#F44B4B'
                    }}>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    backIcon: {
        height: 32,
        width: 32,
        transform: [{ rotate: '180deg' }]
    },
    buttonStyle: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        backgroundColor: "#003A65",
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapDispatchToProps = {
    dispatchInitStatsForModule: getExamResultStatsForModuleAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestStatisticsScene);