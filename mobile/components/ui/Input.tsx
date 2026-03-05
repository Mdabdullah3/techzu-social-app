import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, SIZES } from '../../constants/Theme';

export default function Input({ label, error, ...props }: any) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <View style={[
                styles.wrapper,
                isFocused && { borderColor: COLORS.primary }
            ]}>
                <TextInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={styles.input}
                    placeholderTextColor={COLORS.textMuted}
                    selectionColor={COLORS.primary}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16, width: SIZES.isTablet ? '60%' : '100%', alignSelf: 'center' },
    wrapper: {
        backgroundColor: COLORS.background,
        borderRadius: 4, // X-style sharper corners
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    input: { color: 'white', paddingHorizontal: 12, paddingVertical: 16, fontSize: 17 },
    errorText: { color: COLORS.error, fontSize: 13, marginTop: 4, marginLeft: 4 },
});