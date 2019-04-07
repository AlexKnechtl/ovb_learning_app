import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, StatusBar, View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { MainHeader } from './common';
import { Actions } from 'react-native-router-flux';
import { ActionButton, PopupCenter } from './common';
import { connect } from "react-redux";
import { setLearningModeAction } from "core";

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

const mainHeaderText = (
    <View>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
            Kategorien
        </Text>
        <Text style={{ fontSize: 18, textAlignVertical: 'bottom', color: '#fff4', marginLeft: 20 }}>
            Allgemeine Rechtskunde
        </Text>
    </View>
)

class CategoryInfoScene extends Component {
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        Actions.category();
        return true;
    }

    render() {
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
                    onPressButton={() => this.startLearning()}
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
                                <Progress.Bar progress={0.72} height={32.4} width={0} style={{ width: "82%" }} color={'#58D980'} unfilledColor='rgba(0, 58, 101, 0.2)' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>72%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.statisticTextStyle}>
                                Erfolgschance
                            </Text>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: "row" }}>
                                <Progress.Bar progress={0.36} height={32.4} width={0} style={{ width: "82%" }} color={'#58ACD9'} unfilledColor='#DEEBE1' borderWidth={0} borderRadius={0} />
                                <Text style={styles.percentTextStyle}>36%</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, marginRight: 20, marginLeft: 20, height: 45, backgroundColor: "#003A65", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                                86/102 Fragen richtig beantwortet
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 6, marginBottom: 16, fontWeight: "bold", color: "#003A65", width: '100%', textAlign: "center" }}>
                            14 Fragen richtig beatnwortet
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
                            alert("comming soon");
                        }}>
                            Falsche Fragen üben
                        </ActionButton>
                        <ActionButton image={icon_watch_questions} onPress={() => {
                            // Actions.question();
                            alert("comming soon");
                        }}>
                            Fragen druchblättern
                        </ActionButton>
                        <ActionButton image={icon_pdf} onPress={() => {
                            // Actions.question();
                            alert("comming soon");
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
    startLearning() {
        this.props.dispatchSelectLearningMode('module');
        Actions.question();
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
    dispatchSelectLearningMode: setLearningModeAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInfoScene);