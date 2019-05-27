
//ts-check
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const icSucceded = require('../../img/ic_check_green.png')
const icFailed = require('../../img/ic_wrong_red.png')

const StatisticsCategory = ({ titleText, questionsRight, success, imageUri, onPress, questionsFalse, learningState, buttonText }) => (
    <View style={{ marginHorizontal: 12, marginBottom: 12 }}>
        <ImageBackground
            source={{ uri: imageUri }}
            backgroundColor={"#003A65"}
            resizeMode='cover' style={styles.containerStyle}
            imageStyle={{ flex: 1 }}>
            <View>
                <View style={styles.titleStyle}>
                    <Text style={styles.titleTextStyle}>{titleText}</Text>
                </View>
                <View style={{ alignItems: 'center', flexDirection: "row", marginTop: 8, justifyContent: "space-between" }}>
                    <Text style={styles.questionInfo}>
                        {questionsRight} Fragen {"\n"}richtig
                    </Text>
                    <View style={{
                        width: 58,
                        height: 58,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#fff0',
                        borderColor: success ? '#2EEF6A' : '#F44B4B',
                        borderWidth: 2
                    }}>
                        <Image style={styles.icon} source={success ? icSucceded : icFailed} />
                    </View>
                    <Text style={{ color: '#fff', fontSize: 20, fontFamily: Fonts.RobotoSlab, textAlign: "right" }}>
                        {questionsFalse} Fragen {"\n"}falsch
                    </Text>
                </View>
            </View>
        </ImageBackground >
        <ProgressBar style={{ minHeight: 24, width: "100%" }} width={null} progress={learningState} height={24} color={'#2EEF6A'} unfilledColor='#F44B4B' borderWidth={0} borderRadius={0}>
            <Text style={{ position: 'absolute', flex: 0, marginLeft: 12, color: "#fff", width: "100%", fontFamily: Fonts.RobotoSlab, fontWeight: "bold", fontSize: 18 }}>{(learningState * 100).toFixed(0)} %</Text>
        </ProgressBar>
        <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
            <Image style={{ height: 24, width: 24, justifyContent: 'center' }} source={require('../../img/ic_book_white.png')} />
            <Text style={{ color: "#fff", fontWeight: "bold", fontFamily: Fonts.RobotoSlab, fontSize: 18, marginLeft: 6 }}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    containerStyle: {
        height: 128,
        paddingHorizontal: 12,
        paddingVertical: 2
    },
    textErfolg: {
        fontSize: 14,
        fontFamily: Fonts.RobotoSlab,
        margin: 3,
        color: "#fff"
    },
    titleStyle: {
        justifyContent: "center",
        height: 40
    },
    titleTextStyle: {
        fontSize: 20,
        fontFamily: Fonts.RobotoSlab,
        fontWeight: "bold",
        color: "#fff"
    },
    textStyle: {
        fontSize: 16,
        fontFamily: Fonts.RobotoSlab,
        marginTop: 8,
        marginBottom: 6,
        color: '#fff'
    },
    questionInfo: {
        color: '#fff',
        fontSize: 20,
        fontFamily: Fonts.RobotoSlab,
    },
    icon: {
        height: 24,
        width: 28
    },
    detailsButton: {
        backgroundColor: "#003A65",
        flexDirection: "row",
        marginTop: -16,
        alignItems: "center",
        alignSelf: "flex-end",
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 12,
        paddingLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export { StatisticsCategory };
