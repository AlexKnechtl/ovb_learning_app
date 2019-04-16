import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { StyleSheet, ImageBackground, View, Text, TouchableWithoutFeedback, Image } from 'react-native';

const Category = (props) => {

    renderView = () => {
        if (!props.testMode) {
            props.isPressed = false;
            return <Text style={{ fontSize: 16, fontWeight: "bold", color: props.testMode ? '#fff0' : '#fff' }}>{(props.successRate*100).toFixed(0)} %</Text>;
        } else {
            return <Image source={require('../../img/ic_check.png')} style={{ width: props.isPressed ? 31 : 0, height: 24 }} />;
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}>
            <View>
                <ImageBackground
                    source={props.imageUri}
                    backgroundColor={"#003A65"}
                    resizeMode='cover' style={styles.containerStyle}
                    imageStyle={{ flex: 1 }}>
                    <View>
                        <View style={styles.titleStyle}>
                            <Text style={styles.titleTextStyle}>{props.titleText}</Text>
                        </View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <View style={{ marginTop: 4, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
                                <View style={{ backgroundColor: props.isPressed ? 'rgba(46, 239, 100, 0.55)' : '#fff3', width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                                    {renderView()}
                                </View>
                                {props.erfolgText}
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ marginTop: 8, marginBottom: 6, color: "#fff", fontSize: 16, fontWeight: "bold" }}>Lernfortschritt</Text>
                                <ProgressBar style={{ minHeight: 22, width: "85%"}} width={null} progress={props.learningState} height={22} color={'#94C231'} unfilledColor='#fff6' borderWidth={0} borderRadius={0}>
                                    <Text style={{ marginTop: -20, marginBottom: -2, color: "#fff", width: "100%", textAlign: "center", fontWeight: "bold" }}>{(props.learningState*100).toFixed(0)} %</Text>
                                </ProgressBar>
                                <Text style={{ marginTop: 6, marginBottom: 8, color: "#fff9" }}>{props.questionsRight} Fragen richtig / {props.questionsFalse} falsch</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground >
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        height: 128,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12
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
        marginLeft: 12,
        fontWeight: "bold",
        color: "#fff"
    },
    textStyle: {
        fontSize: 16,
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
        fontWeight: "bold",
        color: "#fff"
    }
});

export { Category };
