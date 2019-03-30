import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, ImageBackground, View, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { signInWithoutPasswordAction } from 'core';


class LoadingScene extends Component {
    render() {
        return (
            <ImageBackground
                style={styles.containerStyle}
                source={require('../img/bg_ovb.png')}
                resizeMode='cover'>
                <SafeAreaView style={{ }}>
                    <StatusBar
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <SafeAreaView style={{ alignItems: "center", flex: 1 }} >
                    <Image style={styles.logoBig} source={require('../img/logo_ovb_white.png')} />
                    <Text style={styles.headerText}>
                        Learning Suite
                    </Text>
                    <View style={{ marginTop: 32 }}>
                    </View>
                    <View style={styles.bottom}>
                        <View style= {styles.linearLayout}>
                            <Image style={styles.logoSmall} source={require('../img/seek_innovation_logo.png')} />
                            <Text style={styles.smallHeaderText}>
                                Powered by SeekInnovation
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    logoLayoutStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginTop: 18,
        flexDirection: "row",
    },
    headerText: {
        color: '#fff',
        fontSize: 38,
        marginTop: 48,
        alignSelf: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 16
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
        fontWeight: "bold",
        marginTop: 18,
        alignSelf: "center"
    },
    logoSmall: {
        resizeMode: "contain",
        width: 48,
        height: 48,
        marginTop: 32
    },
    logoBig: {
        marginTop: 100,
        resizeMode: "contain",
        height: 194,
        width: 194
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    loading: state.auth.loading,
});

const mapDispatchToProps = {
    DispatchSignIn: signInWithoutPasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScene);