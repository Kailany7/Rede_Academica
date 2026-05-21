import { useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../constants/Colors";
import styles from "./loginStyles";

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", senha: "" });

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

            // Navega para a área principal do app
            onPress={() => router.push('/(app)/(tabs)/onboarding')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
