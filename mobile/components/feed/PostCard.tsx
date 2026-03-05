import { Edit3, Heart, MessageSquare, MoreHorizontal, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/Theme';
import { usePostStore } from '../../store/usePostStore';

export default function PostCard({ post, currentUserId, onLike }: any) {
    const { updatePost, deletePost, addComment } = usePostStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(post.text);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const isOwner = post.user === currentUserId;
    const isLiked = post.likes.includes(currentUserId);

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{post.userName[0]}</Text>
                </View>
                {showComments && <View style={styles.threadLine} />}
            </View>

            <View style={styles.rightColumn}>
                <View style={styles.header}>
                    <Text style={styles.username}>{post.userName} <Text style={styles.handle}>@{post.userName.toLowerCase().replace(/\s/g, '')} · 1h</Text></Text>
                    <TouchableOpacity><MoreHorizontal color="#71767B" size={18} /></TouchableOpacity>
                </View>

                {isEditing ? (
                    <View style={styles.editBox}>
                        <TextInput style={styles.editInput} value={editText} onChangeText={setEditText} multiline autoFocus />
                        <View style={styles.editActions}>
                            <TouchableOpacity onPress={() => setIsEditing(false)}><Text style={styles.cancelTxt}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { updatePost(post._id, editText); setIsEditing(false); }} style={styles.saveBtn}><Text style={styles.saveBtnTxt}>Update</Text></TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.content}>{post.text}</Text>
                )}

                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.actionItem}>
                        <MessageSquare size={18} color="#71767B" />
                        <Text style={styles.actionNum}>{post.comments.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onLike} style={styles.actionItem}>
                        <Heart size={18} color={isLiked ? '#F91880' : '#71767B'} fill={isLiked ? '#F91880' : 'transparent'} />
                        <Text style={[styles.actionNum, isLiked && { color: '#F91880' }]}>{post.likes.length}</Text>
                    </TouchableOpacity>
                    {isOwner && (
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <TouchableOpacity onPress={() => setIsEditing(true)}><Edit3 size={18} color="#71767B" /></TouchableOpacity>
                            <TouchableOpacity onPress={() => deletePost(post._id)}><Trash2 size={18} color="#F4212E" /></TouchableOpacity>
                        </View>
                    )}
                </View>

                {showComments && (
                    <View style={styles.commentList}>
                        {post.comments.map((c: any, i: number) => (
                            <Text key={i} style={styles.comment}><Text style={styles.commentUser}>{c.userName}</Text> {c.text}</Text>
                        ))}
                        <View style={styles.inputRow}>
                            <TextInput style={styles.miniInput} placeholder="Post your reply" placeholderTextColor="#71767B" value={commentText} onChangeText={setCommentText} />
                            <TouchableOpacity onPress={() => { addComment(post._id, commentText); setCommentText(''); }}><Text style={styles.replyBtn}>Reply</Text></TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#2F3336' },
    leftColumn: { alignItems: 'center', marginRight: 12 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: 'white', fontWeight: 'bold' },
    threadLine: { flex: 1, width: 2, backgroundColor: '#333', marginTop: 4 },
    rightColumn: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    username: { color: 'white', fontWeight: 'bold', fontSize: 15 },
    handle: { color: '#71767B', fontWeight: 'normal' },
    content: { color: '#E7E9EA', fontSize: 15, lineHeight: 20, marginBottom: 12 },
    actions: { flexDirection: 'row', justifyContent: 'space-between', maxWidth: '80%' },
    actionItem: { flexDirection: 'row', alignItems: 'center' },
    actionNum: { color: '#71767B', fontSize: 13, marginLeft: 8 },
    editBox: { backgroundColor: '#16181C', padding: 10, borderRadius: 8, marginBottom: 10 },
    editInput: { color: 'white', fontSize: 15 },
    editActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 15, alignItems: 'center' },
    saveBtn: { backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    saveBtnTxt: { color: 'black', fontWeight: 'bold' },
    cancelTxt: { color: 'white', fontSize: 13 },
    commentList: { marginTop: 12 },
    comment: { color: '#E7E9EA', fontSize: 14, marginBottom: 4 },
    commentUser: { fontWeight: 'bold', color: COLORS.primary },
    inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    miniInput: { flex: 1, color: 'white', fontSize: 14 },
    replyBtn: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 10 }
});