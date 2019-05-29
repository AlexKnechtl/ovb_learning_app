import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const SubCategory = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.titleStyle}>
                    <Text numberOfLines={1} style={styles.titleTextStyle}>{props.titleText}</Text>
                </View>
                <View style={styles.linearLayout}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>{(props.learningState * 100).toFixed(0)}% abgeschlossen</Text>
                        <Progress.Bar progress={props.learningState} height={12} width={190} color={'#00B7E5'} unfilledColor='#fff3' borderWidth={0} borderRadius={0} />
                    </View>
                    <View style={{ flex: 1, marginTop: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.chanceViewStyle}>
                            <Text style={styles.chanceTextStyle}>{(props.successRate * 100).toFixed(0)}%</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontFamily: Fonts.RobotoSlab, margin: 2, color: "#fff" }}>Erfolgschance</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#003A65",
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 12
    },
    linearLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6
    },
    titleStyle: {
        backgroundColor: '#fff3',
        justifyContent: "center",
        height: 32
    },
    titleTextStyle: {
        fontSize: 16,
        fontFamily: Fonts.RobotoSlabBold,
        marginLeft: 12,
        color: "#fff",
    },
    textStyle: {
        fontSize: 16,
        fontFamily: Fonts.RobotoSlab,
        marginBottom: 6,
        color: '#ffffff'
    },
    chanceViewStyle: {
        width: 52,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff3"
    },
    chanceTextStyle: {
        color: "#fff",
        fontFamily: Fonts.RobotoSlabBold,
        fontSize: 16
    }
});

export { SubCategory };
