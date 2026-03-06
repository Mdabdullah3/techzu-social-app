import ActionSheet from '@/components/common/ActionSheet';
import { registerForPushNotificationsAsync } from '@/utils/registerForPush';
import { Edit3, MessageSquareText, Search, Send, Share2, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import PostCard from '../../components/feed/PostCard';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';
import { usePostStore } from '../../store/usePostStore';

export default function FeedScreen() {
  // Zustand Stores ( Post Management & Auth )
  const { posts, isLoading, fetchPosts, toggleLike, deletePost, addComment, updatePost } = usePostStore();
  const user = useAuthStore((state) => state.user);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetType, setSheetType] = useState<'options' | 'comments' | 'edit'>('options');
  const [activePost, setActivePost] = useState<any>(null);

  const [commentText, setCommentText] = useState('');
  const [editText, setEditText] = useState('');
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  useEffect(() => { fetchPosts(); }, []);
  // Register for push notifications when user logs in
  useEffect(() => { if (user) registerForPushNotificationsAsync(); }, [user]);

  // Open Action Sheet with specific type (options, comments, edit)
  const openSheet = (post: any, type: 'options' | 'comments' | 'edit') => {
    setActivePost(post);
    setSheetType(type);
    if (type === 'edit') setEditText(post.text);
    setSheetVisible(true);
  };

  // Handle search input changes and fetch posts based on search <query></query>
  const handleSearch = (val: string) => {
    setSearch(val);
    fetchPosts(val);
  };

  // Handle post update logic when saving edited content
  const handleUpdatePost = async () => {
    if (!editText.trim()) return;
    await updatePost(activePost._id, editText);
    setSheetVisible(false);
    Keyboard.dismiss();
  };

  // Handle adding a new comment to the active post
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await addComment(activePost._id, commentText);
    setCommentText('');
    const updated = usePostStore.getState().posts.find(p => p._id === activePost._id);
    setActivePost(updated);
  };

  return (
    <ScreenWrapper scroll={false} includeTop={false}>
      <View style={styles.searchContainer}>
        {/* Search Bar & Clear Button */}
        <View style={[
          styles.searchBar,
          isSearchFocused && styles.searchBarFocused
        ]}>
          <Search
            color={isSearchFocused ? COLORS.primary : "#555"}
            size={18}
            strokeWidth={2.5}
          />
          <TextInput
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            style={styles.searchInput}
            placeholder="Search username..."
            placeholderTextColor="#444"
            value={search}
            onChangeText={handleSearch}
            selectionColor={COLORS.primary}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <View style={styles.clearBtn}>
                <Text style={styles.clearText}>×</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Posts List with Pull-to-Refresh */}
      <View style={{ marginBottom: 160 }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              currentUserId={user?._id ?? ''}
              onLike={() => toggleLike(item._id, user?._id || '')}
              onOpenComments={() => openSheet(item, 'comments')}
              onOpenOptions={() => openSheet(item, 'options')}
            />
          )}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => fetchPosts(search)} tintColor={COLORS.primary} />}
        />
      </View>
      {/* Action Sheet for Post Options, Comments, and Editing */}
      <ActionSheet
        isVisible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title={sheetType === 'edit' ? "Edit Posts" : sheetType === 'options' ? "Management" : "Comments"}
        height={sheetType === 'options' ? 0.45 : 0.95}
      >
        {sheetType === 'options' && (
          <View>
            {user?._id === activePost?.user ? (
              <>
                <TouchableOpacity style={styles.sheetBtn} onPress={() => setSheetType('edit')}>
                  <Edit3 color="white" size={20} />
                  <Text style={styles.sheetBtnText}>Edit Content</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sheetBtn} onPress={() => { deletePost(activePost._id); setSheetVisible(false); }}>
                  <Trash2 color="#FF3B30" size={20} />
                  <Text style={{ color: '#FF3B30', fontSize: 16, marginLeft: 15, fontWeight: '600' }}>Delete Permanently</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.sheetBtn}><Share2 color="white" size={20} /><Text style={styles.sheetBtnText}>Share </Text></TouchableOpacity>
            )}
          </View>
        )}
        {/* Edit Post Sheet  */}
        {sheetType === 'edit' && (
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.editInput}
              value={editText}
              onChangeText={setEditText}
              multiline
              autoFocus
              placeholderTextColor="#444"
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdatePost}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Comments Sheet */}
        {sheetType === 'comments' && (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {activePost?.comments.length === 0 ? (
                <View style={styles.emptyComments}>
                  <MessageSquareText color="#222" size={60} style={{ marginBottom: 10 }} />
                  <Text style={styles.emptyTitle}>No Comments</Text>
                  <Text style={styles.emptySub}> Be the first person to comment .</Text>
                </View>
              ) : (
                activePost?.comments.map((c: any, i: number) => (
                  <View key={i} style={styles.commentCard}>
                    <Text style={styles.cUser}>@{c.userName.toLowerCase()}</Text>
                    <Text style={styles.cText}>{c.text}</Text>
                  </View>
                ))
              )}
            </ScrollView>
            {/* Input Area for Adding New Comment */}
            <View style={styles.inputArea}>
              <TextInput
                style={styles.replyInput}
                placeholder="Write your comment..."
                placeholderTextColor="#555"
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity onPress={handleAddComment} style={styles.sendIcon}>
                <Send color="white" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ActionSheet>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#050505',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D0E',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: '#1A1A1C',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  searchBarFocused: {
    borderColor: COLORS.primary,
    backgroundColor: '#0F0F12',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -2,
  },
  sheetBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#1A1A1A' },
  sheetBtnText: { color: 'white', fontSize: 16, marginLeft: 15, fontWeight: '500' },
  editInput: { color: 'white', fontSize: 18, lineHeight: 26, textAlignVertical: 'top', minHeight: 150, backgroundColor: '#0F0F0F', padding: 15, borderRadius: 15 },
  saveBtn: { backgroundColor: 'white', height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  saveBtnText: { color: 'black', fontWeight: '900', fontSize: 15, textTransform: 'uppercase' },
  commentCard: { marginBottom: 15, borderBottomWidth: 0.5, borderBottomColor: '#111', paddingBottom: 15 },
  cUser: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13, marginBottom: 4 },
  cText: { color: '#E7E9EA', fontSize: 15, lineHeight: 20 },
  emptyComments: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  emptySub: { color: '#444', fontSize: 14, marginTop: 5 },
  inputArea: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingBottom: 40 },
  replyInput: { flex: 1, backgroundColor: '#0F0F0F', color: 'white', borderRadius: 15, paddingHorizontal: 15, minHeight: 50, paddingVertical: 12 },
  sendIcon: { marginLeft: 15, backgroundColor: COLORS.primary, width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }
});