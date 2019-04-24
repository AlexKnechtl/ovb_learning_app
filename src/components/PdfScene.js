//@ts-check

import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import CustomPdf from './forks/customPDF';

export default class PDFExample extends React.Component {
    render() {
        const source = { uri: this.props.navigation.getParam('pdfSrc', ''), cache: true };
        // const source = { uri: decodeURI("https://schueler.bulme.at/~fabio.moretti/SeekINnovation/2ad%20adfas%20awef%20awef%20waef.pdf"), cache: false};

        const pageNum = this.props.navigation.getParam('pdfPage', 1);
        console.log(source);

        return (
            <View style={styles.container}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#003A65"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <CustomPdf
                    source={source}
                    page={pageNum}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf} >

                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }} style={styles.floatingAction}>
                        <Image style={{ width: 32, height: 32, marginLeft: -2 }} source={require('../img/ic_back.png')} />
                    </TouchableOpacity>

                </CustomPdf>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#003A65",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    floatingAction: {
        width: 54,
        height: 54,
        borderRadius: 28,
        backgroundColor: '#94C231',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
        right: 20,
    }
});