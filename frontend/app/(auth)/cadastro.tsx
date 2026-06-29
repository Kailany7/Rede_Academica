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
import styles from "./cadastroStyles";
import { useAuth } from "../../contexts/AuthContext";

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

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCadastro = async () => {
    if (
      !formData.nome.trim() ||
      !formData.email.trim() ||
      !formData.senha.trim()
    ) {
      Alert.alert("Atenção", "Nome, email e senha são obrigatórios.");
      return;
    }
    if (formData.senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
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
            <TouchableOpacity
              style={styles.toggleButtonInactive}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.toggleTextInactive}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButtonActive}>
              <Text style={styles.toggleTextActive}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome completo</Text>
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
