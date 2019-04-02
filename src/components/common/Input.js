import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ value, onChangeText, placeholderText, secureTextEntry, children }) => {
    return (
        <View style={styles.containerStyle}>
            {children}
            <View style={styles.lineStyle} />
            <TextInput
                style={styles.inputStyle}
                placeholderTextColor='#fff'
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                autoCapitalize= 'none'
                placeholder={placeholderText}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        width: '100%',
        color: '#fff',
        fontSize: 20
    },
    containerStyle: {
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        backgroundColor: '#fff6',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 12
    },
    lineStyle: {
        height: 32,
        width: 1.7,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff'
    }
});

export { Input };
