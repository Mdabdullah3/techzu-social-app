import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../constants/Theme';

interface Props {
    children: React.ReactNode;
    scroll?: boolean;
}

export default function ScreenWrapper({ children, scroll = true }: Props) {
    const Container = scroll ? ScrollView : View;

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <Container
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={scroll ? styles.scrollContent : undefined}
                >
                    {children}
                </Container>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: COLORS.background },
    flex: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 20 },
    scrollContent: { paddingBottom: 40 },
});