import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text } from 'react-native';
import { MainHeader, Category, PopupCenter } from './common';
import { signOutAction } from "core";
import { connect } from "react-redux";

const btnText = (
    <Text style={{ alignSelf: 'center', fontWeight: "bold", color: '#fff', fontSize: 20, paddingTop: 8, paddingBottom: 10 }}>
        Prüfung starten
    </Text>)

const mainHeaderText = (
    <Text style={{ fontSize: 26, fontWeight: "bold", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
        Übungsbereiche
    </Text>
)

const picture1 = require("../img/wk_allgemeinesrecht_bg.jpg")
const picture2 = require("../img/wk_sachversicherungen_bg.jpg")

class HomeScene extends Component {
    constructor(props) {
        super(props);
        this.state = { testMode: false };
        this.toogleModal = this.toogleModal.bind(this);
    }

    toogleTestMode() {
        this.setState({
            testMode: !this.state.testMode
        });
        console.log('Test Mode value is now: ', this.state.testMode);
    }

    toogleModal() {
        this.refs.popupCenter.showAddModal();
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "stretch" }}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#304C59"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <MainHeader
                    style={{backgroundColor: "#94C231", flexDirection: 'row', padding: 8, alignItems: 'center', justifyContent: 'space-between'}}
                    onPressButton={() => this.toogleTestMode()}
                    optionsPress={() => this.toogleModal()}
                    buttonText={btnText}
                    children={mainHeaderText} />
                <ScrollView
                    style={styles.containerStyle}
                    resizeMode='cover'>
                    <SafeAreaView>
                        {this.props.modules.map((module) => <Category key={module.title} imageUri={{uri: module.imageUrl}} titleText={module.title} />)}
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'} logOut={()=> { this.props.dispatchLogOut(); }}>

                </PopupCenter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

const mapDispatchToProps = {
    dispatchLogOut: signOutAction,
};

const mapStateToProps = state => ({
    modules: state.modules.modules,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
