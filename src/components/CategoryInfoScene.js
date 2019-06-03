//@ts-check

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, StatusBar, View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { MainHeader } from './common';
import { ActionButton, PopupCenter, FinishedPopup } from './common';
import { connect } from "react-redux";
import { setLearningModeAction, LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, continueSectionLearningAction, learnFalseQuestionsFromModuleAction, signOutAction } from "core";
import { Fonts } from '../utils/Fonts';

var screen = Dimensions.get("window");

const icon_pdf = (<Image style={{ width: 32, height: 32, marginLeft: 11, marginRight: 9 }} source={require('../img/ic_pdf.png')} />)
const icon_wrong_questions = (<Image style={{ width: 32, height: 32, marginLeft: 8, marginRight: 12 }} source={require('../img/ic_wrong_questions.png')} />)
const icon_continue = (<Image style={{ width: 32, height: 32, marginLeft: 8, marginRight: 12 }} source={require('../img/ic_continue.png')} />)
const icon_watch_questions = (<Image style={{ width: 32, height: 32, marginLeft: 8, marginRight: 12 }} source={require('../img/ic_look_questions.png')} />)

const btnText = (
    <Text style={{ alignSelf: 'center', fontFamily: Fonts.RobotoSlabBold, color: '#fff', fontSize: 18 }}>
        Lernvorgang fortsetzen
    </Text>
)

class CategoryInfoScene extends Component {

    _subscribe;

    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    toogleModalBox() {
        this.refs.popupInfo.showModal();
    }

    closeModal() {
        this.refs.popupInfo.closeModal();
    }

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.forceUpdate();
        });
    }

    render() {
        const mainHeaderText = (
            <View>
                <Text style={{ fontSize: 22, fontFamily: Fonts.RobotoSlabBold, textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
                    Kategorien
                </Text>
                <Text style={{ fontSize: 18, fontFamily: Fonts.RobotoSlab, textAlignVertical: 'bottom', color: '#fff4', marginLeft: 20 }}>
                    {this.props.modules.modules[this.props.modules.currentModuleID].name}
                </Text>
            </View>
        );
        var la = new LearningAlgorithm(new QuestionService(), LearningService);
        var subMID = this.props.modules.selectedSubmodule;
        var stats = la.calcCurrentLearningStatsForModule(subMID);
        var lernState = stats.seenQuestions / stats.questionCount;
        var pdfSrc = this.props.modules.modules ? this.props.modules.modules[this.props.modules.currentModuleID].modules[subMID].pdf : '';
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#003A65"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <MainHeader
                    text="Lernvorgang fortsetzen"
                    style={{ backgroundColor: "#663399", flexDirection: 'row-reverse', alignItems: 'center' }}
                    buttonText={btnText}
                    onPressButton={() => this.startSectionLearning()}
                    children={mainHeaderText}
                    children2={<Image style={{ height: 40, width: 40 }} source={require('../img/ic_options.png')} />}
                    optionsPress={() => this.toogleModal()}
                    pdfPress={() => this.props.navigation.navigate('pdfScene', { pdfSrc })}
                />
                <ScrollView
                    style={styles.containerStyle}
                    resizeMode='cover'>
                    <SafeAreaView>
                        <Text style={styles.titleTextStyle}>
                            {`${this.props.modules.selectedSubmodule.replace("_", ".")} ${this.props.modules.selectedSubmoduleName}`}
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
                                <Progress.Bar progress={stats.successRate} height={32.4} width={0} style={{ width: "82%" }} color={'#58ACD9'} unfilledColor='rgba(0, 58, 101, 0.2)' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>{(stats.successRate * 100).toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginRight: 20, marginLeft: 20, height: 45, backgroundColor: "#003A65", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontFamily: Fonts.RobotoSlabBold }}>
                                {stats.seenQuestions}/{stats.questionCount} Fragen richtig beantwortet
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: Fonts.RobotoSlabBold, marginTop: 6, marginBottom: 16, color: "#003A65", width: '100%', textAlign: "center" }}>
                            {stats.falseQuestions} Fragen falsch beantwortet
                        </Text>
                        <Text style={styles.statisticTextStyle}>
                            Aktionen
                        </Text>
                        <ActionButton image={icon_continue} onPress={() => {
                            this.startLearning();
                        }}>
                            Dieses Kapitel üben
                        </ActionButton>
                        <ActionButton image={icon_wrong_questions} onPress={() => {
                            if (stats.falseQuestions == 0)
                                this.toogleModalBox();
                            else
                                this.props.dispatchLearnFalseQuestions(this.props.modules.selectedSubmodule);
                        }} >
                            Falsche Fragen üben
                        </ActionButton>
                        <ActionButton image={icon_watch_questions} onPress={() => {
                            this.props.navigation.navigate('questionView');
                        }}>
                            Fragen durchblättern
                        </ActionButton>
                        <ActionButton image={icon_pdf} onPress={() => this.props.navigation.navigate('pdfScene', { pdfSrc })}>
                            PDF durchlesen
                        </ActionButton>
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
        fontFamily: Fonts.RobotoSlabBold,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 8,
        width: screen.width,
        color: "#003A65",
    },
    statisticTextStyle: {
        fontSize: 18,
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
    // dispatchSelectLearningMode: setLearningModeAction,
    dispatchLogOut: signOutAction,
    dispatchContinueModuleLearning: continueModuleLearningAction,
    dispatchContinueSectionLearning: continueSectionLearningAction,
    dispatchLearnFalseQuestions: learnFalseQuestionsFromModuleAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInfoScene);
