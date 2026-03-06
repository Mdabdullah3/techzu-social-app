import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/Theme';

export default function Button({ title, onPress, loading, style }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.btn, style]}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: SIZES.isTablet ? '60%' : '100%',
        alignSelf: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    text: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
});