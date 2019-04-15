import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, ImageBackground, Image, StatusBar, ScrollView, View, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Impressum extends Component {

    websitePress() {
        Linking.openURL("https://www.seekinnovation.at");
    }

    render() {
        return (
            <ImageBackground
                style={styles.containerStyle}
                source={require('../img/bg_impressum.jpg')}
                resizeMode='cover'>
                <SafeAreaView style={{ backgroundColor: "#fff0" }}>
                    <StatusBar
                        backgroundColor="#154A38"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <ScrollView style={styles.containerStyle}>
                    <View style={{ flex: 1 }} >
                        <Image style={styles.logoBig} source={require('../img/seek_innovation_logo.png')} />
                        <Text style={styles.smallHeader}>
                            made with Passion.
                        </Text>
                        <Text style={styles.header}>
                            by SeekInnovation
                        </Text>
                        <Text style={styles.subHeader}>
                            Kontakt
                        </Text>
                        <View style={styles.borderedView}>
                            <Text style={styles.detailedText}>
                                Probleme, Fragen und {"\n"}
                                Anregungen an folgende E-Mail:
                            </Text>
                            <Text style={styles.informationText}>
                                office@seekinnovation.at
                            </Text>
                        </View>
                        <View style={styles.borderedView}>
                            <Text style={styles.detailedText}>
                                Besuchen Sie unsere Website:
                            </Text>
                            <TouchableOpacity onPress={this.websitePress.bind(this)}>
                                <Text style={styles.link}>
                                    www.seekinnovation.at
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.subHeader}>
                            Anschrift
                        </Text>
                        <View style={styles.borderedView}>
                            <Text style={styles.informationText}>
                                Seek Innovation OG
                            </Text>
                            <Text style={styles.detailedText}>
                                Harmsdorfgasse 48B/6 {"\n"}
                                8042 Graz {"\n"}
                                Austria
                            </Text>
                        </View>
                        <Text style={styles.subHeader}>
                            Credits
                        </Text>
                        <View style={styles.borderedView}>
                            <Text style={styles.informationText}>
                                Alexander Knechtl
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 22, marginBottom: 8 }}>
                                Organisation, Programmierung
                            </Text>
                            <Text style={styles.informationText}>
                                Florian Gerstner
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 22, marginBottom: 8 }}>
                                Design, Konzept
                            </Text>
                            <Text style={styles.informationText}>
                                Fabio Moretti
                            </Text>
                            <Text style={styles.detailedText}>
                                Programmierung
                            </Text>
                        </View>
                        <Text style={styles.subHeader}>
                            Danksagung
                        </Text>
                        <View style={styles.borderedView}>
                            <Text style={styles.informationText}>
                                Margit Eidenhammer
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 22, marginBottom: 8 }}>
                                für Ihre tatkräftige Unterstützung.
                            </Text>
                            <Text style={styles.informationText}>
                                Barnabas Kiss
                            </Text>
                            <Text style={styles.detailedText}>
                                für die Idee.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    header: {
        color: '#fff',
        fontSize: 30,
        marginTop: 6,
        marginBottom: 12,
        fontWeight: "bold",
        alignSelf: 'center',
    },
    smallHeader: {
        color: '#fff',
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 18,
        alignSelf: 'center'
    },
    subHeader: {
        color: '#fff',
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 4,
        marginTop: 12,
    },
    borderedView: {
        flex: 1,
        borderWidth: 2,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderColor: "#fff8",
        marginHorizontal: 10,
        marginBottom: 12
    },
    detailedText: {
        color: '#fff',
        fontSize: 22,
    },
    informationText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 2,
    },
    link: {
        color: '#fff',
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 2,
        textDecorationLine: 'underline'
    },
    logoBig: {
        marginTop: 22,
        resizeMode: "contain",
        height: 124,
        alignSelf: "center",
    }
});

export default Impressum;