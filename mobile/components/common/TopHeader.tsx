import { Bell, Settings } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function TopHeader() {
    const user = useAuthStore((state) => state.user);
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.profileCircle}>
                    <Text style={styles.avatarText}>{user?.name?.[0]}</Text>
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>TECHZU</Text>
                    <View style={styles.dot} />
                </View>

                <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Bell color="white" size={20} strokeWidth={2} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Settings color="white" size={20} strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: '#1A1A1A' },
    content: { height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    profileCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#222', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
    avatarText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
    logoContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 40 },
    logo: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 4 },
    dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary, marginLeft: 2 },
    rightIcons: { flexDirection: 'row', gap: 15 },
    iconBtn: { padding: 4 }
});