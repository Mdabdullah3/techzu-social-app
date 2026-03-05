import { registerForPushNotificationsAsync } from '@/utils/registerForPush';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import PostCard from '../../components/feed/PostCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { COLORS, SIZES } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';
import { usePostStore } from '../../store/usePostStore';
export default function FeedScreen() {
  const { posts, isLoading, fetchPosts, toggleLike, addPost } = usePostStore();
  const user = useAuthStore((state) => state.user);

  const [newPostText, setNewPostText] = useState('');
  const [search, setSearch] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;
    setIsPosting(true);
    await addPost(newPostText);
    setNewPostText('');
    setIsPosting(false);
  };
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        if (user) {
          await registerForPushNotificationsAsync();
        }
      } catch (e) {
        console.error("Critical fail in notification setup", e);
      }
    };

    setupNotifications();
  }, [user]);
  return (
    <ScreenWrapper scroll={false} includeTop={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Feed</Text>
        <Input
          placeholder="Filter by username..."
          value={search}
          onChangeText={(val: string) => {
            setSearch(val);
            fetchPosts(val);
          }}
        />
      </View>

      {/* 2. Create Post Section */}
      <View style={styles.createPostCard}>
        <Input
          placeholder="What's happening?"
          value={newPostText}
          onChangeText={setNewPostText}
          multiline
        />
        <Button
          title="Post"
          onPress={handleCreatePost}
          loading={isPosting}
          style={styles.postBtn}
        />
      </View>

      {/* 3. The Feed */}
      {isLoading && posts.length === 0 ? (
        <ActivityIndicator color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onLike={() => {
                if (user?._id) {
                  toggleLike(item._id, user._id);
                }
              }}
              currentUserId={user?._id ?? ''}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => fetchPosts(search)}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No posts found. Start the conversation!</Text>
          }
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerContainer: { paddingHorizontal: 16, paddingTop: 20 },
  greeting: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  createPostCard: {
    padding: 16,
    backgroundColor: COLORS.background,
    margin: 16,
    borderRadius: 20,
    width: SIZES.isTablet ? '60%' : '92%',
    alignSelf: 'center'
  },
  postBtn: { height: 45, marginTop: -10 },
  listContent: { padding: 16, paddingBottom: 120 },
  emptyText: { color: COLORS.textMuted, textAlign: 'center', marginTop: 40 },
});