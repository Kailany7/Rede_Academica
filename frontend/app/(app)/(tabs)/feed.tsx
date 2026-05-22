import React, { useState, useEffect } from "react";

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
import { usePosts } from '../../../contexts/postContext'
// ─── Tipos ─────────────────────────────────────────────────────────────

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

interface FeedPost {
  id: string;
  author: string;
  authorCourse: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

// ─── Dados Mockados ───────────────────────────────────────────────────

const MOCK_POSTS: FeedPost[] = [
  {
    id: "1",
    author: "Maria Santos",
    authorCourse: "Engenharia de Software",
    authorAvatar: "#1B4F8A",
    timestamp: "Há 2 horas",
    content:
      "Pessoal, alguém sabe algum material bom sobre algoritmos de ordenação?",
    likes: 12,
    isLiked: false,
    comments: [
      {
        id: "1",
        author: "Pedro",
        authorAvatar: "#2E7D8C",
        content: "Tenho um PDF muito bom sobre isso!",
        timestamp: "Agora",
      },
    ],
  },

  {
    id: "2",
    author: "Carlos Oliveira",
    authorCourse: "Sistemas de Informação",
    authorAvatar: "#2E7D8C",
    timestamp: "Há 5 horas",
    content:
      "Acabei de terminar meu projeto de banco de dados! Foi desafiador mas aprendi muito.",
    likes: 8,
    isLiked: false,
    comments: [],
  },

  {
    id: "3",
    author: "Ana Paula",
    authorCourse: "Ciência da Computação",
    authorAvatar: "#5B3FA6",
    timestamp: "Há 8 horas",
    content:
      "Galera, tem monitoria de Cálculo II amanhã às 14h na sala 203.",
    likes: 24,
    isLiked: true,
    comments: [],
  },
  {
    id: "4",
    author: "Usuário",
    authorCourse: "Ciência da Computação",
    authorAvatar: "#2E7D8C",
    timestamp: "Agora",
    content: "Esse é meu primeiro post na rede acadêmica!",
    likes: 3,
    isLiked: false,
    comments: [],
  },
];

// ─── Tela Principal ───────────────────────────────────────────────────

export default function FeedScreen() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { newPosts } = usePosts()


  // Simulação carregamento
  const loadPosts = () => {
    setTimeout(() => {
      setPosts(MOCK_POSTS);

      setLoading(false);
      setRefreshing(false);
    }, 1200);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const allPosts = [
  ...newPosts,
  ...posts
]

  // Atualizar feed
  const handleRefresh = () => {
    setRefreshing(true);

    loadPosts();
  };

  // Curtir publicação
  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked
              ? post.likes - 1
              : post.likes + 1,
          }
          : post
      )
    );
  };

  // Comentar publicação
  const handleComment = (id: string, comment: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                author: "Usuário",
                authorAvatar: "#1B4F8A",
                content: comment,
                timestamp: "Agora",
              },
            ],
          }
          : post
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#EBF3FA"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Ionicons
            name="school"
            size={42}
            color="#1B4F8A"
          />

          <Text style={styles.loadingText}>
            Carregando feed...
          </Text>
        </View>
      ) : (
        <FlatList
          data={allPosts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#1B4F8A"]}
              tintColor="#1B4F8A"
            />
          }

          // STORIES NO TOPO
          ListHeaderComponent={
            <Stories
              currentUser={{
                name: "Usuário",
              }}
            />
          }

          // RENDER DOS POSTS
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
              onLike={handleLike}
            />
          )}

          // Caso não existam posts
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name="newspaper-outline"
                size={48}
                color="#B0C4D8"
              />

              <Text style={styles.emptyText}>
                Nenhuma publicação ainda
              </Text>

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

// ─── Estilos ──────────────────────────────────────────────────────────

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