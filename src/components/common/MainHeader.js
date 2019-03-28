import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

//Make a Component
const MainHeader = (props) => {
    return (
        <View style={styles.viewStyle}>
            <View style={styles.linearLayout}>
                {props.children}
                <Image style={styles.logoStyle} source={require('../../img/logo_ovb_white.png')} />
            </View>
            <View style={[styles.linearLayout2, props.style]}>
                <TouchableOpacity onPress={props.onPressButton}>
                    <View
                        children={props.buttonText}
                        style={styles.buttonStyle}>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.optionsPress}>
                    <View style={styles.optionsViewStyle}>
                        <Image style={styles.settingsImageStyle} source={require('../../img/ic_options.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: 'center',
        backgroundColor: '#003A65',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        elevation: 6
    },
    optionsViewStyle: {
        width: 42,
        height: 42,
        marginRight: 8,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    linearLayout: {
        marginTop: 12,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    linearLayout2: {
        backgroundColor: "#00B7E5",
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoStyle: {
        resizeMode: 'contain',
        marginRight: 12,
        height: 56,
        width: 56
    },
    settingsImageStyle: {
        width: 40,
        height: 40,
    },
    buttonStyle: {
        backgroundColor: "#fff3",
        width: 255,
        height: 42,
        justifyContent: "center",
        marginLeft: 8,
        marginRight: 20,
        paddingLeft: 8,
        paddingRight: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        elevation: 6
    }
});
//Make the component available to other parts of the app
export { MainHeader };
