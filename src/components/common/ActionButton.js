import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const ActionButton = ({ onPress, children, image, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle} {...props}>
            {image}
            <Text style={styles.textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'stretch',
        height: 46,
        marginBottom: 12,
        flexDirection: "row",
        marginRight: 20,
        alignItems: "center",
        marginLeft: 20,
        backgroundColor: 'rgba(0, 58, 101, 0.2)'
    },
    textStyle: {
        fontSize: 16,
        fontFamily: Fonts.RobotoSlabBold,
        color: "#003A65"
    }
});

export { ActionButton };
