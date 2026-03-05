// components/common/TopHeader.tsx
import { Settings } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function TopHeader() {
    const user = useAuthStore((state) => state.user);
    const insets = useSafeAreaInsets(); // Get the notch height

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                {/* Left: Avatar */}
                <TouchableOpacity style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{user?.name?.[0].toUpperCase() || 'U'}</Text>
                </TouchableOpacity>

                {/* Center: Logo */}
                <Text style={styles.logoText}>𝕏</Text>

                {/* Right: Settings */}
                <TouchableOpacity>
                    <Settings color="white" size={22} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        borderBottomWidth: 0.3,
        borderBottomColor: COLORS.border,
    },
    content: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    avatarCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    logoText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
});