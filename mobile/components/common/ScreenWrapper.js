import { View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ScreenWrapper({ children, scroll = true }) {
    const Content = scroll ? ScrollView : View;

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <Content className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                    {children}
                </Content>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}