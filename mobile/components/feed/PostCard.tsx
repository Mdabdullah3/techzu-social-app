import { Clock, Heart, MessageSquare, MoreHorizontal, Share2, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme';
import { Post } from '../../store/usePostStore';

interface PostCardProps {
    post: Post;
    currentUserId: string;
    onLike: () => void;
    onOpenComments: () => void;
    onOpenOptions: () => void;
}

export default function PostCard({ post, currentUserId, onLike, onOpenComments, onOpenOptions }: PostCardProps) {
    const isLiked = post.likes.includes(currentUserId);
    const isOwner = post.user === currentUserId;
    const handle = `@${post.userName.toLowerCase().replace(/\s/g, '_')}`;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatarGlow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{post.userName[0].toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.nameMeta}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{post.userName}</Text>
                            <ShieldCheck size={14} color={COLORS.primary} fill={COLORS.primary} style={styles.verifyIcon} />
                        </View>
                        <Text style={styles.handle}>{handle}</Text>
                    </View>
                </View>

                <View style={styles.rightHeader}>
                    <View style={styles.timeBadge}>
                        <Clock size={10} color="#555" />
                        <Text style={styles.timeText}>2h</Text>
                    </View>
                    {isOwner && (
                        <TouchableOpacity onPress={onOpenOptions} hitSlop={20} style={styles.moreCircle}>
                            <MoreHorizontal color="white" size={18} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.contentBox}>
                <Text style={styles.contentText}>{post.text}</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={onLike} activeOpacity={0.7} style={[styles.pill, isLiked && styles.likedPill]}>
                    <Heart
                        size={18}
                        color={isLiked ? '#FF2D55' : '#888'}
                        fill={isLiked ? '#FF2D55' : 'transparent'}
                    />
                    <Text style={[styles.pillText, isLiked && { color: 'white' }]}>
                        {post.likes.length || '0'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onOpenComments} activeOpacity={0.7} style={styles.pill}>
                    <MessageSquare size={18} color="#888" />
                    <Text style={styles.pillText}>{post.comments.length || '0'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Share.share({ message: post.text })}
                    activeOpacity={0.7}
                    style={styles.pill}
                >
                    <Share2 size={18} color="#888" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#0D0D0E',
        borderRadius: 32,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#1A1A1C',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
        marginHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarGlow: {
        padding: 2,
        borderRadius: 14,
        backgroundColor: '#1A1A1C',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#050505',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#222',
    },
    avatarText: {
        color: COLORS.primary,
        fontWeight: '900',
        fontSize: 18,
    },
    nameMeta: {
        marginLeft: 14,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
        letterSpacing: -0.2,
    },
    verifyIcon: {
        marginLeft: 5,
    },
    handle: {
        color: '#666',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },
    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    timeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161618',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        gap: 4,
    },
    timeText: {
        color: '#555',
        fontSize: 10,
        fontWeight: 'bold',
    },
    moreCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#161618',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentBox: {
        marginBottom: 24,
    },
    contentText: {
        color: '#E0E0E0',
        fontSize: 17,
        lineHeight: 26,
        fontWeight: '400',
        letterSpacing: 0.2,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161618',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#222',
        gap: 8,
    },
    likedPill: {
        backgroundColor: 'rgba(255, 45, 85, 0.1)',
        borderColor: 'rgba(255, 45, 85, 0.2)',
    },
    pillText: {
        color: '#888',
        fontSize: 13,
        fontWeight: '800',
    },
});