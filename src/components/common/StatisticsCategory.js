
//ts-check
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { StyleSheet, ImageBackground, View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';

const StatisticsCategory = ({titleText, questionsRight, success, imageUri, onPress, questionsFalse, learningState}) => (
        <TouchableWithoutFeedback
            onPress={onPress}>
            <View style={{ marginHorizontal: 12 }}>
                <ImageBackground
                    source={{uri:imageUri}}
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
                                borderColor: success? '#2EEF6A':'#F44B4B',
                                borderWidth: 2
                            }}>
                                <Image style={styles.icon} source={require('../../img/ic_check.png')} />
                            </View>
                            <Text style={styles.questionInfo}>
                                {questionsFalse} Fragen {"\n"}falsch
                            </Text>
                        </View>
                    </View>
                </ImageBackground >
                <ProgressBar style={{ minHeight: 22, width: "100%" }} width={null} progress={learningState} height={22} color={'#2EEF6A'} unfilledColor='#F44B4B' borderWidth={0} borderRadius={0}>
                    <Text style={{ marginLeft: 12, marginTop: -20, marginBottom: -2, color: "#fff", width: "100%", fontWeight: "bold" }}>{(learningState * 100).toFixed(0)} %</Text>
                </ProgressBar>
                <TouchableOpacity style={styles.detailsButton}>
                    <Image style={{ height: 24, width: 24 }} source={require('../../img/ic_book_white.png')} />
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18, marginLeft: 6 }}>
                        Details
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );

const styles = StyleSheet.create({
    containerStyle: {
        height: 128,
        paddingHorizontal: 12,
        paddingVertical: 2
    },
    textErfolg: {
        fontSize: 14,
        margin: 3,
        color: "#fff"
    },
    titleStyle: {
        justifyContent: "center",
        height: 40
    },
    titleTextStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    },
    textStyle: {
        fontSize: 16,
        marginTop: 8,
        marginBottom: 6,
        color: '#fff'
    },
    questionInfo: {
        color: '#fff',
        fontSize: 20,

    },
    icon: {
        height: 24,
        width: 28
    },
    detailsButton: {
        backgroundColor: "#003A65",
        flexDirection: "row",
        marginTop: -14,
        alignItems: "center",
        width: '35%',
        alignSelf: "flex-end",
        padding: 6,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        marginBottom: 12,
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
