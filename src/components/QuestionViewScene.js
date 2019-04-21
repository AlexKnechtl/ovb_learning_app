//@ts-check

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { PopupBottom } from './common';
import { updateCurrentQuestion, getNextQuestionAction, MultipleChoiceQuestionInteractor, QuestionService } from 'core';
import { Fonts } from '../utils/Fonts';

class QuestionViewScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        currentQuestion: undefined,
        questions: [],
        currentIndex: 0
    }
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
        this.state.questions = new QuestionService().questionStore.getQuestionInfosByModuleId(props.modules.selectedSubmodule);
        this.state.currentIndex = 0;
        this.state.currentQuestion = this.state.questions[0];
    }

    toogleModal() {
        this.refs.popupBottom.showAddModal();
    }

    GetPrevQuestion() {
        this.setState({ currentQuestion: this.state.questions[this.state.currentIndex - 1], currentIndex: this.state.currentIndex - 1 });
    }

    GetNextQuestion() {
        this.setState({ currentQuestion: this.state.questions[this.state.currentIndex + 1], currentIndex: this.state.currentIndex + 1 });
    }

    render() {
        const currQuestion = this.state.currentQuestion;
        const answer1Clicked = !currQuestion.question.answer1.isRight;
        const answer2Clicked = !currQuestion.question.answer2.isRight;
        const answer3Clicked = !currQuestion.question.answer3.isRight;

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

        var question = currQuestion.question.question;

        var a1 = currQuestion.question.answer1.answer;
        var a2 = currQuestion.question.answer2.answer;
        var a3 = currQuestion.question.answer3.answer;

        if(!canGetNextQuestion) {

        }

        var canGetNextQuestion = this.state.questions.length > this.state.currentIndex + 1;
        var cangetPrevQuestion = this.state.currentIndex > 0;

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
                            <Text style={{ flex: 1, alignSelf: 'center', color: textColor1, fontWeight: fontWeightStyle, fontFamily: Fonts.RobotoSlab, fontSize: 14, padding: 8 }}>
                                {a1}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer2, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor2
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', fontWeight: fontWeightStyle2, color: textColor2, fontFamily: Fonts.RobotoSlab, fontSize: 14, padding: 8 }}>
                                {a2}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row', minHeight: 90, alignItems: 'center', marginLeft: marginAnswer3, marginRight: 20, marginBottom: 16, backgroundColor: backgroundColor3
                            }}>
                            <Text style={{ flex: 1, alignSelf: 'center', color: textColor3, fontWeight: fontWeightStyle3, fontFamily: Fonts.RobotoSlab, fontSize: 14, padding: 8 }}>
                                {a3}
                            </Text>
                        </View>
                    </ScrollView>
                    <SafeAreaView style={styles.bottom}>
                        <View style={styles.linearLayout}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toogleModal()}>
                                <Text style={{ color: '#fff', fontSize: 20, fontFamily: Fonts.RobotoSlab, paddingTop: 10, paddingBottom: 10 }}>
                                    Optionen
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!cangetPrevQuestion} style={{
                                flex: 1,
                                backgroundColor: cangetPrevQuestion ? "#fff3" : "#fff1",
                                marginTop: 12,
                                alignItems: "center",
                                marginLeft: 12,
                                height: 48,
                                justifyContent: "center",
                            }} onPress={() => this.GetPrevQuestion()}>
                                <Image style={styles.backButton} source={require('../img/ic_back.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!canGetNextQuestion}
                                style={{
                                    flex: 1,
                                    backgroundColor: canGetNextQuestion ? "#fff3" : "#fff1",
                                    marginTop: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: 12,
                                    height: 48,
                                }} onPress={() => this.GetNextQuestion()}>
                                <Image style={styles.forwardButton} source={require('../img/ic_back.png')} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <PopupBottom ref={'popupBottom'} navigation={this.props.navigation}
                        sectionText={this.props.modules ? `${currQuestion.moduleId.replace("_", "\.")} ${this.props.modules.selectedSubmoduleName}` : ''}
                        questionNumberText={`Frage ${currQuestion.questionId.substr(4)} / ${this.state.questions.length}`} >
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
        backgroundColor: '#fff1',
        height: 48,
        marginTop: 12,
        paddingLeft: 24,
        justifyContent: "center",
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
        fontFamily: Fonts.RobotoSlab,
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
        fontFamily: Fonts.RobotoSlab,
        marginTop: 10,
        marginLeft: 20,
        fontWeight: "bold",
        color: '#003A65'
    },
    questionText: {
        fontSize: 17,
        fontFamily: Fonts.RobotoSlab,
        color: '#003A65',
        marginLeft: 18,
        marginRight: 12,
        marginTop: 4
    },
    answerHeaderText: {
        fontSize: 28,
        fontFamily: Fonts.RobotoSlab,
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
        transform: [{ rotate: '180deg' }]
    },
});

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionViewScene);