import React from 'react';
import { ScrollView, View } from 'react-native';

const ScrollViewPadding = ({ children, padding, backgroundColor }) => {
    return (
        <ScrollView style={{ backgroundColor: backgroundColor }}>
            <View style={{ flexGrow: 1, paddingVertical: padding }}>
                {children}
            </View>
        </ScrollView>
    );
};

export { ScrollViewPadding };
