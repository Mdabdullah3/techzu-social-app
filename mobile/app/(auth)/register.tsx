import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Link } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const register = useAuthStore((state) => state.register);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            return Alert.alert('Error', 'All fields are required');
        }

        setLoading(true);
        try {
            await register(name, email, password);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Registration failed.';
            Alert.alert('Error', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Join Techzu</Text>
                    <Text style={styles.subtitle}>Create an account to start posting</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChangeText={setName}
                    />
                    <Input
                        label="Email"
                        placeholder="john@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        label="Password"
                        placeholder="Min. 6 characters"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Button
                        title="Create Account"
                        onPress={handleRegister}
                        loading={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <Link href="../login" asChild>
                            <Pressable>
                                <Text style={styles.link}>Login</Text>
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