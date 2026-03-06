import { registerForPushNotificationsAsync } from '@/utils/registerForPush';
import { Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TextInput, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import PostCard from '../../components/feed/PostCard';
import { COLORS } from '../../constants/Theme';
import { useAuthStore } from '../../store/useAuthStore';
import { usePostStore } from '../../store/usePostStore';

export default function FeedScreen() {
  const { posts, isLoading, fetchPosts, toggleLike } = usePostStore();
  const user = useAuthStore((state) => state.user);
  const [search, setSearch] = useState('');
  // Initial fetch
  useEffect(() => { fetchPosts(); }, []);
  // Register for push notifications when user is available
  useEffect(() => { if (user) registerForPushNotificationsAsync(); }, [user]);

  return (
    <ScreenWrapper scroll={false} includeTop={false}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#555" size={18} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search network..."
            placeholderTextColor="#444"
            value={search}
            onChangeText={(val) => { setSearch(val); fetchPosts(val); }}
          />
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            currentUserId={user?._id ?? ''}
            onLike={() => toggleLike(item._id, user?._id || '')}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => fetchPosts(search)} tintColor={COLORS.primary} />}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  searchContainer: { padding: 20, backgroundColor: 'black' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0D0D0E', borderRadius: 15, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#1A1A1C' },
  searchInput: { flex: 1, color: 'white', marginLeft: 10 },
});