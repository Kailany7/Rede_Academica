import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import styles from "../styles/criarPublicacaoStyles";

import { usePosts } from "../../../contexts/postContext";

export default function CriarPublicacao() {
  const [content, setContent] = useState("");
  const { addPost } = usePosts();

  const handleSubmit = async () => {
    if (content.trim()) {
      await addPost(content);
      setContent("");
      router.push("/feed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="create-outline" size={34} color="white" />
            </View>
            <Text style={styles.title}>Nova Publicação</Text>
            <Text style={styles.subtitle}>
              Compartilhe ideias, dúvidas e experiências com seus colegas
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.userContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>U</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Usuário</Text>
                <Text style={styles.userCourse}>Ciência da Computação</Text>
              </View>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Sua publicação</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="No que você está pensando?"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                style={styles.textArea}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!content.trim()}
                  style={[
                    styles.button,
                    !content.trim() && styles.buttonDisabled,
                  ]}
                >
                  <Ionicons name="send" size={18} color="white" />
                  <Text style={styles.buttonText}>Publicar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
