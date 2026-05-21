import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface UserProfile {
  name: string;
  initials: string;
  course: string;
  semester: string;
  bio: string;
  email: string;
  avatarColor: string;
  connections: number;
  posts: number;
}

// ─── Dados mockados ───────────────────────────────────────────────────────────

const MOCK_USER: UserProfile = {
  name: "Usuário",
  initials: "U",
  course: "Ciência da Computação",
  semester: "5º Semestre",
  bio: "Estudante apaixonado por tecnologia",
  email: "admin@gmail.com",
  avatarColor: "#2E7D8C",
  connections: 48,
  posts: 12,
};

// ─── Componente de Info ───────────────────────────────────────────────────────

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
        <Ionicons
          name={icon}
          size={15}
          color="#6B8BA4"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────

export default function PerfilScreen() {
  const [user] = useState<UserProfile>(MOCK_USER);
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B4F8A" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner + Avatar */}
        <View style={styles.banner}>
          <View style={styles.avatarWrapper}>
            <View
              style={[styles.avatar, { backgroundColor: user.avatarColor }]}
            >
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
          </View>
        </View>

        {/* Conteúdo */}
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
              name={
                connected ? "checkmark-circle-outline" : "person-add-outline"
              }
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
            <InfoRow
              icon="document-text-outline"
              label="Sobre"
              value={user.bio}
            />
            <InfoRow icon="mail-outline" label="Email" value={user.email} />
            <InfoRow icon="school-outline" label="Curso" value={user.course} />
            <InfoRow
              icon="calendar-outline"
              label="Semestre"
              value={user.semester}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF3FA",
  },
  banner: {
    height: 130,
    backgroundColor: "#1B4F8A",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -36,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#EBF3FA",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 26,
  },
  content: {
    marginTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1B4F8A",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  editBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B3A5C",
    marginBottom: 4,
  },
  userCourse: {
    fontSize: 14,
    color: "#6B8BA4",
    marginBottom: 2,
  },
  userSemester: {
    fontSize: 13,
    color: "#9BB5C8",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    gap: 32,
    marginBottom: 16,
    alignSelf: "stretch",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statItem: {
    alignItems: "center",
    gap: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B3A5C",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B8BA4",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#D6E8F5",
  },
  connectBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1B4F8A",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginBottom: 24,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  connectBtnActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#1B4F8A",
  },
  connectBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  connectBtnTextActive: {
    color: "#1B4F8A",
  },
  section: {
    alignSelf: "stretch",
    gap: 10,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    gap: 6,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9BB5C8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoValue: {
    fontSize: 14,
    color: "#2C3E50",
    flex: 1,
  },
});
