import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { PopupBottom } from './common';
import { updateCurrentQuestion, getNextQuestionAction, MultipleChoiceQuestionInteractor } from 'core';

class QuestionScene extends Component {
    state = {
        answer1Clicked: false,
        answer2Clicked: false,
        answer3Clicked: false
    }

    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    answer1Click() {
        this.setState({ answer1Clicked: false });
        this.setState({ answer2Clicked: true });
        this.setState({ answer3Clicked: true });
        this.props.currentQuestion.question.answer1.choosen = true;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = false;
    }

    answer2Click() {
        this.setState({ answer2Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer3Clicked: true });
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = true;
        this.props.currentQuestion.question.answer3.choosen = false;
    }

    answer3Click() {
        this.setState({ answer3Clicked: false });
        this.setState({ answer1Clicked: true });
        this.setState({ answer2Clicked: true });
        this.props.currentQuestion.question.answer1.choosen = false;
        this.props.currentQuestion.question.answer2.choosen = false;
        this.props.currentQuestion.question.answer3.choosen = true;
    }

    toogleModal() {
        this.refs.popupBottom.showAddModal();
        var q = this.props.currentQuestion.question;
        var isright = new MultipleChoiceQuestionInteractor().checkIsQuestionRight(this.props.currentQuestion.question);
        console.log(isright);
        // var answeredRight = this.state.answer1Clicked == q.answer1.isRight && this.state.answer2Clicked == q.answer2.isRight && this.state.answer3Clicked == q.answer3.isRight;
        this.props.dispatchUpdateQuestion({questionid: this.props.currentQuestion.questionId, answeredRight: isright});
        this.props.dispatchGetNextQuestion();
        this.setState({ answer3Clicked: true });
        this.setState({ answer1Clicked: true });
        this.setState({ answer2Clicked: true });
    }

    render() {
        if (!this.props.currentQuestion) this.props.dispatchGetNextQuestion();
        console.log(this.props.currentQuestion);
        // console.log(this.props.currentQuestion.question);
        // console.log(this.props.currentQuestion.question.question);

        const { answer1Clicked, answer2Clicked, answer3Clicked } = this.state;

        const background1 = answer1Clicked ? "#fff9" : "white";
        const background2 = answer2Clicked ? "#fff9" : "white";
        const background3 = answer3Clicked ? "#fff9" : "white";
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <SafeAreaView>
                    <View style={{ height: 180 }}>
                        <Text style={styles.questionTextHeader}>
                            {this.props.currentQuestion ? `${this.props.currentQuestion.sectionId}.${this.props.currentQuestion.moduleId} Frage ${this.props.currentQuestion.questionId.substr(4)}`: ''}
                            </Text>
                        <Text style={styles.questionText}>
                            {this.props.currentQuestion ? this.props.currentQuestion.question.question:''}
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
                    <TouchableOpacity
                        onPress={this.answer1Click.bind(this)}
                        style={{
                            flexDirection: 'row', minHeight: 90, alignItems: 'center', marginHorizontal: 20, marginTop: 20, backgroundColor: background1
                        }}>
                        <Text style={{ flex: 1, alignSelf: 'center', color: "#003A65", fontSize: 14, padding: 8 }}>
                            {this.props.currentQuestion ? this.props.currentQuestion.question.answer1.answer:''}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.answer2Click.bind(this)}
                        style={{
                            flexDirection: 'row', minHeight: 90, alignItems: 'center', marginHorizontal: 20, marginTop: 20, backgroundColor: background2
                        }}>
                        <Text style={{ flex: 1, alignSelf: 'center', color: "#003A65", fontSize: 14, padding: 8 }}>
                        {this.props.currentQuestion ? this.props.currentQuestion.question.answer2.answer : ''}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.answer3Click.bind(this)}
                        style={{
                            flexDirection: 'row', minHeight: 90, alignItems: 'center', marginHorizontal: 20, marginTop: 20, backgroundColor: background3
                        }}>
                        <Text style={{ flex: 1, alignSelf: 'center', color: "#003A65", fontSize: 14, padding: 8 }}>
                        {this.props.currentQuestion ?this.props.currentQuestion.question.answer3.answer:''}
                        </Text>
                    </TouchableOpacity>
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
                            }} onPress={() => this.toogleModal()}>
                                <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                    Weiter
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PopupBottom ref={'popupBottom'} >

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
        backgroundColor: '#304C59'
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
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScene);
