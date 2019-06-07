//@ts-check

import React, { Component, useState } from 'react'

import { View } from 'react-native';
import { StatisticsCategory, ExamView } from '.';


class ExamStatistic extends Component {
    state = {
        detail: false
    }
    toggleDetail = () => this.setState(s => ({ detail: !s.detail }));
    render() {
        const { exam, modules } = this.props;
        const { detail } = this.state;
        return (
            <View>
                <ExamView
                    titleText="Prüfung"
                    questionsFalse={exam.falseQuestions}
                    questionsRight={exam.rightQuestions}
                    success={exam.percentageRight >= 0.6}
                    buttonText={detail ? "Weniger" : "Details"}
                    learningState={exam.percentageRight}
                    imageUri=""
                    onPress={this.toggleDetail} />

                {detail && Object.keys(exam.exam).map(mid =>
                    <StatisticsCategory
                        key={mid}
                        hideButton
                        titleText={modules[mid].name}
                        questionsFalse={exam.exam[mid].falseQuestions}
                        questionsRight={exam.exam[mid].rightQuestions}
                        success={exam.exam[mid].percentageRight >= 0.6}
                        buttonText="Details"
                        learningState={exam.exam[mid].percentageRight}
                        imageUri={modules[mid].image}
                        onPress={() => null} />)}
            </View>
        );
    }
}

export { ExamStatistic };