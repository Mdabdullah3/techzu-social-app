import { X } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated, Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ActionSheet({ isVisible, onClose, title, children, height = 0.5 }: any) {
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    // 
    useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: SCREEN_HEIGHT * (1 - height),
                useNativeDriver: true,
                tension: 50,
                friction: 10
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 200,
                useNativeDriver: true
            }).start();
        }
    }, [isVisible]);

    return (
        <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <View style={styles.overlay}>
                    <Pressable style={styles.backdrop} onPress={onClose} />
                    <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
                        <View style={styles.handle} />
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity onPress={onClose} hitSlop={10}><X color="#444" size={24} /></TouchableOpacity>
                        </View>
                        <View style={styles.content}>{children}</View>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.8)' },
    backdrop: { ...StyleSheet.absoluteFill },
    sheet: {
        backgroundColor: '#0A0A0B',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderWidth: 1,
        borderColor: '#1A1A1C',
        position: 'absolute',
        width: '100%',
        height: SCREEN_HEIGHT,
    },
    handle: { width: 40, height: 4, backgroundColor: '#333', borderRadius: 2, alignSelf: 'center', marginTop: 12 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#1A1A1C' },
    title: { color: 'white', fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2 },
    content: { flex: 1, padding: 20 }
});