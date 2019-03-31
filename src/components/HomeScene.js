import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text, Image } from 'react-native';
import { MainHeader, Category, PopupCenter } from './common';
import { signOutAction } from "core";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

const mainHeaderText = (
    <Text style={{ fontSize: 26, fontWeight: "bold", textAlignVertical: 'bottom', color: '#ffffff', marginLeft: 20 }}>
        Übungsbereiche
    </Text>
)

const icOptions = require('../img/ic_options.png')
const icBack = require('../img/ic_back.png')

class HomeScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testMode: false,
            icon: icOptions
        };
    }

    testButtonPress() {
        if (this.state.testMode == false) {
            this.setState({
                testMode: !this.state.testMode,
                icon: icBack
            });
        } else if (this.state.testMode == true) {

        }
    }

    optionsPress() {
        if (this.state.testMode == false) {
            this.refs.popupCenter.showAddModal();
        } else if (this.state.testMode == true) {
            this.setState({
                testMode: !this.state.testMode,
                icon: icOptions
            });
        }
    }

    categoryPress(i) {
        if (this.state.testMode == false) {
            console.log(i);
            Actions.main();
        } else {
            console.log(i);
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
            //erfolgsChanceView = <Text style={styles.chanceTextStyle}>30%</Text>;
        }

        return (
            <View style={{ flex: 1, alignItems: "stretch" }}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#304C59"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <MainHeader
                    text={btnText}
                    style2={{ backgroundColor: "#fff0", height: 0, width: 0, marginLeft: -8 }}
                    onPressButton={() => this.testButtonPress()}
                    optionsPress={() => this.optionsPress()}
                    children={mainHeaderText}
                    children2={<Image style={{ height: 40, width: 40 }} source={this.state.icon} />}
                />
                <ScrollView
                    style={styles.containerStyle}
                    resizeMode='cover'>
                    <SafeAreaView>
                        {this.props.modules.map((module) =>
                            <Category
                                key={module.title}
                                ref={(thisItem) => this[module.title] = thisItem}
                                onPress={this.categoryPress.bind(this, module.title)}
                                isPressed={this.state}
                                erfolgText={<Text style={{ fontSize: 14, margin: 3, color: background }}>Erfolgschance</Text>}
                                imageUri={{ uri: module.imageUrl }}
                                titleText={module.title}
                            />
                        )}
                    </SafeAreaView>
                </ScrollView>
                <PopupCenter ref={'popupCenter'} logOut={() => { this.props.dispatchLogOut(); }} />
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
