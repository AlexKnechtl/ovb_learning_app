import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text, Image, BackHandler } from 'react-native';
import { MainHeader, SubCategory, PopupCenter } from './common';
import { connect } from "react-redux";
import { SelectSubmoduleAction, setLearningModeAction, LearningAlgorithm, QuestionService, LearningService, continueSectionLearningAction } from 'core';

const btnText = (
    <Text style={{ alignSelf: 'center', fontWeight: "bold", color: '#fff', fontSize: 18 }}>
        Lernvorgang fortsetzen
    </Text>
)

const source2 = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

class CategoryScene extends Component {
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }
    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.forceUpdate();
        });
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    mapModules() {
        var currMID = this.props.modules.currentModuleID;
        if (!currMID) return undefined;
        var currMods = this.props.modules.modules[currMID].modules;
        var la = new LearningAlgorithm(new QuestionService(), LearningService);
        return Object.keys(currMods).map(key => {
            var stats = la.calcCurrentLearningStatsForModule(key);
            return (<SubCategory key={key}
                onPress={() => this.props.dispatchSelectSubmodule(key, currMods[key].name)}
                titleText={`${key.replace('_', '.')} ${currMods[key].name}`}
                learningState={stats.seenQuestions / stats.questionCount}
                successRate={stats.successRate}
            />);
        });
    }

    render() {
        const mainHeaderText = (
            <View>
                <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "left", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 16 }}>
                    Kategorien
                </Text>
                <Text style={{ fontSize: 16, textAlignVertical: 'bottom', textAlign: "left", color: '#fff', marginLeft: 16 }}>
                    {this.props.modules.modules[this.props.modules.currentModuleID].name}
                </Text>
            </View>
        )
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
                    buttonText={btnText}
                    children={mainHeaderText}
                    pdfPress={() => this.props.navigation.navigate('pdfScene')}
                    children2={<Image style={{ height: 40, width: 40 }} source={require('../img/ic_options.png')} />}
                    optionsPress={() => this.toogleModal()}
                    onPressButton={() => { this.continueSectionLearningPress(); }}
                />
                <ScrollView
                    style={styles.containerStyle}
                    resizeMode='cover'>
                    <SafeAreaView>
                        {this.mapModules()}
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'} />
            </View>
        );
    }

    continueSectionLearningPress() {
        this.props.dispatchContinueSectionLearning(this.props.modules.currentModuleID);
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
});

const mapDispatchToProps = {
    dispatchSelectSubmodule: SelectSubmoduleAction,
    dispatchSelectLearningMode: setLearningModeAction,
    dispatchContinueSectionLearning: continueSectionLearningAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScene);