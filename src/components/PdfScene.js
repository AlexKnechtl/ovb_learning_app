import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native';

import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-navigation';

export default class PDFExample extends React.Component {
    render() {
        const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/wko-lernplattform.appspot.com/o/courses%2Fpdfs%2FVersicherungsagent%2F2.%20Wettbewerbs-%20Konsumentenschutzrecht%20und%20DSGVO%20Juni%202018.pdf?alt=media&token=87e6a626-8aa7-4954-8fec-6fb0f96893ff', cache: true };

        return (
            <View style={styles.container}>
                <SafeAreaView style={{ backgroundColor: "#003A65" }}>
                    <StatusBar
                        backgroundColor="#003A65"
                        barStyle="light-content"
                    />
                </SafeAreaView >
                <Pdf
                    source={source}
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
    }
});