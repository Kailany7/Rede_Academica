import { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import styles from "./loginStyles";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.senha.trim()) {
      Alert.alert("Atenção", "Preencha o email e a senha.");
      return;
    }

    setCarregando(true);
    try {
      await login({ email: formData.email, senha: formData.senha });
      router.replace("/(auth)/onboarding");
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.message ||
        "Erro ao fazer login. Tente novamente.";
      Alert.alert("Erro", mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="school"
              size={wp("10%")}
              color={Colors.primaryForeground}
            />
          </View>
          <Text style={styles.title}>Rede Social{"\n"}Acadêmica</Text>
          <Text style={styles.subtitle}>
            Conecte-se com estudantes e professores
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity style={styles.toggleButtonActive}>
              <Text style={styles.toggleTextActive}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleButtonInactive}
              onPress={() => router.push("/(auth)/cadastro")}
            >
              <Text style={styles.toggleTextInactive}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.mutedForeground}
            secureTextEntry
            value={formData.senha}
            onChangeText={(text) => setFormData({ ...formData, senha: text })}
          />

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
