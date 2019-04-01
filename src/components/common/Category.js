import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { StyleSheet, ImageBackground, View, Text, TouchableWithoutFeedback, Image } from 'react-native';

const Category = (props) => {

    renderView = () => {
        if(!props.testMode) {
            props.isPressed = false;
            return <Text style={{ fontSize: 16, fontWeight: "bold", color: props.testMode ? '#fff0' : '#fff' }}>30%</Text>;
        } else {
            return <Image source={require('../../img/ic_check.png')} style={{ width: props.isPressed ? 31 : 0, height: 24}} />;
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}>
            <View>
                <ImageBackground
                    source={props.imageUri}
                    resizeMode='cover' style={styles.containerStyle}
                    imageStyle={{ flex: 1 }}>
                    <View>
                        <View style={styles.titleStyle}>
                            <Text style={styles.titleTextStyle}>{props.titleText}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.textStyle}>45% abgeschlossen</Text>
                                <ProgressBar progress={0.45} height={12} width={190} color={'#94C231'} unfilledColor='#93A9AF' borderWidth={0} borderRadius={0} />
                                <Text style={styles.textStyle}>3 Fragen falsch beantwortet</Text>
                            </View>
                            <View style={{ marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{backgroundColor: props.isPressed ? 'rgba(46, 239, 100, 0.55)' : '#fff3', width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
                                    {renderView()}
                                </View>
                                {props.erfolgText}
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
        marginTop: 12
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
        margin: 8,
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
