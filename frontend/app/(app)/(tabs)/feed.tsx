import React from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Stories from "../../../components/Stories";
import Post from "../../../components/PostCard";
import { usePosts } from "../../../contexts/postContext";

export default function FeedScreen() {
  const { posts, loading, refreshing, fetchPosts, toggleLike, addComment } = usePosts();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EBF3FA" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="school" size={42} color="#1B4F8A" />
          <Text style={styles.loadingText}>Carregando feed...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                fetchPosts();
              }}
              colors={["#1B4F8A"]}
              tintColor="#1B4F8A"
            />
          }
          ListHeaderComponent={
            <Stories
              currentUser={{
                name: "Usuário",
              }}
            />
          }
          renderItem={({ item }) => (
            <Post
              id={item.id}
              author={item.author}
              course={item.authorCourse}
              avatarColor={item.authorAvatar}
              content={item.content}
              timestamp={item.timestamp}
              likes={item.likes}
              comments={item.comments}
              liked={item.isLiked}
              onLike={toggleLike}
              onComment={addComment}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="newspaper-outline" size={48} color="#B0C4D8" />
              <Text style={styles.emptyText}>Nenhuma publicação ainda</Text>
              <Text style={styles.emptySubText}>
                Seja o primeiro a compartilhar algo!
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF3FA",
  },
  listContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  loadingText: {
    fontSize: 16,
    color: "#1B4F8A",
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B8BA4",
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 13,
    color: "#9BB5C8",
  },
});
