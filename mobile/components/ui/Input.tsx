import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/Theme';

interface Props {
    label?: string;
    error?: string;
    [key: string]: any;
}

export default function Input({ label, error, ...props }: Props) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={COLORS.textMuted}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16, width: SIZES.isTablet ? '50%' : '100%', alignSelf: 'center' },
    label: { color: COLORS.textMuted, marginBottom: 6, fontSize: 14, fontWeight: '500' },
    input: {
        backgroundColor: COLORS.surface,
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: FONTS.md
    },
    inputError: { borderColor: COLORS.error },
    errorText: { color: COLORS.error, fontSize: 12, marginTop: 4 },
});