import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ onPress, children, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'stretch',
        height: 46,
        marginTop: 12,
        marginRight: 70,
        marginLeft: 70,
        backgroundColor: '#fff'
    }
});

export { Button };
