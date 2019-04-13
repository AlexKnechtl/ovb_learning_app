//@ts-check

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, StatusBar, View, Text, Image, BackHandler } from 'react-native';
import * as Progress from 'react-native-progress';
import { MainHeader } from './common';
import { Actions } from 'react-native-router-flux';
import { ActionButton, PopupCenter } from './common';
import { connect } from "react-redux";
import { setLearningModeAction, LearningAlgorithm, QuestionService, LearningService, continueModuleLearningAction, continueSectionLearningAction, learnFalseQuestionsFromModuleAction } from "core";

var screen = Dimensions.get("window");

const icon_pdf = (<Image style={{ width: 32, height: 32, marginLeft: 11, marginRight: 9 }} source={require('../img/ic_pdf.png')} />)
const icon_wrong_questions = (<Image style={{ width: 32, height: 32, marginLeft: 8, marginRight: 12 }} source={require('../img/ic_wrong_questions.png')} />)
const icon_continue = (<Image style={{ width: 32, height: 32, marginLeft: 8, marginRight: 12 }} source={require('../img/ic_continue.png')} />)
const icon_watch_questions = (<Image style={{ width: 32, height: 32, marginLeft: 8, marginRight: 12 }} source={require('../img/ic_look_questions.png')} />)

const btnText = (
    <Text style={{ alignSelf: 'center', fontWeight: "bold", color: '#fff', fontSize: 18 }}>
        Lernvorgang fortsetzen
    </Text>
)

class CategoryInfoScene extends Component {
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
        
        // this.handleBackPress = this.handleBackPress.bind(this);
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    // handleBackPress = () => {
    //     // Actions.category();

    //     return true;
    // }

    // componentWillMount() {
    //     BackHandler.removeEventListener('hardwareBackPress', () => {})
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // }

    render() {
        const mainHeaderText = (
            <View>
                <Text style={{ fontSize: 22, fontWeight: "bold", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
                    Kategorien
                </Text>
                <Text style={{ fontSize: 18, textAlignVertical: 'bottom', color: '#fff4', marginLeft: 20 }}>
                    {this.props.modules.modules[this.props.modules.currentModuleID].name}
                </Text>
            </View>
        );
        var la = new LearningAlgorithm(new QuestionService(), LearningService);
        var subMID = this.props.modules.selectedSubmodule;
        var stats = la.calcCurrentLearningStatsForModule(subMID);
        var lernState = stats.seenQuestions/stats.questionCount;
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
                                <Text style={styles.percentTextStyle}>{(lernState*100).toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.statisticTextStyle}>
                                Erfolgschance
                            </Text>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: "row" }}>
                                <Progress.Bar progress={stats.successRate} height={32.4} width={0} style={{ width: "82%" }} color={'#58ACD9'} unfilledColor='#DEEBE1' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>{(stats.successRate*100).toFixed(0)}%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginRight: 20, marginLeft: 20, height: 45, backgroundColor: "#003A65", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                                {stats.seenQuestions}/{stats.questionCount} Fragen richtig beantwortet
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 6, marginBottom: 16, fontWeight: "bold", color: "#003A65", width: '100%', textAlign: "center" }}>
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
                            // Actions.question();
                            this.props.dispatchLearnFalseQuestions(this.props.modules.selectedSubmodule);
                        }}
                        disabled={stats.falseQuestions == 0}
                        >
                            Falsche Fragen üben
                        </ActionButton>
                        <ActionButton image={icon_watch_questions} onPress={() => {
                            // Actions.question();
                            alert("Feature kommt bald.");
                        }}>
                            Fragen druchblättern
                        </ActionButton>
                        <ActionButton image={icon_pdf} onPress={() => {
                            // Actions.question();
                            alert("Feature kommt bald.");
                        }}>
                            PDF durchlessen
                        </ActionButton>
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'}>

                </PopupCenter>
            </View>
        );
    }
    startSectionLearning() {
        this.props.dispatchContinueSectionLearning(this.props.modules.currentModuleID);
    }
    startLearning() {
        this.props.dispatchContinueModuleLearning(this.props.modules.selectedSubmodule);
        // Actions.question();
        // this.props.navigation.push('question');
    }
}

const styles = StyleSheet.create({
    titleTextStyle: {
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 8,
        width: screen.width,
        fontWeight: "bold",
        color: "#003A65",
    },
    statisticTextStyle: {
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 4,
        fontWeight: "bold",
        color: "#003A65",
    },
    percentTextStyle: {
        fontSize: 24,
        fontWeight: "bold",
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
    dispatchContinueModuleLearning: continueModuleLearningAction,
    dispatchContinueSectionLearning: continueSectionLearningAction,
    dispatchLearnFalseQuestions: learnFalseQuestionsFromModuleAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInfoScene);