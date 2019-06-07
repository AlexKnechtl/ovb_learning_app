import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import {  Fonts } from '../../utils/Fonts';

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
        color: '#fff',
        width: '100%',
        fontSize: 20,
        fontFamily: Fonts.RobotoSlab
    },
    containerStyle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 8,
        backgroundColor: '#fff6',
        width: '77%',
        marginLeft: 18,
        marginRight: 18,
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
