import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, SIZES } from '../../constants/Theme';

export default function Input({ label, error, ...props }: any) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, isFocused && { color: COLORS.primary }]}>{label}</Text>}
            <View style={[
                styles.wrapper,
                isFocused && styles.wrapperFocused,
                error && { borderColor: COLORS.error }
            ]}>
                <TextInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={styles.input}
                    placeholderTextColor="#444"
                    selectionColor={COLORS.primary}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20, width: SIZES.isTablet ? '60%' : '100%', alignSelf: 'center' },
    label: { color: '#555', fontSize: 13, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },
    wrapper: {
        backgroundColor: '#0A0A0A', // Contrast against background
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    wrapperFocused: {
        borderColor: COLORS.primary,
        backgroundColor: '#0D0D12', // Subtle violet tint
    },
    input: {
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 15,
        fontSize: 16,
        fontWeight: '500'
    },
    errorText: { color: COLORS.error, fontSize: 12, marginTop: 6, marginLeft: 4 },
});