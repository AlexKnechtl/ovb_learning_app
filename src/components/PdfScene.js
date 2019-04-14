import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar } from 'react-native';

import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-navigation';

export default class PDFExample extends React.Component {
    render() {
        const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

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