import { Settings } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function TopHeader() {
    const user = useAuthStore((state) => state.user);
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.wrapper, { paddingTop: insets.top }]}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={styles.avatarWrapper}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user?.name?.[0].toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.logo}>𝕏</Text>

                <TouchableOpacity activeOpacity={0.7} style={styles.settingsBtn}>
                    <Settings color="white" size={20} strokeWidth={2.5} />
                </TouchableOpacity>
            </View>

            {/* Sub-Header Tabs (X-Style) */}
            <View style={styles.tabs}>
                <View style={styles.tab}>
                    <Text style={styles.activeTabText}>For you</Text>
                    <View style={styles.activeIndicator} />
                </View>
                <View style={styles.tab}>
                    <Text style={styles.inactiveTabText}>Following</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { backgroundColor: 'rgba(0,0,0,0.9)', borderBottomWidth: 0.5, borderBottomColor: '#2F3336' },
    container: { height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
    avatarWrapper: { width: 34, height: 34 },
    avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: 'white', fontWeight: '900', fontSize: 14 },
    logo: { color: 'white', fontSize: 24, fontWeight: '900' },
    settingsBtn: { padding: 4 },
    tabs: { flexDirection: 'row', height: 48 },
    tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    activeTabText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
    inactiveTabText: { color: '#71767B', fontWeight: 'bold', fontSize: 15 },
    activeIndicator: { position: 'absolute', bottom: 0, width: 56, height: 4, backgroundColor: COLORS.primary, borderRadius: 2 }
});