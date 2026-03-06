import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        if (!email || !password) return Alert.alert('Error', 'Please fill in all fields.');
        setLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            Alert.alert('Error', 'Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper scroll={true} includeTop={true}>
            <View style={styles.container}>
                <Text style={styles.logo}>TECHZU.</Text>

                <Text style={styles.title}>Happening now</Text>
                <Text style={styles.subtitle}>Join Techzu Social today.</Text>

                <View style={styles.form}>
                    <Input
                        placeholder="Phone, email, or username"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Button title="LOGIN NOW" onPress={handleLogin} loading={loading} />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <Link href="/register" asChild>
                            <Text style={styles.link}>Sign up</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
    logo: { fontSize: 20, color: 'white', fontWeight: 'bold', marginBottom: 50, alignSelf: 'center' },
    title: { fontSize: 40, fontWeight: '900', color: 'white', letterSpacing: -1, marginBottom: 10 },
    subtitle: { fontSize: 20, fontWeight: '700', color: 'white', marginBottom: 40 },
    form: { width: '100%' },
    footer: { marginTop: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    footerText: { color: COLORS.textMuted, fontSize: 15 },
    link: { color: COLORS.primary, fontSize: 15 },
});