//@ts-check

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { PopupBottom } from './common';
import { MultipleChoiceQuestionInteractor, QuestionService, QuestionInfo, getNextExamQuestionAction, answerExamQuestionAction, finishExamAction, SELECT_CURRENT_SUBMODULE } from 'core';
import { getNextExamResultQuestionAction, getPrevExamResultQuestionAction } from 'core/lib/adapters/redux/actions/ExamResultActions';

class TestResultScene extends Component {
    state = {
        answer1Clicked: false,
        answer2Clicked: false,
        answer3Clicked: false,
        check: false,
        lastAnswerRight: undefined,
        currentQuestion: undefined,
        currQuestionIndex: 0
    }
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    // props = {
    //     exam: {
    //         /** @type {QuestionInfo[]} */
    //         questions: [],
    //         /** @type {QuestionInfo} */
    //         currentQuestion: undefined,
    //         currentIndex: 0
    //     }
    // }

    toogleModal() {
        this.refs.popupBottom.showAddModal();
    }

    render() {
        // const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;
        var currQuestion = this.props.examResult.currentQuestion;
        if(!currQuestion){
            return;
        }
        
        const answer1Clicked = !currQuestion.question.answer1.choosen;
        const answer2Clicked = !currQuestion.question.answer2.choosen;
        const answer3Clicked = !currQuestion.question.answer3.choosen;

        //Antwort die ausgewählt wurde
        const marginAnswer1 = answer1Clicked ? 20 : 0;
        const marginAnswer2 = answer2Clicked ? 20 : 0;
        const marginAnswer3 = answer3Clicked ? 20 : 0;

        const fontWeightStyle = answer1Clicked ? "normal" : "bold";
        const fontWeightStyle2 = answer2Clicked ? "normal" : "bold";
        const fontWeightStyle3 = answer3Clicked ? "normal" : "bold";

        //Hier muss nur noch die richtige Farbe der Antworten angezeigt werden
        //Richtig --> Grün Falsch --> Rot
        const backgroundColor1 = currQuestion.question.answer1.isRight ? '#2EEF6A' : '#F44B4B';
        const backgroundColor2 = currQuestion.question.answer2.isRight ? '#2EEF6A' : '#F44B4B';
        const backgroundColor3 = currQuestion.question.answer3.isRight ? '#2EEF6A' : '#F44B4B';


        var question = currQuestion.question.question;

        var a1 = currQuestion.question.answer1.answer;
        var a2 = currQuestion.question.answer2.answer;
        var a3 = currQuestion.question.answer3.answer;

        var canGetNextQuestion = this.props.examResult.canGetNextQuestion;
        var cangetPrevQuestion = this.props.examResult.currentIndex >0;

        console.log(`canGetNextQuestion: ${canGetNextQuestion}, cangetPrevQuestion: ${cangetPrevQuestion}, `);

        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <SafeAreaView>
                    <ScrollView style={{ height: '25%' }}>
                        <Text style={styles.questionTextHeader}>
                            {`${currQuestion.moduleId.replace("_", "\.")} Frage ${currQuestion.questionId.substr(4)}`}
                        </Text>
                        <Text style={styles.questionText}>
                            {question}
                      </Text>
                    </ScrollView>
                </SafeAreaView>
                <View style={styles.lineColor} />
                <View style={styles.questionView}>
                    <ScrollView style={{ flex: 1, height: '100%' }}>
                        <View style={styles.linearLayout2}>
                            <Text style={styles.answerHeaderText}>
                                Antworten
                                </Text>
                            <Image style={styles.logoStyle} source={require('../img/logo_ovb_white.png')} />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer1, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor1
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', color: "#fff", fontWeight: fontWeightStyle, fontSize: 14, padding: 8 }}>
                                {a1}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer2, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor2
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', fontWeight: fontWeightStyle2, color: "#fff", fontSize: 14, padding: 8 }}>
                                {a2}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer3, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor3
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', color: "#fff", fontWeight: fontWeightStyle3, fontSize: 14, padding: 8 }}>
                                {a3}
                            </Text>
                        </View>
                    </ScrollView>
                    <SafeAreaView style={styles.bottom}>
                        <View style={styles.linearLayout}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toogleModal()}>
                                <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                    Optionen
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!cangetPrevQuestion} style={{
                                flex: 1,
                                backgroundColor: "#fff3",
                                marginTop: 12,
                                alignItems: "center",
                                marginLeft: 12,
                                height: 48,
                                justifyContent: "center",
                            }} onPress={() => this.props.dispatchGetPrevQuestion()}>
                                <Image style={styles.backButton} source={require('../img/ic_back.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!canGetNextQuestion} style={{
                                flex: 1,
                                backgroundColor: '#fff3',
                                marginTop: 12,
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 12,
                                height: 48,
                            }} onPress={() => this.props.dispatchGetNextQuestion()}>
                                <Image style={styles.forwardButton} source={require('../img/ic_back.png')} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <PopupBottom ref={'popupBottom'} navigation={this.props.navigation}
                        sectionText={`${currQuestion.moduleId.replace("_", "\.")} ${this.props.modules.modules[currQuestion.sectionId].modules[currQuestion.moduleId].name}`}
                        questionNumberText={`Frage ${this.props.examResult.currentIndex+1} / ${this.props.examResult.questions.length}`} >
                    </PopupBottom>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    questionView: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#003A65'
    },
    buttonStyle: {
        backgroundColor: 'rgba(255,255,255, 0.0)',
        borderColor: '#fff4',
        marginTop: 12,
        borderWidth: 2,
        paddingLeft: 24,
        paddingRight: 24
    },
    answerButtonStyle: {
        flexDirection: 'row',
        minHeight: 90,
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    answerTrueFalse: {
        width: '100%',
        textAlign: "center",
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
    linearLayout: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    linearLayout2: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: "flex-end",
        marginBottom: 18
    },
    questionTextHeader: {
        fontSize: 28,
        marginTop: 10,
        marginLeft: 20,
        fontWeight: "bold",
        color: '#003A65'
    },
    questionText: {
        fontSize: 17,
        color: '#003A65',
        marginLeft: 18,
        marginRight: 12,
        marginTop: 4
    },
    answerHeaderText: {
        fontSize: 28,
        color: '#fff'
    },
    lineColor: {
        backgroundColor: "#00B7E5",
        height: 7,
        width: '100%'
    },
    imageStyle: {
        resizeMode: 'center',
        height: 45,
        width: 100
    },
    logoStyle: {
        resizeMode: 'contain',
        height: 42,
        width: 42
    },
    backButton: {
        resizeMode: "contain",
        width: 32,
        height: 32,
        marginRight: 10,
    },
    forwardButton: {
        resizeMode: "contain",
        width: 32,
        height: 32,
        marginRight: 10,
        transform: [{ rotate: '180deg'}]
    },
});

const mapDispatchToProps = {
    dispatchGetNextQuestion: getNextExamResultQuestionAction,
    dispatchGetPrevQuestion: getPrevExamResultQuestionAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    examResult: state.exam.moduleResults,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultScene);
