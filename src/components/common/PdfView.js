import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-navigation';

const PdfView = (props) => {
    return (
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "flex-start", backfaceVisibility: props.visibilty }}>
            <Pdf
                source={props.source}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});

export { PdfView };
