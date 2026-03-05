import { Edit3, Heart, MessageSquare, Send, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme';
import { Post, usePostStore } from '../../store/usePostStore';

interface Props {
    post: Post;
    currentUserId: string;
    onLike: () => void;
}

export default function PostCard({ post, currentUserId, onLike }: Props) {
    const { updatePost, deletePost, addComment } = usePostStore();

    // Local UI States
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(post.text);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const isOwner = post.user === currentUserId;
    const isLiked = post.likes.includes(currentUserId);

    const handleUpdate = async () => {
        await updatePost(post._id, editText);
        setIsEditing(false);
    };

    const handleDelete = () => {
        Alert.alert("Delete Post", "Are you sure?", [
            { text: "Cancel" },
            { text: "Delete", style: 'destructive', onPress: () => deletePost(post._id) }
        ]);
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        await addComment(post._id, commentText);
        setCommentText('');
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatar}><Text style={styles.avatarText}>{post.userName[0].toUpperCase()}</Text></View>
                <Text style={styles.username}>@{post.userName}</Text>

                {isOwner && (
                    <View style={styles.ownerActions}>
                        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}><Edit3 size={18} color={COLORS.primary} /></TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={{ marginLeft: 15 }}><Trash2 size={18} color={COLORS.error} /></TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Content / Edit Mode */}
            {isEditing ? (
                <View>
                    <TextInput style={styles.editInput} value={editText} onChangeText={setEditText} multiline />
                    <TouchableOpacity onPress={handleUpdate} style={styles.saveBtn}><Text style={{ color: 'white' }}>Save Changes</Text></TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.content}>{post.text}</Text>
            )}

            {/* Actions */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
                    <Heart size={20} color={isLiked ? COLORS.error : COLORS.textMuted} fill={isLiked ? COLORS.error : 'transparent'} />
                    <Text style={[styles.actionText, isLiked && { color: COLORS.error }]}>{post.likes.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.actionBtn}>
                    <MessageSquare size={20} color={COLORS.textMuted} />
                    <Text style={styles.actionText}>{post.comments.length}</Text>
                </TouchableOpacity>
            </View>

            {/* Comment Section */}
            {showComments && (
                <View style={styles.commentSection}>
                    {post.comments.map((c, i) => (
                        <View key={i} style={styles.commentItem}>
                            <Text style={styles.commentUser}>{c.userName}: <Text style={styles.commentText}>{c.text}</Text></Text>
                        </View>
                    ))}
                    <View style={styles.commentInputRow}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            placeholderTextColor={COLORS.textMuted}
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                        <TouchableOpacity onPress={handleAddComment}><Send size={20} color={COLORS.primary} /></TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    avatarText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    username: { color: 'white', fontWeight: 'bold', flex: 1 },
    ownerActions: { flexDirection: 'row' },
    content: { color: 'white', fontSize: 16, lineHeight: 22, marginBottom: 12 },
    editInput: { backgroundColor: COLORS.surfaceLight, color: 'white', padding: 10, borderRadius: 8, marginBottom: 10 },
    saveBtn: { backgroundColor: COLORS.primary, padding: 8, borderRadius: 8, alignItems: 'center' },
    footer: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 25 },
    actionText: { color: COLORS.textMuted, marginLeft: 6, fontWeight: '600' },
    commentSection: { marginTop: 15, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: COLORS.border },
    commentItem: { marginBottom: 8 },
    commentUser: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13 },
    commentText: { color: 'white', fontWeight: 'normal' },
    commentInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    commentInput: { flex: 1, color: 'white', fontSize: 14, paddingRight: 10 }
});