import { Check, Clock, Edit3, Heart, MessageSquare, Send, ShieldCheck, Trash2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme';
import { Post, usePostStore } from '../../store/usePostStore';

interface PostCardProps {
    post: Post;
    currentUserId: string;
    onLike: () => void;
}

export default function PostCard({ post, currentUserId, onLike }: PostCardProps) {
    const { updatePost, deletePost, addComment } = usePostStore();

    // Local UI States
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(post.text);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const isLiked = post.likes.includes(currentUserId);
    const isOwner = post.user === currentUserId;
    const handle = `@${post.userName.toLowerCase().replace(/\s/g, '_')}`;

    const handleSaveEdit = async () => {
        if (!editText.trim()) return;
        await updatePost(post._id, editText);
        setIsEditing(false);
    };

    const handleDelete = () => {
        Alert.alert("Delete", "Remove this broadcast?", [
            { text: "Cancel" },
            { text: "Delete", style: 'destructive', onPress: () => deletePost(post._id) }
        ]);
    };

    return (
        <View style={styles.cardContainer}>
            {/* 1. Header */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}><Text style={styles.avatarText}>{post.userName[0]}</Text></View>
                    <View>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{post.userName}</Text>
                            <ShieldCheck size={14} color={COLORS.primary} fill={COLORS.primary} style={{ marginLeft: 4 }} />
                        </View>
                        <Text style={styles.handle}>{handle}</Text>
                    </View>
                </View>

                {isOwner && (
                    <View style={styles.ownerActions}>
                        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.iconBtn}>
                            {isEditing ? <X color="#666" size={20} /> : <Edit3 color={COLORS.primary} size={20} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.iconBtn}>
                            <Trash2 color="#FF3B30" size={20} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* 2. Content / Edit Mode */}
            <View style={styles.contentBox}>
                {isEditing ? (
                    <View style={styles.editArea}>
                        <TextInput
                            style={styles.editInput}
                            value={editText}
                            onChangeText={setEditText}
                            multiline
                            autoFocus
                        />
                        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit}>
                            <Check color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={styles.contentText}>{post.text}</Text>
                )}
            </View>

            {/* 3. Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={onLike} style={[styles.pill, isLiked && styles.likedPill]}>
                    <Heart size={18} color={isLiked ? '#FF2D55' : '#888'} fill={isLiked ? '#FF2D55' : 'transparent'} />
                    <Text style={[styles.pillText, isLiked && { color: 'white' }]}>{post.likes.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowComments(!showComments)} style={[styles.pill, showComments && styles.activePill]}>
                    <MessageSquare size={18} color={showComments ? COLORS.primary : "#888"} />
                    <Text style={[styles.pillText, showComments && { color: 'white' }]}>{post.comments.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Share.share({ message: post.text })} style={styles.pill}>
                    <Clock size={18} color="#888" />
                </TouchableOpacity>
            </View>

            {/* 4. Inline Comments */}
            {showComments && (
                <View style={styles.commentSection}>
                    {post.comments.map((c, i) => (
                        <View key={i} style={styles.commentItem}>
                            <Text style={styles.cUser}>@{c.userName.toLowerCase()}: <Text style={styles.cText}>{c.text}</Text></Text>
                        </View>
                    ))}
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.miniInput}
                            placeholder="Add comment..."
                            placeholderTextColor="#444"
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                        <TouchableOpacity onPress={async () => { await addComment(post._id, commentText); setCommentText(''); }}>
                            <Send size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: { backgroundColor: '#0D0D0E', borderRadius: 24, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1A1A1C', marginHorizontal: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#1A1A1C', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    avatarText: { color: COLORS.primary, fontWeight: 'bold' },
    nameRow: { flexDirection: 'row', alignItems: 'center' },
    name: { color: 'white', fontWeight: 'bold', fontSize: 15 },
    handle: { color: '#666', fontSize: 11 },
    ownerActions: { flexDirection: 'row', gap: 10 },
    iconBtn: { padding: 5 },
    contentBox: { marginBottom: 15 },
    contentText: { color: '#E0E0E0', fontSize: 16, lineHeight: 22 },
    editArea: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    editInput: { flex: 1, color: 'white', backgroundColor: '#161618', padding: 10, borderRadius: 10, fontSize: 16 },
    saveBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 10 },
    footer: { flexDirection: 'row', gap: 10 },
    pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#161618', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 15, gap: 6 },
    likedPill: { backgroundColor: 'rgba(255, 45, 85, 0.1)' },
    activePill: { backgroundColor: 'rgba(168, 85, 247, 0.1)' },
    pillText: { color: '#888', fontSize: 12, fontWeight: 'bold' },
    commentSection: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#1A1A1C' },
    commentItem: { marginBottom: 8 },
    cUser: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13 },
    cText: { color: '#AAA', fontWeight: 'normal' },
    inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: '#161618', borderRadius: 10, paddingHorizontal: 10 },
    miniInput: { flex: 1, color: 'white', height: 40, fontSize: 13 }
});