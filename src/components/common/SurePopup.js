import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modalbox';
import { Fonts } from '../../utils/Fonts';

class SurePopup extends Component {
    constructor(props) {
        super(props);
    }

    showModal = () => {
        this.refs.myModal.open();
    }

    closeModal = () => {
        this.refs.myModal.close();
    }

    render() {
        return (
            <Modal
                ref={"myModal"}
                style={styles.modalStyle}
                position='center'
                coverScreen={true}
                backdrop={true} >
                <View style={{
                    width: 280,
                    padding: 8,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Image style={styles.floatingActionButton} source={require('../../img/sure_icon.png')} />
                    <Text style={styles.smallText}>
                        Prüfung beenden?
                    </Text>
                </View>
                <View style={styles.lineColor} />
                <View style={{ flexDirection: 'row', height: 48 }}>
                    <TouchableOpacity
                        style={styles.backButtonStyle}
                        onPress={this.closeModal.bind(this)}>
                        <Text style={styles.buttonText}>
                            Zurück
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.props.onButtonPress.bind(this)} >
                        <Text style={styles.buttonText}>
                            Beenden
                        </Text>
                        <Image style={{ height: 28, width: 32, marginLeft: 8, transform: [{ rotate: '180deg' }] }} source={require('../../img/ic_back.png')} />
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        height: null,
        width: 280,
        alignItems: "center",
        marginTop: 16,
        backgroundColor: "#003A65"
    },
    buttonStyle: {
        height: 48,
        justifyContent: "center",
        flexGrow: 4,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8
    },
    backButtonStyle: {
        height: 48,
        flexGrow: 3,
        color: '#fff',
        backgroundColor: '#002F53',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    buttonText: {
        alignSelf: 'center',
        fontFamily: Fonts.RobotoSlabBold,
        color: '#fff',
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 10
    },
    smallText: {
        fontSize: 22,
        fontFamily: Fonts.RobotoSlabBold,
        marginTop: 2,
        marginBottom: 4,
        color: "#003A65"
    },
    bigText: {
        fontSize: 22,
        fontFamily: Fonts.RobotoSlabBold,
        marginTop: 4,
        marginBottom: 4,
        color: "#003A65"
    },
    lineColor: {
        backgroundColor: "#DE7010",
        height: 6,
        width: 280
    },
    floatingActionButton: {
        width: 64,
        height: 64,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
});

export { SurePopup };