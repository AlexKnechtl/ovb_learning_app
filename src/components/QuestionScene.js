import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { PopupBottom } from './common';
import { updateCurrentQuestion, getNextQuestionAction, MultipleChoiceQuestionInteractor, QuestionService } from 'core';

class QuestionScene extends Component {
    state = {
        answer1Clicked: true,
        answer2Clicked: true,
        answer3Clicked: true,
        check: false,
        lastAnswerRight: undefined
    }
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    checkAnswers() {
        this.setState({ check: !this.state.check });
        if (!this.state.check) {
            var q = this.props.currentQuestion.question;
            var isright = new MultipleChoiceQuestionInteractor().checkIsQuestionRight(this.props.currentQuestion.question);
            this.setState({ lastAnswerRight: isright });
            console.log(isright);
            // var answeredRight = this.state.answer1Clicked == q.answer1.isRight && this.state.answer2Clicked == q.answer2.isRight && this.state.answer3Clicked == q.answer3.isRight;
            this.props.dispatchUpdateQuestion({ questionid: this.props.currentQuestion.questionId, answeredRight: isright });
        } else {
            this.props.dispatchGetNextQuestion();
            this.setState({ answer3Clicked: true });
            this.setState({ answer1Clicked: true });
            this.setState({ answer2Clicked: true });
        }
    }

    answer1Click() {
        if (this.state.check) return;
        this.setState({ answer1Clicked: false });
        this.setState({ answer2Clicked: true });
        this.setState({ answer3Clicked: true });
        this.props.currentQuestion.question.answer1.choosen = true;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers();
    }

    answer2Click() {
        if (this.state.check) return;
        this.setState({ answer2Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer3Clicked: true });
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = true;
        this.props.currentQuestion.question.answer3.choosen = false;
        this.checkAnswers();
    }

    answer3Click() {
        if (this.state.check) return;
        this.setState({ answer3Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer2Clicked: true });
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = true;
        this.checkAnswers();
    }

    toogleModal() {
        this.refs.popupBottom.showAddModal();
    }

    render() {
        if (!this.props.currentQuestion) this.props.dispatchGetNextQuestion();
        console.log(this.props.currentQuestion);
        // console.log(this.props.currentQuestion.question);
        // console.log(this.props.currentQuestion.question.question);

        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const background1 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer1.isRight ? '#44E677' : '#F44B4B' : answer1Clicked ? "white" : "white";
        const background2 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer2.isRight ? '#44E677' : '#F44B4B' : answer2Clicked ? "white" : "white";
        const background3 = this.state.check ? this.props.currentQuestion && this.props.currentQuestion.question.answer3.isRight ? '#44E677' : '#F44B4B' : answer3Clicked ? "white" : "white";

        const borderColor1 = answer1Clicked ? "#fff0" : "#fff";
        const borderColor2 = answer2Clicked ? "#fff0" : "#fff";
        const borderColor3 = answer3Clicked ? "#fff0" : "#fff";

        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <SafeAreaView>
                    <View style={{ height: 180 }}>
                        <Text style={styles.questionTextHeader}>
                            {this.props.currentQuestion ? `${this.props.currentQuestion.moduleId.replace("_", "\.")} Frage ${this.props.currentQuestion.questionId.substr(4)}`: ''}
                            </Text>
                        <Text style={styles.questionText}>
                            {this.props.currentQuestion ? this.props.currentQuestion.question.question : ''}
                            {this.props.currentQuestion && __DEV__ ? `\nAntwort Nummer ${this.props.currentQuestion.question.answer1.isRight ? '1' : this.props.currentQuestion.question.answer2.isRight ? '2' : '3'} ist korrekt` : ''}
                        </Text>
                    </View>
                </SafeAreaView>

                <View style={styles.questionView}>
                    <View style={styles.lineColor} />
                    <View style={styles.linearLayout2}>
                        <Text style={styles.answerHeaderText}>
                            Antworten
                        </Text>
                        <Image style={styles.logoStyle} source={require('../img/logo_ovb_white.png')} />
                    </View>
                    <TouchableOpacity disabled={this.state.check}
                        onPress={this.answer1Click.bind(this)}
                        style={{
                            flexDirection: 'row', minHeight: 90, alignItems: 'center', marginHorizontal: 20, marginTop: 18, backgroundColor: background1, borderColor: borderColor1, borderWidth: 2
                        }}>
                        <Text style={{ flex: 1, alignSelf: 'center', color: "#003A65", fontSize: 14, padding: 8 }}>
                            {this.props.currentQuestion ? this.props.currentQuestion.question.answer1.answer : ''}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.check}
                        onPress={this.answer2Click.bind(this)}
                        style={{
                            flexDirection: 'row', minHeight: 90, alignItems: 'center', marginHorizontal: 20, marginTop: 18, backgroundColor: background2, borderColor: borderColor2, borderWidth: 2
                        }}>
                        <Text style={{ flex: 1, alignSelf: 'center', color: "#003A65", fontSize: 14, padding: 8 }}>
                            {this.props.currentQuestion ? this.props.currentQuestion.question.answer2.answer : ''}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.check}
                        onPress={this.answer3Click.bind(this)}
                        style={{
                            flexDirection: 'row', minHeight: 90, alignItems: 'center', marginHorizontal: 20, marginTop: 18, backgroundColor: background3, borderColor: borderColor3, borderWidth: 2
                        }}>
                        <Text style={{ flex: 1, alignSelf: 'center', color: "#003A65", fontSize: 14, padding: 8 }}>
                            {this.props.currentQuestion ? this.props.currentQuestion.question.answer3.answer : ''}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.answerTrueFalse}>
                        {this.state.check ? this.state.lastAnswerRight ? 'Anwort ist richtig' : 'Antwort ist falsch' : ''}
                    </Text>
                    <View style={styles.bottom}>
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
                            }} onPress={() => this.checkAnswers()}>
                                <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                    {this.state.check ? 'Weiter' : 'Check'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PopupBottom ref={'popupBottom'} 
                    sectionText={this.props.currentQuestion ? `${this.props.currentQuestion.moduleId.replace("_", "\.")} ${this.props.modules.selectedSubmoduleName}`: ''}
                    questionNumberText={this.props.currentQuestion ? `Frage ${this.props.currentQuestion.questionId.substr(4)} / ${Object.keys(new QuestionService().questionStore.getQuestionInfosByModuleId(this.props.currentQuestion.moduleId)).length}`: ''} >

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
        marginTop: 12,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    linearLayout2: {
        marginTop: 16,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    questionTextHeader: {
        fontSize: 30,
        marginTop: 12,
        marginLeft: 20,
        fontWeight: "bold",
        color: '#003A65'
    },
    questionText: {
        fontSize: 17,
        color: '#003A65',
        marginLeft: 18,
        marginRight: 12,
        marginTop: 6
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

// export default QuestionScene;

const mapDispatchToProps = {
    dispatchUpdateQuestion: updateCurrentQuestion,
    dispatchGetNextQuestion: getNextQuestionAction
};

const mapStateToProps = state => ({
    currentQuestion: state.learning.currentQuestion,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScene);
