//@ts-check
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { StyleSheet, ImageBackground, View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const StatisticView = ({onPress, learningState }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}>
            <View >
                <ImageBackground
                    source={require('../../img/statistic_bg.png')}
                    backgroundColor={"#003A65"}
                    resizeMode='cover'
                    style={styles.containerStyle}
                    imageStyle={{ flex: 1 }}>
                    <View style={styles.titleStyle}>
                        <Text style={styles.titleTextStyle}>Deine</Text>
                        <Text style={styles.titleBold}>Statistik</Text>
                        <Image source={require('../../img/ic_back.png')} style={{ transform: [{ rotate: '180deg' }], width: 34, height: 20 }} />
                    </View>
                    <ProgressBar style={{ height: 32, width: "100%", justifyContent: 'center' }} width={null} progress={learningState} height={32} color={'#94C231'} unfilledColor='#fff3' borderWidth={0} borderRadius={0}>
                        <View style={{ position: 'absolute', flex: 0, flexDirection: 'row', width: '100%', paddingLeft: 12, paddingRight: 12, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: "#fff", fontFamily: Fonts.RobotoSlab, textAlign: "left", fontSize: 20 }}>Gesamtfortschritt</Text>
                            <Text style={{ color: "#fff", fontFamily: Fonts.RobotoSlab, textAlign: "right", fontSize: 20 }}>{(learningState * 100).toFixed(0)} %</Text>
                        </View>
                    </ProgressBar>
                </ImageBackground >
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        height: 84,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12
    },
    textErfolg: {
        fontSize: 14,
        fontFamily: Fonts.RobotoSlab,
        margin: 3,
        color: "#fff"
    },
    titleStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 6,
        height: 40
    },
    titleTextStyle: {
        fontSize: 26,
        fontFamily: Fonts.RobotoSlab,
        marginLeft: 12,
        color: "#fff"
    },
    titleBold: {
        fontSize: 26,
        fontFamily: Fonts.RobotoSlabBold,
        marginRight: 8,
        marginLeft: 8,
        color: "#fff"
    },
    textStyle: {
        fontSize: 16,
        fontFamily: Fonts.RobotoSlab,
        marginTop: 8,
        marginBottom: 6,
        color: '#fff'
    },
    chanceViewStyle: {
        backgroundColor: "#fff3",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    chanceTextStyle: {
        fontSize: 16,
        fontFamily: Fonts.RobotoSlabBold,
        color: "#fff"
    }
});

export { StatisticView };
