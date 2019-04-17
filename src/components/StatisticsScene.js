//@ts-check
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { StatisticsCategory } from './common/StatisticsCategory';
import { connect } from 'react-redux';

class StatisticsScene extends Component {
    state = {
        icon: null,
    }

    navigateHome = () => {
        this.props.navigation.navigate('main');
    }

    render() {
        const bestandenText = this.props.exam.percentageRight >= 0.6 ? 'Bestanden!' : 'Nicht bestanden.';
        const infoText = this.props.exam.percentageRight >= 0.6 ? 'Weiter so! :)' : 'Nächstes mal schaffst du es!';
        const percentageRight = this.props.exam.percentageRight * 100;
        return (
            <View style={styles.containerStyle}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#154A38"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <View>
                    <View style={{ minHeight: '15%', width: '100%', backgroundColor: "#003A65", padding: 16, alignItems: "center", flexDirection: "row" }}>
                        <ProgressCircle
                            percent={percentageRight}
                            radius={36}
                            borderWidth={5}
                            color="#2EEF6A"
                            shadowColor="#fff"
                            bgColor="#003A65">
                            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                                {percentageRight.toFixed(0)}%
                        </Text>
                        </ProgressCircle>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 26, marginTop: 4, marginLeft: 12 }}>
                                {bestandenText}
                            </Text>
                            <Text style={{ color: "#fff", fontSize: 20, marginTop: 4, marginLeft: 12 }}>
                                {infoText}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.linearLayout}>
                        <TouchableOpacity onPress={() => this.navigateHome()} style={styles.buttonStyle}>
                            <Text style={{ alignSelf: 'center', fontWeight: "bold", color: '#fff', fontSize: 20 }}>
                                Weiter lernen
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.lineColor} />
                <ScrollView style={{ paddingVertical: 12 }}>
                    <SafeAreaView>
                        {Object.keys(this.props.exam.finishedStats).map(key => {
                            var currModResult = this.props.exam.finishedStats[key];
                            var moduleName = this.props.modules.modules[key].name;
                            var imageUri = this.props.modules.modules[key].image;
                            return <StatisticsCategory
                                titleText={moduleName}
                                questionsFalse={currModResult.falseQuestions}
                                questionsRight={currModResult.rightQuestions}
                                success={currModResult.percentageRight >= 0.8}
                                learningState={currModResult.percentageRight}
                                imageUri={imageUri}
                                onPress={() => { }}
                            />;
                        })}
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    lineColor: {
        backgroundColor: "#00B7E5",
        height: 7,
        width: '100%'
    },
    backIcon: {
        height: 32,
        width: 32,
        transform: [{ rotate: '180deg' }]
    },
    buttonStyle: {
        marginTop: 6,
        height: 42,
        width: '100%',
        backgroundColor: "#fff3",
        justifyContent: "center",
        alignItems: "center"
    },
    linearLayout: {
        width: '100%',
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00B7E5",
    },
});

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
    exam: state.exam,
    modules: state.modules
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScene);