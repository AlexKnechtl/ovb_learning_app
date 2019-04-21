import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const MainHeader = (props) => {
    return (
        <View style={styles.viewStyle}>
            <View style={styles.linearLayout}>
                {props.children}
                <Image style={styles.logoStyle} source={require('../../img/logo_ovb_white.png')} />
            </View>
            <View style={[styles.linearLayout2, props.style]}>
                <View style={styles.iconViewLayout}>
                    <TouchableOpacity hidden onPress={props.pdfPress}>
                        <View style={[styles.iconView, props.style2]}>
                            <Image style={[styles.pdfImageStyle, props.style2]} source={require('../../img/pdf_icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.optionsPress}>
                        <View style={styles.iconView}>
                            {props.children2}
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={props.onPressButton} style={styles.buttonStyle}>
                    <View >
                        <Text style={{ alignSelf: 'center', fontWeight: "bold", fontFamily: Fonts.RobotoSlab, color: '#fff', fontSize: 18 }}>
                            {props.text}
                        </Text>
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
    iconView: {
        width: 42,
        height: 42,
        marginLeft: 6,
        backgroundColor: "#fff3",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    iconViewLayout: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginRight: 14
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
        flexDirection: 'row-reverse',
        paddingTop: 8,
        paddingBottom: 8
    },
    logoStyle: {
        resizeMode: 'contain',
        marginRight: 12,
        height: 56,
        width: 56
    },
    pdfImageStyle: {
        height: 28,
        width: 28
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: "#fff3",
        height: 42,
        marginLeft: 14,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonTextStyle: {
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "center",
        alignItems: "center"
    }
});

export { MainHeader };
