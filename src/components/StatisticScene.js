//@ts-check

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { MainHeader, StatisticsCategory, ExamStatistic } from './common';
import { PopupCenter, FinishedPopup } from './common';
import { connect } from "react-redux";
import { LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, continueSectionLearningAction, learnFalseQuestionsFromModuleAction, signOutAction } from "core";
import { Fonts } from '../utils/Fonts';
/**
 * Prop types
 * @typedef {Object} Props
 * @property {number} falseQuestions
 * @property {number} rightQuestions
 * @property {number} count
 * @property {number} percentageRight
 * @property {{ [timestamp:string]:{ falseQuestions: number, rightQuestions: number, percentageRight: number, count: number, exam:{ [key:string]:{ count: number, falseQuestions: number, percentageRight: number, rightQuestions: number } } } }} exams
 */
/**
 * @augments React.Component<{prevExams: Props}, {}>
 */
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
                <Text style={{ fontSize: 22, fontFamily: Fonts.RobotoSlabBold, textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
                    Allgemeine Statistik
                </Text>
                <Text style={{ fontSize: 18, fontFamily: Fonts.RobotoSlab, textAlignVertical: 'bottom', color: '#fff4', marginLeft: 20 }}>
                    Leistungsübersicht
                </Text>
            </View>
        );
        const {percentageRight, rightQuestions} = this.props.prevExams;
        var mods = this.props.modules.modules;
        var keys = Object.keys(mods);
        var seenQuestions = keys.reduce((pv, key)=> pv+(mods[key].seenQuestions || 0), 0);
        var questionCount = keys.reduce((pv, key)=> pv+(mods[key].questionCount || 0), 0);
        var falseQuestions = keys.reduce((pv, key)=> pv+(mods[key].falseQuestions || 0), 0);
        var lernState = seenQuestions / questionCount;
        const successRate = keys.reduce((pv, key)=> pv+(mods[key].successRate || 0), 0)/keys.length;;
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
                                <Progress.Bar progress={lernState} height={32.4} width={0} style={{ width: "82%" }} color={'#58D980'} unfilledColor='rgba(0, 58, 101, 0.2)' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>{(lernState * 100).toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.statisticTextStyle}>
                                Erfolgschance
                            </Text>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: "row" }}>
                                <Progress.Bar progress={successRate} height={32.4} width={0} style={{ width: "82%" }} color={'#58ACD9'} unfilledColor='rgba(0, 58, 101, 0.2)' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>{(successRate * 100).toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginRight: 20, marginLeft: 20, height: 45, backgroundColor: "#003A65", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 17, fontFamily: Fonts.RobotoSlabBold }}>
                                {seenQuestions}/{questionCount} Fragen richtig beantwortet
                            </Text>
                        </View>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.RobotoSlabBold, marginTop: 6, marginBottom: 16, color: "#003A65", width: '100%', textAlign: "center" }}>
                            {falseQuestions} Fragen falsch beantwortet
                        </Text>
                        <Text style={styles.statisticTextStyle}>
                            Prüfungshistorie
                        </Text>
                        {this.mapStatisticCategories()}
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'} logOut={() => { this.props.dispatchLogOut(); }} impressum={() => { this.props.navigation.navigate('impressum'); }} />
                <FinishedPopup ref={'popupInfo'} onButtonPress={() => { this.closeModal(); }} />
            </View>
        );
    }

    /**
     * 
     * @param {Date} date 
     */
    mapDateTimeToNiceString(date){
        var comp = new Date();
        var diffDate = new Date((comp.valueOf()-date.valueOf()));
        if(diffDate.getFullYear() == 1970){
            if(diffDate.getMonth() == 0){
                if(diffDate.getDate() == 1)
                    return "Heute";
                if(diffDate.getDate() == 2)
                    return "Gestern";
                if(diffDate.getDate() == 3)
                    return "Vorgestern";
                if(diffDate.getDate() < 8){
                    switch (date.getDay()) {
                        case 1:
                            return "Montag";
                        case 2:
                            return "Dienstag";
                        case 3:
                            return "Mittwoch";
                        case 4:
                            return "Donnerstag";
                        case 5:
                            return "Freitag";
                        case 6:
                            return "Samstag";
                        case 7:
                            return "Sonntag";
                        default:
                            return diffDate.getDay();
                            break;
                    }
                }
                if(diffDate.getDate()< 9)
                    return `Vor einer Woche`;
                if(diffDate.getDate() < 9+7)
                    return 'Vor zwei Wochen';
            }
        }
        return date.toLocaleDateString();
      }
    mapStatisticCategories() {
        const exams = this.props.prevExams.exams;
        var lastDate = "";

        return Object.keys(exams).reverse().map(key=>{
            var currDate = this.mapDateTimeToNiceString(new Date(parseInt(key)));
            var isDifferent = currDate !== lastDate;
            lastDate = currDate;
        return (<View>
                {isDifferent && <Text style={styles.dateStyle}>{this.mapDateTimeToNiceString(new Date(parseInt(key)))}</Text>}
            <ExamStatistic key={key} exam={exams[key]} modules={this.props.modules.modules} />
        </View>)});
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
        fontFamily: Fonts.RobotoSlabBold,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 8,
        color: "#003A65",
    },
    statisticTextStyle: {
        fontSize: 18,
        fontFamily: Fonts.RobotoSlabBold,
        marginLeft: 20,
        marginBottom: 4,
        color: "#003A65",
    },
    dateStyle:{
        fontSize: 14,
        fontFamily: Fonts.RobotoSlabBold,
        marginLeft: 20,
        marginBottom: 4,
        color: "#003A65",
    },
    percentTextStyle: {
        fontSize: 24,
        fontFamily: Fonts.RobotoSlabBold,
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
    prevExams: state.userdata
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScene);

