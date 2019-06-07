import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modalbox';
import { Fonts } from '../../utils/Fonts';

class InfoPopup extends Component {
    constructor(props) {
        super(props);
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
                onClosed={this.props.onButtonPress.bind(this)}
                isOpen={this.props.modalVisible}
                coverScreen={true}
                backdrop={true} >
                <View style={{
                    width: 280,
                    padding: 8,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={styles.floatingActionButton}>
                        <Text style={{ fontSize: 32, fontFamily: Fonts.RobotoSlabBold, color: '#fff' }}>i</Text>
                    </View>
                    <Text style={styles.smallText}>
                        E-Mail wurde erfolgreich
                    </Text>
                    <Text style={styles.bigText}>
                        versendet!
                    </Text>
                </View>
                <View style={styles.lineColor} />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.props.onButtonPress.bind(this)}>
                    <Text style={styles.buttonText}>
                        Weiter
                    </Text>
                    <Image style={{ height: 28, width: 32, marginLeft: 8, transform: [{ rotate: '180deg' }] }} source={require('../../img/ic_back.png')} />
                </TouchableOpacity>
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
        width: '100%',
        height: 48,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8
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
        fontSize: 16,
        fontFamily: Fonts.RobotoSlabBold,
        marginTop: 4,
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
        backgroundColor: "#00B7E5",
        height: 6,
        width: 280
    },
    floatingActionButton: {
        width: 64,
        height: 64,
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00B7E5',
    },
});

export { InfoPopup };