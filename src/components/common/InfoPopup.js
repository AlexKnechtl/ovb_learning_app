import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';

class InfoPopup extends Component {
    constructor(props) {
        // this.props = props;
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
                backdrop={true}
            >
                <View style={{
                    width: 280,
                    height: 45,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        justifyContent: "center",
                        color: "#003A65"
                    }}>
                        {this.props.headerText}
                    </Text>
                </View>
                <View style={styles.lineColor} />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.props.onButtonPress.bind(this)}>
                    <Text style={styles.buttonText}>
                        {this.props.buttonText}
                    </Text>
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
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 18,
        backgroundColor: "#003A65"
    },
    buttonStyle: {
        width: 240,
        backgroundColor: "#fff3",
        marginTop: 14,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 8,
        paddingRight: 8
    },
    buttonText: {
        alignSelf: 'center',
        fontWeight: "bold",
        color: '#fff',
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 10
    },
    lineColor: {
        backgroundColor: "#00B7E5",
        height: 7,
        width: 280
    }
});

export default InfoPopup;
export { InfoPopup };