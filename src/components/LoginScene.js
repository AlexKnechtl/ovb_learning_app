import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard, StyleSheet, Image, StatusBar, SafeAreaView, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Input, Button } from './common';
import { signInAction } from 'core';
import { Fonts } from '../utils/Fonts';

const mailIcon = (<Image style={{ width: 28, height: 28 }} source={require('../img/ic_mail.png')} />)
const lockIcon = (<Image style={{ width: 28, height: 28 }} source={require('../img/ic_password.png')} />)

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

const buttonText = (
    <Text style={{ alignSelf: 'center', color: '#315C3D', fontSize: 22, fontFamily: Fonts.RobotoSlabBold }}>
        Anmelden
    </Text>
)

class LoginScene extends Component {
    state = {
        email: "",
        password: ""
    };

    onEmailChange(text) {
        this.setState({ email: text });
    }

    onPasswordChange(text) {
        this.setState({ password: text });
    }

    onButtonPress() {
        this.props.loginUser(this.state);
    }

    renderError() {
        if (this.props.error && this.props.error != "") {
            return (
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
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
                            Learning Suite
                        </Text>
                        <View style={{ marginTop: 42 }}>
                            <Input
                                children={mailIcon}
                                placeholderText="E-Mail"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.state.email}
                            />
                            <Input
                                children={lockIcon}
                                secureTextEntry
                                placeholderText="Passwort"
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.state.password}
                            />
                            <Button children={buttonText}
                                onPress={this.onButtonPress.bind(this)}>
                            </Button>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("forgotPassword")}>
                                <Text style={styles.passwordForgotText}>Passwort vergessen?</Text>
                            </TouchableOpacity>
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
        marginTop: 12,
        textAlign: "center",
        fontFamily: Fonts.RobotoSlab,
        alignSelf: 'center',
        color: 'red'
    },
    headerText: {
        color: '#fff',
        fontSize: 36,
        fontFamily: Fonts.RobotoSlabBold,
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
        fontFamily: Fonts.RobotoSlab,
        fontSize: 16,
        alignSelf: "center",
        marginTop: 12
    },
    logoSmall: {
        resizeMode: "contain",
        width: 32,
        height: '6%',
        marginRight: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene); 
