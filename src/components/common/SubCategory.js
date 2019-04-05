import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

const SubCategory = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.titleStyle}>
                    <Text style={styles.titleTextStyle}>{props.titleText}</Text>
                </View>
                <View style={styles.linearLayout}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>45% abgeschlossen</Text>
                        <Progress.Bar progress={0.45} height={12} width={190} color={'#00B7E5'} unfilledColor='#fff3' borderWidth={0} borderRadius={0} />
                    </View>
                    <View style={{ flex: 1, marginTop: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.chanceViewStyle}>
                            <Text style={styles.chanceTextStyle}>30%</Text>
                        </View>
                        <Text style={{ fontSize: 12, margin: 2, color: "#fff" }}>Erfolgschance</Text>
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
        marginLeft: 12,
        fontWeight: "bold",
        color: "#fff"
    },
    textStyle: {
        fontSize: 16,
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
        fontWeight: "bold",
        fontSize: 16
    }
});

export { SubCategory };
