import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/Theme';

export default function Button({ title, onPress, loading, style }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[styles.btn, style]}
            disabled={loading}
        >
            {loading ? <ActivityIndicator color="black" /> : <Text style={styles.text}>{title}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLORS.text, // White button on black background
        height: 52,
        borderRadius: 26, // Capsule shape
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: SIZES.isTablet ? '60%' : '100%',
        alignSelf: 'center',
    },
    text: { color: 'black', fontWeight: '800', fontSize: 16 },
});