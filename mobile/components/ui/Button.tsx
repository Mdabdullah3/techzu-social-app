import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';

interface Props {
    title: string;
    onPress: () => void;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
    style?: any;
}

export default function Button({ title, onPress, loading, variant = 'primary', style }: Props) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btn, isPrimary ? styles.primary : styles.secondary, style]}
            disabled={loading}
            activeOpacity={0.7}
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
        paddingVertical: 14,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        width: SIZES.isTablet ? '50%' : '100%', // Handle tablet responsiveness
        alignSelf: 'center'
    },
    primary: { backgroundColor: COLORS.primary },
    secondary: { backgroundColor: COLORS.surfaceLight },
    text: { color: 'white', fontWeight: '700', fontSize: FONTS.md },
});