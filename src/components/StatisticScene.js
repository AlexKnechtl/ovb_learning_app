import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, StatusBar, View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { MainHeader } from './common';
import { ActionButton, PopupCenter, FinishedPopup } from './common';
import { connect } from "react-redux";
import { LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, continueSectionLearningAction, learnFalseQuestionsFromModuleAction } from "core";
import { Fonts } from '../utils/Fonts';

class StatisticScene extends Component {
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    closeModal() {
        this.refs.popupInfo.closeModal();
    }

    render() {
        const mainHeaderText = (
            <View>
                <Text style={{ fontSize: 22, fontWeight: "bold", fontFamily: Fonts.RobotoSlab, textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
                    Allgemeine Statistik
                </Text>
                <Text style={{ fontSize: 18, fontFamily: Fonts.RobotoSlab, textAlignVertical: 'bottom', color: '#fff4', marginLeft: 20 }}>
                    Leistungsübersicht
                </Text>
            </View>
        );

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#003A65"
                        barStyle="light-content" />
                </SafeAreaView >
                <MainHeader
                    text="Weiter lernen"
                    style={{ backgroundColor: "#663399", flexDirection: 'row-reverse', alignItems: 'center' }}
                    style2={{ backgroundColor: "#fff0", height: 0, width: 0, marginLeft: -8 }}
                    onPressButton={() => this.props.navigation.navigate('main')}
                    children={mainHeaderText}
                    children2={<Image style={{ height: 40, width: 40 }} source={require('../img/ic_options.png')} />}
                    optionsPress={() => this.toogleModal()} />
                <ScrollView
                    style={styles.containerStyle}
                    resizeMode='cover'>
                    <SafeAreaView>
                        <Text style={styles.titleTextStyle}>
                            Allgemein
                        </Text>
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.statisticTextStyle}>
                                Fortschritt Lernvorgang
                            </Text>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: "row" }}>
                                <Progress.Bar progress={0.4/*lernState*/} height={32.4} width={0} style={{ width: "82%" }} color={'#58D980'} unfilledColor='rgba(0, 58, 101, 0.2)' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>{"40"/*(lernState * 100).toFixed(0)*/}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.statisticTextStyle}>
                                Erfolgschance
                            </Text>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: "row" }}>
                                <Progress.Bar progress={0.2/*stats.successRate*/} height={32.4} width={0} style={{ width: "82%" }} color={'#58ACD9'} unfilledColor='rgba(0, 58, 101, 0.2)' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>{"20"/*(stats.successRate * 100).toFixed(0)*/}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginRight: 20, marginLeft: 20, height: 45, backgroundColor: "#003A65", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 17, fontFamily: Fonts.RobotoSlab, fontWeight: "bold" }}>
                                {"23"/*stats.seenQuestions*/}/{"104"/*stats.questionCount*/} Fragen richtig beantwortet
                            </Text>
                        </View>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.RobotoSlab, marginTop: 6, marginBottom: 16, fontWeight: "bold", color: "#003A65", width: '100%', textAlign: "center" }}>
                            {"23"/*stats.falseQuestions*/} Fragen falsch beantwortet
                        </Text>
                        <Text style={styles.statisticTextStyle}>
                            Prüfungshistorie
                        </Text>
                        {/*Hier kommen die StatisticCategories rein mit buttonText: "Falsche Fragen üben"*/}
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'} logOut={() => { this.props.dispatchLogOut(); }} impressum={() => { this.props.navigation.navigate('impressum'); }} />
                <FinishedPopup ref={'popupInfo'} onButtonPress={() => { this.closeModal(); }} />
            </View>
        );
    }
    startSectionLearning() {
        this.props.dispatchContinueSectionLearning(this.props.modules.currentModuleID);
    }
    startLearning() {
        this.props.dispatchContinueModuleLearning(this.props.modules.selectedSubmodule);
    }
}

const styles = StyleSheet.create({
    titleTextStyle: {
        fontSize: 20,
        fontFamily: Fonts.RobotoSlab,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 8,
        fontWeight: "bold",
        color: "#003A65",
    },
    statisticTextStyle: {
        fontSize: 18,
        fontFamily: Fonts.RobotoSlab,
        marginLeft: 20,
        marginBottom: 4,
        fontWeight: "bold",
        color: "#003A65",
    },
    percentTextStyle: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: Fonts.RobotoSlab,
        marginRight: 20,
        marginLeft: 8,
        color: "#003A65"
    },
    containerStyle: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});


const mapDispatchToProps = {
    dispatchContinueModuleLearning: continueModuleLearningAction,
    dispatchContinueSectionLearning: continueSectionLearningAction,
    dispatchLearnFalseQuestions: learnFalseQuestionsFromModuleAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScene);
