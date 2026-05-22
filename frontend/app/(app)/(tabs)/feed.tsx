import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Stories from '../../../components/Stories'

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Post {
  id: string;
  author: string;
  initials: string;
  course: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  avatarColor: string;
}

// ─── Dados mockados ───────────────────────────────────────────────────────────

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    author: "Maria Santos",
    initials: "MS",
    course: "Engenharia de Software",
    time: "Há 2 horas",
    content:
      "Pessoal, alguém sabe algum material bom sobre algoritmos de ordenação? Estou estudando para a prova e queria me aprofundar mais no tema!",
    likes: 12,
    comments: 1,
    liked: false,
    avatarColor: "#1B4F8A",
  },
  {
    id: "2",
    author: "Carlos Oliveira",
    initials: "CO",
    course: "Sistemas de Informação",
    time: "Há 5 horas",
    content:
      "Acabei de terminar meu projeto de banco de dados! Foi desafiador, mas aprendi muito sobre normalização e otimização de queries. Alguém mais trabalhando com SQL?",
    likes: 8,
    comments: 0,
    liked: false,
    avatarColor: "#2E7D8C",
  },
  {
    id: "3",
    author: "Ana Paula",
    initials: "AP",
    course: "Ciência da Computação",
    time: "Há 8 horas",
    content:
      "Galera, tem monitoria de Cálculo II amanhã às 14h na sala 203. Quem quiser ir é só aparecer! Vamos revisar integrais e séries.",
    likes: 24,
    comments: 5,
    liked: true,
    avatarColor: "#5B3FA6",
  },
  {
    id: "4",
    author: "Lucas Ferreira",
    initials: "LF",
    course: "Engenharia de Software",
    time: "Há 10 horas",
    content:
      "Acabei de subir meu primeiro projeto React Native no GitHub! Foi bem trabalhoso mas valeu muito a experiência. Compartilho o link pra quem quiser dar uma olhada.",
    likes: 31,
    comments: 7,
    liked: false,
    avatarColor: "#C0392B",
  },
];

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.avatarSkeleton, styles.skeleton]} />
        <View style={{ flex: 1, gap: 6 }}>
          <View
            style={[
              styles.skeleton,
              { height: 13, width: "55%", borderRadius: 4 },
            ]}
          />
          <View
            style={[
              styles.skeleton,
              { height: 11, width: "40%", borderRadius: 4 },
            ]}
          />
        </View>
      </View>
      <View style={{ gap: 6, marginTop: 10 }}>
        <View
          style={[
            styles.skeleton,
            { height: 11, width: "100%", borderRadius: 4 },
          ]}
        />
        <View
          style={[
            styles.skeleton,
            { height: 11, width: "90%", borderRadius: 4 },
          ]}
        />
        <View
          style={[
            styles.skeleton,
            { height: 11, width: "70%", borderRadius: 4 },
          ]}
        />
      </View>
      <View
        style={[
          styles.skeleton,
          { height: 1, marginVertical: 12, borderRadius: 1 },
        ]}
      />
      <View style={{ flexDirection: "row", gap: 20 }}>
        <View
          style={[styles.skeleton, { height: 13, width: 50, borderRadius: 4 }]}
        />
        <View
          style={[styles.skeleton, { height: 13, width: 50, borderRadius: 4 }]}
        />
      </View>
    </View>
  );
}

// ─── Card de Post ─────────────────────────────────────────────────────────────

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

function PostCard({ post, onLike }: PostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, { backgroundColor: post.avatarColor }]}>
          <Text style={styles.avatarText}>{post.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.authorName}>{post.author}</Text>
          <Text style={styles.authorMeta}>{post.course}</Text>
          <Text style={styles.authorMeta}>{post.time}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onLike(post.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={post.liked ? "heart" : "heart-outline"}
            size={20}
            color={post.liked ? "#E74C3C" : "#888"}
          />
          <Text style={[styles.actionText, post.liked && { color: "#E74C3C" }]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={20} color="#888" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
          }
          : p,
      ),
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard post={item} onLike={handleLike} />
  );

  const renderSkeletons = () => (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EBF3FA" />

      {loading ? (
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={renderSkeletons}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          ListHeaderComponent={
            <Stories
              currentUser={{
                name: 'Pedro Lira'
              }}
            />
          }
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#1B4F8A"]}
              tintColor="#1B4F8A"
            />
          }
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

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF3FA",
  },
  listContent: {
    padding: 12,
    gap: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B3A5C",
  },
  authorMeta: {
    fontSize: 12,
    color: "#6B8BA4",
    marginTop: 1,
  },
  postContent: {
    fontSize: 14,
    color: "#2C3E50",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#EBF3FA",
    marginVertical: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  // Skeleton
  skeleton: {
    backgroundColor: "#E8EFF5",
    opacity: 0.8,
  },
  avatarSkeleton: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  // Empty state
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
