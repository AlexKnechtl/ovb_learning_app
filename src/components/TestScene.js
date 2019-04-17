//@ts-check

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { PopupBottom } from './common';
import { MultipleChoiceQuestionInteractor, QuestionService, QuestionInfo, getNextExamQuestionAction, answerExamQuestionAction, finishExamAction } from 'core';

class TestScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
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

    checkAnswers() {
        var q = this.props.exam.currentQuestion.question;
        var isright = new MultipleChoiceQuestionInteractor().checkIsQuestionRight(this.props.exam.currentQuestion.question);
        this.setState({ lastAnswerRight: isright });
        console.log(isright);
        this.props.dispatchAnswerQuestion(this.props.exam.currentIndex, isright);
        this.props.dispatchGetNextQuestion();
        this.setState({ answer1Clicked: true, answer2Clicked: true, answer3Clicked: true, check: false });
    }

    answer1Click() {
        this.setState({ check: true, answer1Clicked: false, answer2Clicked: true, answer3Clicked: true });
        this.props.exam.currentQuestion.question.answer1.choosen = true;
        this.props.exam.currentQuestion.question.answer2.choosen = false;
        this.props.exam.currentQuestion.question.answer3.choosen = false;
        // this.checkAnswers();
    }

    answer2Click() {
        this.setState({ check: true, answer1Clicked: true, answer2Clicked: false, answer3Clicked: true });
        this.props.exam.currentQuestion.question.answer1.choosen = false;
        this.props.exam.currentQuestion.question.answer2.choosen = true;
        this.props.exam.currentQuestion.question.answer3.choosen = false;
        // this.checkAnswers();
    }

    answer3Click() {
        this.setState({ check: true, answer1Clicked: true, answer2Clicked: true, answer3Clicked: false });
        this.props.exam.currentQuestion.question.answer1.choosen = false;
        this.props.exam.currentQuestion.question.answer2.choosen = false;
        this.props.exam.currentQuestion.question.answer3.choosen = true;
        // this.checkAnswers();
    }

    toogleModal() {
        this.refs.popupBottom.showAddModal();
    }

    render() {
        if (this.props.exam.questions && this.props.exam.currentIndex >= this.props.exam.questions.length)
            this.props.dispatchFinishExam();
        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const backgroundColor1 = answer1Clicked ? "#fff" : 'rgba(0, 183, 229, 1)';
        const backgroundColor2 = answer2Clicked ? "#fff" : 'rgba(0, 183, 229, 1)';
        const backgroundColor3 = answer3Clicked ? "#fff" : 'rgba(0, 183, 229, 1)';

        const textColor1 = answer1Clicked ? "#003A65" : "#fff";
        const textColor2 = answer2Clicked ? "#003A65" : "#fff";
        const textColor3 = answer3Clicked ? "#003A65" : "#fff";

        const fontWeightStyle = answer1Clicked ? "normal" : "bold";
        const fontWeightStyle2 = answer2Clicked ? "normal" : "bold";
        const fontWeightStyle3 = answer3Clicked ? "normal" : "bold";

        const marginAnswer1 = answer1Clicked ? 20 : 0;
        const marginAnswer2 = answer2Clicked ? 20 : 0;
        const marginAnswer3 = answer3Clicked ? 20 : 0;

        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <SafeAreaView>
                    <ScrollView style={{ height: '25%' }}>
                        <Text style={styles.questionTextHeader}>
                            {this.props.exam.currentQuestion ? `${this.props.exam.currentQuestion.moduleId.replace("_", "\.")} Frage ${this.props.exam.currentQuestion.questionId.substr(4)}` : ''}
                        </Text>
                        <Text style={styles.questionText}>
                            {this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.question : ''}
                            {this.props.exam.currentQuestion && __DEV__ ? `\nAntwort Nummer ${this.props.exam.currentQuestion.question.answer1.isRight ? '1' : this.props.exam.currentQuestion.question.answer2.isRight ? '2' : '3'} ist korrekt` : ''}
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
                        <TouchableOpacity
                            onPress={this.answer1Click.bind(this)}
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer1, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor1
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', color: textColor1, fontWeight: fontWeightStyle, fontSize: 14, padding: 8 }}>
                                {this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer1.answer : ''}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.answer2Click.bind(this)}
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer2, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor2
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', fontWeight: fontWeightStyle2, color: textColor2, fontSize: 14, padding: 8 }}>
                                {this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer2.answer : ''}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.answer3Click.bind(this)}
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer3, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor3
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', color: textColor3, fontWeight: fontWeightStyle3, fontSize: 14, padding: 8 }}>
                                {this.props.exam.currentQuestion ? this.props.exam.currentQuestion.question.answer3.answer : ''}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <SafeAreaView style={styles.bottom}>
                        <View style={styles.linearLayout}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toogleModal()}>
                                <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                    Optionen
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1,
                                backgroundColor: 'rgba(255,255,255, 0.0)',
                                borderColor: '#fff4',
                                marginTop: 12,
                                alignItems: "center",
                                marginLeft: 12,
                                borderWidth: 2,
                                paddingLeft: 24,
                                paddingRight: 24
                            }} onPress={() => this.state.check ? this.checkAnswers() : {}}>
                                <Text style={{ color: this.state.check ? '#fff' : '#fff6', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                    Weiter
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <PopupBottom ref={'popupBottom'} navigation={this.props.navigation}
                        sectionText={this.props.exam.currentQuestion ? `${this.props.exam.currentQuestion.moduleId.replace("_", "\.")} ${this.props.modules.selectedSubmoduleName}` : ''}
                        questionNumberText={this.props.exam.currentQuestion ? `Frage ${this.props.exam.currentQuestion.questionId.substr(4)} / ${Object.keys(new QuestionService().questionStore.getQuestionInfosByModuleId(this.props.exam.currentQuestion.moduleId)).length}` : ''} >
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
    }
});

const mapDispatchToProps = {
    dispatchGetNextQuestion: getNextExamQuestionAction,
    dispatchAnswerQuestion: answerExamQuestionAction,
    dispatchFinishExam: finishExamAction
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScene);
