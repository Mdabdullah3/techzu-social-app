import { create } from "zustand";
import apiClient from "../services/api";

export interface Post {
  _id: string;
  user: string;
  userName: string;
  text: string;
  likes: string[];
  comments: any[];
  createdAt: string;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  fetchPosts: (username?: string) => Promise<void>;
  toggleLike: (postId: string, userId: string) => Promise<void>;
  addPost: (text: string) => Promise<void>;
  // NEW ACTIONS
  updatePost: (postId: string, text: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,

  fetchPosts: async (username) => {
    set({ isLoading: true });
    try {
      const url = username ? `/posts?username=${username}` : "/posts";
      const res = await apiClient.get(url);
      set({ posts: res.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  addPost: async (text) => {
    const res = await apiClient.post("/posts", { text });
    set((state) => ({ posts: [res.data.data, ...state.posts] }));
  },

  updatePost: async (postId, text) => {
    const res = await apiClient.patch(`/posts/${postId}`, { text });
    const updated = res.data.data;
    set((state) => ({
      posts: state.posts.map((p) => (p._id === postId ? updated : p)),
    }));
  },

  deletePost: async (postId) => {
    await apiClient.delete(`/posts/${postId}`);
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== postId),
    }));
  },

  addComment: async (postId, text) => {
    const res = await apiClient.post(`/posts/${postId}/comment`, { text });
    const updatedPost = res.data.data;
    set((state) => ({
      posts: state.posts.map((p) => (p._id === postId ? updatedPost : p)),
    }));
  },

  toggleLike: async (postId, userId) => {
    const previousPosts = get().posts;
    const updatedPosts = previousPosts.map((post) => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(userId);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId],
        };
      }
      return post;
    });
    set({ posts: updatedPosts });
    try {
      await apiClient.post(`/posts/${postId}/like`);
    } catch (error) {
      set({ posts: previousPosts });
    }
  },
}));
