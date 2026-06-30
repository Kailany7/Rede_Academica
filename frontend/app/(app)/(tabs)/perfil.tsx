import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PostCard from "../../../components/PostCard";
import styles from "../styles/perfilStyles";
import { usePosts } from "../../../contexts/postContext";
import { getMyPerfil } from "../../../services/perfilApi";

interface UserProfile {
  name: string;
  initials: string;
  course: string;
  semester: string;
  bio: string;
  experience: string;
  email: string;
  avatarColor: string;
  connections: number;
  posts: number;
}

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueRow}>
        <Ionicons name={icon} size={15} color="#6B8BA4" style={{ marginRight: 6 }} />
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function PerfilScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [connected, setConnected] = useState(false);
  const { posts, toggleLike, addComment } = usePosts();
  const router = useRouter();

  useEffect(() => {
  getMyPerfil()
    .then((data) => {
      setUser({
        name: data.nome,
        initials: data.nome[0],
        course: data.curso,
        semester: data.semestre,
        bio: data.bio,
        email: data.email,
        avatarColor: data.avatarColor || "#2E7D8C",
        connections: data.connections || 0,
        posts: data.posts || 0,
        experience: data.experiences?.map((e: any) => e.title).join("; ") || "",
      });
    })
    .catch((err) => console.error("Erro ao carregar perfil:", err));
}, []);


  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando perfil...</Text>
      </SafeAreaView>
    );
  }

  const userPosts = posts.filter((post) => post.author === user.name);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B4F8A" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner + Avatar */}
        <View style={styles.banner}>
          <View style={styles.avatarWrapper}>
            <View style={[styles.avatar, { backgroundColor: user.avatarColor }]}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Botão Editar Perfil */}
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.8}
            onPress={() => router.push("/editar-perfil")}
          >
            <Ionicons name="pencil-outline" size={16} color="#FFFFFF" />
            <Text style={styles.editBtnText}>Editar perfil</Text>
          </TouchableOpacity>

          {/* Nome e curso */}
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userCourse}>{user.course}</Text>
          <Text style={styles.userSemester}>{user.semester}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Publicações</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.connections}</Text>
              <Text style={styles.statLabel}>Conexões</Text>
            </View>
          </View>

          {/* Botão Conectar */}
          <TouchableOpacity
            style={[styles.connectBtn, connected && styles.connectBtnActive]}
            activeOpacity={0.8}
            onPress={() => setConnected((prev) => !prev)}
          >
            <Ionicons
              name={connected ? "checkmark-circle-outline" : "person-add-outline"}
              size={16}
              color={connected ? "#1B4F8A" : "#FFFFFF"}
            />
            <Text
              style={[
                styles.connectBtnText,
                connected && styles.connectBtnTextActive,
              ]}
            >
              {connected ? "Conectado" : "Conectar"}
            </Text>
          </TouchableOpacity>

          {/* Informações */}
          <View style={styles.section}>
            <InfoRow icon="document-text-outline" label="Sobre" value={user.bio} />
            <InfoRow icon="mail-outline" label="Email" value={user.email} />
            <InfoRow icon="school-outline" label="Curso" value={user.course} />
            <InfoRow icon="calendar-outline" label="Semestre" value={user.semester} />
          </View>

          {/* POSTS */}
          <View style={styles.postsContainer}>
            <Text style={styles.postsTitle}>Publicações</Text>
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                author={post.author}
                course={post.authorCourse}
                content={post.content}
                timestamp={post.timestamp}
                likes={post.likes}
                comments={post.comments}
                liked={post.isLiked}
                avatarColor={post.authorAvatar}
                onLike={toggleLike}
                onComment={addComment}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// estilos mantidos iguais...
