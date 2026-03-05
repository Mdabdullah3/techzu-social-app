import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
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
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert('Missing Fields', 'Please enter both email and password.');
        }

        setLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Invalid credentials. Please try again.';
            Alert.alert('Login Failed', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to view your social feed</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="example@mail.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>New here? </Text>
                        <Link href="../register" asChild>
                            <Pressable>
                                <Text style={styles.link}>Create an account</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 40 },
    header: { marginBottom: 40 },
    title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: COLORS.textMuted },
    form: { flex: 1 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
    footerText: { color: COLORS.textMuted, fontSize: 14 },
    link: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 }
});