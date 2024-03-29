//@ts-check

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text, Image } from 'react-native';
import { MainHeader, SubCategory, PopupCenter, ScrollViewPadding } from './common';
import { connect } from "react-redux";
import { SelectSubmoduleAction, setLearningModeAction, LearningAlgorithm, QuestionService, LearningService, continueSectionLearningAction, signOutAction } from 'core';
import { Fonts } from '../utils/Fonts';

const btnText = (
    <Text style={{ alignSelf: 'center', fontFamily: Fonts.RobotoSlabBold, color: '#fff', fontSize: 18 }}>
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
                <Text style={{ fontSize: 22, fontFamily: Fonts.RobotoSlabBold, textAlign: "left", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 16 }}>
                    Kategorien
                </Text>
                <Text style={{ fontSize: 16, fontFamily: Fonts.RobotoSlab, textAlignVertical: 'bottom', textAlign: "left", color: '#fff', marginLeft: 16 }}>
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
                    style2={{ backgroundColor: "#fff0", height: 0, width: 0, marginLeft: -8 }}
                    children2={<Image style={{ height: 40, width: 40 }} source={require('../img/ic_options.png')} />}
                    optionsPress={() => this.toogleModal()}
                    onPressButton={() => { this.continueSectionLearningPress(); }}
                />
                <ScrollViewPadding padding={12}>
                        {this.mapModules()}
                </ScrollViewPadding>
                <PopupCenter ref={'popupCenter'} logOut={() => { this.props.dispatchLogOut(); }} impressum={() => { this.props.navigation.navigate('impressum'); }} />
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
        backgroundColor: '#ffffff',
        paddingVertical: 12
    },
});

const mapDispatchToProps = {
    dispatchLogOut: signOutAction,
    dispatchSelectSubmodule: SelectSubmoduleAction,
    dispatchSelectLearningMode: setLearningModeAction,
    dispatchContinueSectionLearning: continueSectionLearningAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScene);