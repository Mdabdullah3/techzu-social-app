import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { CheckCircle2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';
import { usePostStore } from '../../store/usePostStore';

export default function CreatePostScreen() {
    const [text, setText] = useState('');
    const user = useAuthStore(state => state.user);
    const addPost = usePostStore(state => state.addPost);
    const router = useRouter();

    const handlePost = async () => {
        if (!text.trim()) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        await addPost(text);
        setText('');
        router.push('/(tabs)/' as any);
    };

    return (
        <ScreenWrapper includeTop={true} scroll={false}>
            <View style={styles.container} >
                {/* 1. Header: Balanced 3-Column Layout */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} hitSlop={20}>
                        <X color="white" size={24} strokeWidth={2} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Create Post</Text>

                    <TouchableOpacity
                        onPress={handlePost}
                        disabled={!text.trim()}
                        style={[styles.postBtn, !text.trim() && styles.postBtnDisabled]}
                    >
                        <Text style={[styles.postBtnText, !text.trim() && styles.postBtnTextDisabled]}>
                            Post
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 2. User Identity Row */}
                <View style={styles.userRow}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user?.name?.[0].toUpperCase()}</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.userName}>{user?.name}</Text>
                            <CheckCircle2 size={14} color={COLORS.primary} style={{ marginLeft: 4 }} fill={COLORS.primary} />
                        </View>
                        <Text style={styles.userStatus}>Public</Text>
                    </View>
                </View>

                {/* 3. The Input Canvas */}
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.input}
                        placeholder="What do you want to talk about?"
                        placeholderTextColor="#444"
                        multiline
                        autoFocus
                        value={text}
                        onChangeText={setText}
                        selectionColor={COLORS.primary}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    headerTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    postBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 20,
    },
    postBtnDisabled: {
        backgroundColor: '#1C1C1E',
    },
    postBtnText: {
        color: 'black',
        fontWeight: '800',
        fontSize: 14,
    },
    postBtnTextDisabled: {
        color: '#444',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1C1C1E',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2C2C2E',
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    userInfo: {
        marginLeft: 12,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    userStatus: {
        color: '#8E8E93',
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
    },
    inputArea: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 4,
    },
    input: {
        color: 'white',
        fontSize: 19,
        lineHeight: 26,
        textAlignVertical: 'top',
        fontWeight: '400',
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderTopWidth: 0.5,
        borderTopColor: '#2C2C2E',
        backgroundColor: 'black',
    },
    toolbarIcons: {
        flexDirection: 'row',
        gap: 24,
        paddingLeft: 8,
    },
    iconWrapper: {
        padding: 2,
    },
    expandBtn: {
        paddingRight: 8,
    }
});