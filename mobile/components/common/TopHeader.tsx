import { Settings, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function TopHeader() {
    const user = useAuthStore((state) => state.user);

    return (
        <View style={styles.container}>
            {/* Left: Profile Image */}
            <TouchableOpacity style={styles.avatarContainer}>
                {user ? (
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>{user.name[0].toUpperCase()}</Text>
                    </View>
                ) : (
                    <User color="white" size={24} />
                )}
            </TouchableOpacity>

            {/* Center: Brand Logo */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>𝕏</Text>
                {/* Or replace with an Image component for your own logo */}
            </View>

            {/* Right: Settings Icon */}
            <TouchableOpacity style={styles.iconButton}>
                <Settings color="white" size={22} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: COLORS.background,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.border,
    },
    avatarContainer: { width: 40, alignItems: 'flex-start' },
    avatarCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    logoContainer: { flex: 1, alignItems: 'center' },
    logoText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    iconButton: { width: 40, alignItems: 'flex-end' },
});