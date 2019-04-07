//@ts-check

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, BackHandler, View, Text, Image } from 'react-native';
import { MainHeader, SubCategory, PopupCenter } from './common';
import { connect } from "react-redux";
import { SelectSubmoduleAction, setLearningModeAction } from  'core';
import { Actions } from 'react-native-router-flux';

const btnText = (
    <Text style={{ alignSelf: 'center', fontWeight: "bold", color: '#fff', fontSize: 18 }}>
        Lernvorgang fortsetzen
    </Text>
)

const mainHeaderText = (
    <View>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "left", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 16 }}>
            Kategorien
        </Text>
        <Text style={{ fontSize: 16, textAlignVertical: 'bottom', textAlign: "left", color: '#fff', marginLeft: 16}}>
            Allgemeine Rechtskunde
        </Text>
    </View>
)

// const picture1 = require("../img/wk_allgemeinesrecht_bg.jpg")
// const picture2 = require("../img/wk_sachversicherungen_bg.jpg")

class CategoryScene extends Component {
    constructor(props) {
        super(props);
        this.toogleModal = this.toogleModal.bind(this);
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    mapModules(){
        var currMID = this.props.modules.currentModuleID;
        if(!currMID) return undefined;
        var currMods = this.props.modules.modules[currMID].modules;
        return Object.keys(currMods).map(key => <SubCategory key={key} onPress={() => this.props.dispatchSelectSubmodule(key, currMods[key].name)} titleText={`${key.replace('_', '.')} ${currMods[key].name}`}/>);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        Actions.home();
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
                    buttonText={btnText}
                    children={mainHeaderText}
                    children2={<Image style={{ height: 40, width: 40 }} source={require('../img/ic_options.png')} />}
                    optionsPress={() => this.toogleModal()}
                    onPressButton={() => {this.props.dispatchSelectLearningMode('section'); Actions.question();}}
                />
                <ScrollView
                    style={styles.containerStyle}
                    resizeMode='cover'>
                    <SafeAreaView>
                        {this.mapModules()}
                        {/* <SubCategory imageUri={picture1} titleText="1.1 Allgemeine Rechtskunde" />
                        <SubCategory imageUri={picture2} titleText="1.2 Sachversicherungen" /> */}
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'}>

                </PopupCenter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingTop: 12,
        backgroundColor: '#ffffff'
    },
});

const mapDispatchToProps = {
    dispatchSelectSubmodule: SelectSubmoduleAction,
    dispatchSelectLearningMode: setLearningModeAction
};

const mapStateToProps = state => ({
    modules: state.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScene);