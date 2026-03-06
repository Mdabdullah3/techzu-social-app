import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function Register() {
    // Local state for form inputs and loading state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const register = useAuthStore((state) => state.register);
    // Handle register with basic validation and error handling
    const handleRegister = async () => {
        if (!name || !email || !password) {
            return Alert.alert('Action Required', 'Please provide your full details to initialize your account.');
        }
        setLoading(true);
        try {
            await register(name, email, password);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Registration sequence failed.';
            Alert.alert('System Alert', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper includeTop={true} scroll={true}>
            <View style={styles.container}>
                <Text style={styles.logo}>TECHZU.</Text>
                <View style={styles.header}>
                    <Text style={styles.title}>Create your account</Text>
                    <Text style={styles.subtitle}>Join a global network of high-performance developers.</Text>
                </View>
                <View style={styles.form}>
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        autoCorrect={false}
                    />
                    <Input
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        placeholder="Password (min. 6 characters)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <View style={styles.termsBox}>
                        <Text style={styles.termsText}>
                            By signing up, you agree to our <Text style={styles.linkText}>Terms</Text>, <Text style={styles.linkText}>Privacy Policy</Text>, and <Text style={styles.linkText}>Cookie Use</Text>.
                        </Text>
                    </View>
                    <Button
                        title="CREATE ACCOUNT"
                        onPress={handleRegister}
                        loading={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already part of the network? </Text>
                        <Link href="/login" asChild>
                            <Pressable>
                                <Text style={styles.link}>Sign in</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 30, paddingTop: 20 },
    logo: { fontSize: 20, color: 'white', fontWeight: '900', alignSelf: 'center', marginBottom: 40 },
    header: { marginBottom: 32 },
    title: { fontSize: 34, fontWeight: '900', color: 'white', letterSpacing: -1, marginBottom: 12 },
    subtitle: { fontSize: 16, color: COLORS.textMuted, lineHeight: 22 },
    form: { flex: 1 },
    termsBox: { marginVertical: 20 },
    termsText: { color: COLORS.text, fontSize: 13, lineHeight: 18 },
    linkText: { color: COLORS.primary },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32, paddingBottom: 40 },
    footerText: { color: COLORS.textMuted, fontSize: 14 },
    link: { color: COLORS.primary, fontWeight: '800', fontSize: 14 }
});