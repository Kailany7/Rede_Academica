import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import Colors from "../../constants/Colors";
import styles from "./loginStyles";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    setErro("");

    if (!formData.email.trim() || !formData.senha.trim()) {
      setErro("Preencha o email e a senha.");
      return;
    }

    setCarregando(true);
    try {
      await login({ email: formData.email, senha: formData.senha });
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.message ||
        "Erro ao fazer login. Tente novamente.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="school-outline" size={36} color={Colors.primaryForeground} />
          </View>
          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.toggleButtonInactive}
              onPress={() => router.replace("/(auth)/cadastro")}
            >
              <Text style={styles.toggleTextInactive}>Cadastro</Text>
            </TouchableOpacity>
            <View style={styles.toggleButtonActive}>
              <Text style={styles.toggleTextActive}>Login</Text>
            </View>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => {
              setErro("");
              setFormData({ ...formData, email: text });
            }}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.mutedForeground}
            secureTextEntry
            value={formData.senha}
            onChangeText={(text) => {
              setErro("");
              setFormData({ ...formData, senha: text });
            }}
          />

          {erro ? (
            <View style={erroStyles.container}>
              <Ionicons
                name="alert-circle-outline"
                size={16}
                color={Colors.destructive}
              />
              <Text style={erroStyles.texto}>{erro}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={Colors.primaryForeground} />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const erroStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  texto: {
    color: Colors.destructive,
    fontSize: 13,
    flex: 1,
  },
});