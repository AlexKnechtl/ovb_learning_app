import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

var screen = Dimensions.get("window");

export default class PopupBottom extends Component {
    constructor(props) {
        super(props);
    }

    showAddModal = () => {
        this.refs.myModal.open();
    }

    onLogoutPress() {
        // Actions.home();
        this.props.navigation.navigate('main');
    }

    render() {
        return (
            <Modal
                ref={"myModal"}
                style={styles.modalStyle}
                position='bottom'
                backdrop={true}>
                <View style={styles.linearLayout}>
                    <TouchableOpacity
                        onPress={this.onLogoutPress.bind(this)}
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(255,255,255, 0.0)',
                            borderColor: '#fff7',
                            alignItems: "center",
                            marginRight: 12,
                            borderWidth: 2
                        }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 34, height: 20, marginRight: 8 }} source={require('../../img/ic_back.png')} />
                            <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                Zurück
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image style={{ width: 24, height: 30, marginRight: 12 }} source={require('../../img/ic_pdf_color.png')} />
                            <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
                                PDF öffnen
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 8, alignSelf: "center", color: "white" }}>
                    {this.props.sectionText}
                </Text>
                <Text style={{ fontSize: 20, alignSelf: "center", textAlign: "center", color: "white" }}>
                    {this.props.questionNumberText}
                </Text>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        height: null,
        width: screen.width,
        paddingTop: 10,
        paddingBottom: 18,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: "#003A65"
    },
    buttonStyle: {
        backgroundColor: 'rgba(255,255,255, 0.0)',
        borderColor: '#fff7',
        borderWidth: 2,
        paddingLeft: 16,
        paddingRight: 16
    },
    linearLayout: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    }
});

export { PopupBottom };
