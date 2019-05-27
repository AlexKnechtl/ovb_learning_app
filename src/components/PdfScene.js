//@ts-check

import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import CustomPdf from './forks/customPDF';

export default class PDFExample extends React.Component {
    render() {
        const source = { uri: this.props.navigation.getParam('pdfSrc', ''), cache: true };
        const pageNum = this.props.navigation.getParam('pdfPage', 1);

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
                    style={styles.pdf} />

                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }} style={styles.floatingAction}>
                    <Image style={{ width: 36, height: 36, marginLeft: -2 }} source={require('../img/ic_back.png')} />
                </TouchableOpacity>
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
        width: 58,
        height: 58,
        borderRadius: 30,
        backgroundColor: '#94C231',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        bottom: 22,
        right: 22,
    }
});