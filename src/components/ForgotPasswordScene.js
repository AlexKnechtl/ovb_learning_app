//@ts-check

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard, StyleSheet, Image, StatusBar, SafeAreaView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Input, Button, InfoPopup } from './common';
import { signInAction, AuthInteractor, AuthService } from 'core';
import { Fonts } from '../utils/Fonts';

const mailIcon = (<Image style={{ width: 28, height: 28 }} source={require('../img/ic_mail.png')} />)

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

const buttonText = (
    <Text style={{ alignSelf: 'center', color: '#315C3D', fontSize: 22, fontFamily: Fonts.RobotoSlabBold }}>
        E-Mail anfordern
    </Text>
)

class ForgotPasswordScene extends Component {
    state = {
        email: "",
        error: "",
        emailSent: false
    };

    authenticator = new AuthInteractor(new AuthService());

    onEmailChange(text) {
        this.setState({ email: text });
    }

    closeModal() {
        this.refs.popupInfo && this.refs.popupInfo.closeModal();
    }

    onButtonPress() {
        this.authenticator.resetPassword(this.state.email.trim()).then(({ emailSent, error }) => {
            this.setState({ emailSent, error });
        });
    }

    renderError() {
        if (this.state.error && this.state.error != "") {
            return (
                <View style={{ marginTop: 8 }} >
                    <Text style={styles.errorTextStyle}>
                        E-Mail ist nicht im System.
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <ImageBackground
                style={styles.containerStyle}
                source={require('../img/bg2.png')}
                resizeMode='cover'>
                <SafeAreaView style={{ backgroundColor: "#fff0" }}>
                    <StatusBar
                        backgroundColor="#154A38"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <DismissKeyboard>
                    <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
                        <Image style={styles.logoBig} source={require('../img/logo_ovb_white.png')} />
                        <Text style={styles.headerText}>
                            Passwort zurücksetzen
                        </Text>
                        <View style={{ marginTop: 14 }}>
                            <Text style={styles.infoText}>
                                Tippe hier deine E-Mail Adresse ein um dein Learning Suite Passwort zurückzusetzen.
                            </Text>
                            <Input children={mailIcon} placeholderText="E-Mail" onChangeText={this.onEmailChange.bind(this)} value={this.state.email} />
                            <Button children={buttonText} onPress={this.onButtonPress.bind(this)}>
                            </Button>
                        </View>
                        <KeyboardSpacer />
                        {this.renderError()}
                        <View style={styles.bottom}>
                        </View>
                        <View style={styles.linearLayout}>
                            <Image style={styles.logoSmall} source={require('../img/seek_innovation_logo.png')} />
                            <Text style={styles.smallHeaderText}>
                                Powered by SeekInnovation
                             </Text>
                        </View>
                    </SafeAreaView>
                </DismissKeyboard>
                <InfoPopup ref={'popupInfo'} modalVisible={this.state.emailSent} onButtonPress={() => { this.closeModal(); this.props.navigation.goBack(); }} />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    errorTextStyle: {
        fontSize: 20,
        fontFamily: Fonts.RobotoSlab,
        alignSelf: 'center',
        color: 'red'
    },
    infoText: {
        color: '#fff',
        textAlign: 'center',
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 28
    },
    headerText: {
        color: '#fff',
        textAlign: "center",
        fontSize: 38,
        marginTop: 12,
        fontFamily: Fonts.RobotoSlab,
        alignSelf: 'center'
    },
    rectangleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        paddingLeft: 12,
        flexDirection: "row",
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 2,
        borderColor: '#fff4'
    },
    logoBig: {
        marginTop: '10%',
        marginBottom: 12,
        resizeMode: "contain",
        height: '22%',
        width: 180
    },
    passwordForgotText: {
        textDecorationLine: "underline",
        color: '#fff',
        fontSize: 20,
        alignSelf: "center",
        marginBottom: 24
    },
    iconStyle: {
        height: 28,
        width: 28
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    linearLayout: {
        marginTop: 12,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
    },
    smallHeaderText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: Fonts.RobotoSlabBold,
        marginTop: 8,
        marginBottom: 4,
        alignSelf: "center"
    },
    logoSmall: {
        resizeMode: "contain",
        width: 42,
        height: 42
    }
});

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading
});

const mapDispatchToProps = {
    loginUser: signInAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScene); 
