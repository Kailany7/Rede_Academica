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
import styles from "./cadastroStyles";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  curso: string;
  bio: string;
}

export default function CadastroScreen() {
  const router = useRouter();
  const { cadastrar } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    curso: "",
    bio: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (field: keyof FormData, value: string) => {
    setErro("");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCadastro = async () => {
    setErro("");

    if (
      !formData.nome.trim() ||
      !formData.email.trim() ||
      !formData.senha.trim()
    ) {
      setErro("Nome, email e senha são obrigatórios.");
      return;
    }
    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);
    try {
      await cadastrar(formData);
      router.replace("/(auth)/onboarding");
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.message ||
        "Erro ao criar conta. Tente novamente.";
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
            <Ionicons name="person-add-outline" size={36} color={Colors.primaryForeground} />
          </View>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Junte-se à rede acadêmica</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleButtonActive}>
              <Text style={styles.toggleTextActive}>Cadastro</Text>
            </View>
            <TouchableOpacity
              style={styles.toggleButtonInactive}
              onPress={() => router.replace("/(auth)/login")}
            >
              <Text style={styles.toggleTextInactive}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome completo"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.nome}
            onChangeText={(t) => handleChange("nome", t)}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email institucional"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.email}
            onChangeText={(t) => handleChange("email", t)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.senha}
            onChangeText={(t) => handleChange("senha", t)}
            secureTextEntry
          />

          <Text style={styles.label}>Curso</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Sistemas de Informação"
            placeholderTextColor={Colors.mutedForeground}
            value={formData.curso}
            onChangeText={(t) => handleChange("curso", t)}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.inputBio}
            placeholder="Fale um pouco sobre você e seus interesses acadêmicos..."
            placeholderTextColor={Colors.mutedForeground}
            value={formData.bio}
            onChangeText={(t) => handleChange("bio", t)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
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
            onPress={handleCadastro}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={Colors.primaryForeground} />
            ) : (
              <Text style={styles.buttonText}>Criar conta</Text>
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