import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image } from 'react-native';
import { MainHeader, Category, PopupCenter, StatisticView, ScrollViewPadding } from './common';
import { signOutAction, SetCurrentModuleAction, initExamAction, GotModulesAction, getPreviousExams } from "core";
import { connect } from "react-redux";
import { Fonts } from '../utils/Fonts';

const mainHeaderText = (
    <Text style={{ fontSize: 26, textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20, fontFamily: Fonts.RobotoSlabBold }}>
        Übungsbereiche
    </Text>
)

const icOptions = require('../img/ic_options.png')
const icBack = require('../img/ic_back.png')

/**
 * Prop types
 * @typedef {Object} Props
 * @property {number} falseQuestions
 * @property {number} rightQuestions
 * @property {number} count
 * @property {number} percentageRight
 * @property {{ [timestamp:string]:{ falseQuestions: number, rightQuestions: number, percentageRight: number, count: number, exam:{ [key:string]:{ count: number, falseQuestions: number, percentageRight: number, rightQuestions: number } } } }} exams
 */
/**
 * @augments React.Component<{prevExams: Props}, {}>
 */

class HomeScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testMode: false,
            icon: icOptions,
            categories: []
        };
    }

    initialized = false;
    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            if (this.initialized && Object.keys(this.props.modules).length > 0) {
                var mods = this.props.modules;
                this.props.dispatchUpdateModules(mods);
                this.props.dispatchUpdateExams();
            }
        });
    }

    testButtonPress() {
        this.initialized = true;
        if (this.state.testMode == false) {
            this.setState({
                testMode: !this.state.testMode,
                icon: icBack
            });
        } else if (this.state.testMode == true) {
            var mids = []
            Object.keys(this.state.categories).forEach(key => { if (this.state.categories[key].isPressed) mids.push(key); });
            if (mids.length == 0)
                return;
            this.props.dispatchStartExam(mids);
        }
    }

    optionsPress() {
        this.initialized = true;
        if (this.state.testMode == false) {
            //No Test Mode
            this.refs.popupCenter.showAddModal();
        } else if (this.state.testMode == true) {
            //Test Mode activated
            var cats = this.state.categories;
            Object.keys(cats).forEach(key => cats[key].isPressed = false);
            this.setState({
                categories: {
                    ...cats
                }
            });
            this.setState({
                testMode: !this.state.testMode,
                icon: icOptions
            });
        }
    }

    categoryPress(sectionID) {
        this.initialized = true;
        if (this.state.testMode == false) {
            this.props.dispatchSelectCategory(sectionID);
        } else {
            var cat = this.state.categories[sectionID] || {};
            cat.isPressed = !cat || !cat.isPressed;
            this.setState({
                categories: {
                    ...this.state.categories, [sectionID]: cat
                }
            });
        }
    }

    render() {
        const { testMode } = this.state;
        const btnText = testMode ? "Prüfung starten" : "Prüfung auswählen";
        const background = testMode ? "#fff0" : "#fff"
        var testModus = false;

        let erfolgsChanceView;

        if (testMode == true) {
            erfolgsChanceView = null;
            testModus = true;
        } else {
            testModus = false;
        }

        return (
            <View style={{ flex: 1, alignItems: "stretch", backgroundColor: "#fff" }}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#003A65"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <MainHeader
                    text={btnText}
                    style={{ backgroundColor: "#94C231", flexDirection: 'row-reverse', alignItems: 'center' }}
                    style2={{ backgroundColor: "#fff0", height: 0, width: 0, marginLeft: -8 }}
                    onPressButton={() => this.testButtonPress()}
                    optionsPress={() => this.optionsPress()}
                    children={mainHeaderText}
                    children2={<Image style={{ height: 40, width: 40 }} source={this.state.icon} />}
                />
                <ScrollViewPadding padding={12}>
                    <StatisticView onPress={() => { this.props.navigation.navigate('statistics') }} learningState={this.props.prevExams.percentageRight}/>
                    {Object.keys(this.props.modules).map((sectionID) =>
                        <Category
                            key={sectionID}
                            onPress={this.categoryPress.bind(this, sectionID)}
                            isPressed={(this.state.categories[sectionID] || {}).isPressed}
                            testMode={this.state.testMode}
                            erfolgText={<Text style={{ fontSize: 13, margin: 3, color: background, fontFamily: Fonts.RobotoSlab }}>Erfolgschance</Text>}
                            imageUri={{ uri: this.props.modules[sectionID].image || "" }}
                            titleText={this.props.modules[sectionID].name || ""}
                            questionsRight={this.props.modules[sectionID].seenQuestions || 0}
                            questionsFalse={this.props.modules[sectionID].falseQuestions || 0}
                            learningState={(this.props.modules[sectionID].seenQuestions || 0) / (this.props.modules[sectionID].questionCount || 1)}
                            successRate={this.props.modules[sectionID].successRate || 0}
                        />
                    )}
                </ScrollViewPadding>
                <PopupCenter ref={'popupCenter'} logOut={() => { this.props.dispatchLogOut(); }} impressum={() => { this.props.navigation.navigate('impressum'); }} />
            </View>
        );
    }
}

const mapDispatchToProps = {
    dispatchLogOut: signOutAction,
    dispatchSelectCategory: SetCurrentModuleAction,
    dispatchStartExam: initExamAction,
    dispatchUpdateModules: GotModulesAction,
    dispatchUpdateExams: getPreviousExams
};

const mapStateToProps = state => ({
    modules: state.modules.modules,
    prevExams: state.userdata
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
