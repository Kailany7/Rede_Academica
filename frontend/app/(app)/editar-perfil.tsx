import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import styles from "./styles/editarPerfilStyles";
import { getMyPerfil, updatePerfil } from "../../services/perfilApi";

interface FormData {
  nome: string;
  curso: string;
  semestre: string;
  bio: string;
  experiences: Experience[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function EditarPerfilScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    curso: "",
    semestre: "",
    bio: "",
    experiences: [],
  });
  const [salvando, setSalvando] = useState<boolean>(false);

  // Carregar perfil atual do backend
  useEffect(() => {
    getMyPerfil()
      .then((data) => {
        setFormData({
          nome: data.nome,
          curso: data.curso,
          semestre: data.semestre,
          bio: data.bio,
          experiences: data.experiences || [],
        });
      })
      .catch((err) => console.error("Erro ao carregar perfil:", err));
  }, []);

  const handleChange = (campo: keyof FormData, valor: string): void => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ): void => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };

  const handleSalvar = async (): Promise<void> => {
    setSalvando(true);
    try {
      await updatePerfil(formData);
      router.back();
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
    } finally {
      setSalvando(false);
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
        <View style={styles.card}>
          {/* Botão Salvar */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSalvar}
            disabled={salvando}
          >
            <Ionicons
              name={salvando ? "hourglass-outline" : "save-outline"}
              size={18}
              color={Colors.primaryForeground}
            />
            <Text style={styles.buttonText}>
              {salvando ? "Salvando..." : "Salvar alterações"}
            </Text>
          </TouchableOpacity>

          {/* Campo Nome */}
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(text) => handleChange("nome", text)}
            placeholder="Digite seu nome completo"
            placeholderTextColor={Colors.mutedForeground}
          />

          {/* Campo Curso */}
          <Text style={styles.label}>Curso</Text>
          <TextInput
            style={styles.input}
            value={formData.curso}
            onChangeText={(text) => handleChange("curso", text)}
            placeholder="Digite seu curso"
            placeholderTextColor={Colors.mutedForeground}
          />

          {/* Campo Semestre */}
          <Text style={styles.label}>Semestre</Text>
          <TextInput
            style={styles.input}
            value={formData.semestre}
            onChangeText={(text) => handleChange("semestre", text)}
            placeholder="Ex: 5º Semestre"
            placeholderTextColor={Colors.mutedForeground}
          />

          {/* Campo Bio */}
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.inputBio}
            value={formData.bio}
            onChangeText={(text) => handleChange("bio", text)}
            placeholder="Fale um pouco sobre você..."
            placeholderTextColor={Colors.mutedForeground}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Experiências */}
          <Text style={styles.label}>Experiências</Text>
          {formData.experiences.map((experience, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                padding: 14,
                borderRadius: 12,
                backgroundColor: "#F7FAFD",
              }}
            >
              <Text style={styles.label}>Cargo</Text>
              <TextInput
                style={styles.input}
                value={experience.title}
                onChangeText={(text) =>
                  handleExperienceChange(index, "title", text)
                }
                placeholder="Ex: Desenvolvedor Front-End"
                placeholderTextColor={Colors.mutedForeground}
              />

              <Text style={styles.label}>Empresa</Text>
              <TextInput
                style={styles.input}
                value={experience.company}
                onChangeText={(text) =>
                  handleExperienceChange(index, "company", text)
                }
                placeholder="Ex: Empresa X"
                placeholderTextColor={Colors.mutedForeground}
              />

              <Text style={styles.label}>Período</Text>
              <TextInput
                style={styles.input}
                value={experience.period}
                onChangeText={(text) =>
                  handleExperienceChange(index, "period", text)
                }
                placeholder="Ex: jan de 2025 · o momento"
                placeholderTextColor={Colors.mutedForeground}
              />

              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={styles.inputBio}
                value={experience.description}
                onChangeText={(text) =>
                  handleExperienceChange(index, "description", text)
                }
                placeholder="Descreva suas atividades"
                placeholderTextColor={Colors.mutedForeground}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          ))}

          {/* Botão Cancelar */}
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}