import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Connection {
  id: string;
  name: string;
  initials: string;
  course: string;
  semester: string;
  avatarColor: string;
  status: "connected" | "pending" | "suggestion";
}

// ─── Dados mockados ───────────────────────────────────────────────────────────

const MOCK_CONNECTIONS: Connection[] = [
  {
    id: "1",
    name: "Maria Santos",
    initials: "MS",
    course: "Engenharia de Software",
    semester: "5º Semestre",
    avatarColor: "#1B4F8A",
    status: "connected",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    initials: "CO",
    course: "Sistemas de Informação",
    semester: "3º Semestre",
    avatarColor: "#2E7D8C",
    status: "connected",
  },
  {
    id: "3",
    name: "Ana Paula",
    initials: "AP",
    course: "Ciência da Computação",
    semester: "7º Semestre",
    avatarColor: "#5B3FA6",
    status: "connected",
  },
];

const MOCK_PENDING: Connection[] = [
  {
    id: "4",
    name: "Pedro Lima",
    initials: "PL",
    course: "Engenharia de Software",
    semester: "4º Semestre",
    avatarColor: "#C0392B",
    status: "pending",
  },
  {
    id: "5",
    name: "Julia Ramos",
    initials: "JR",
    course: "Ciência da Computação",
    semester: "6º Semestre",
    avatarColor: "#1A7A4A",
    status: "pending",
  },
];

const MOCK_SUGGESTIONS: Connection[] = [
  {
    id: "6",
    name: "Lucas Ferreira",
    initials: "LF",
    course: "Sistemas de Informação",
    semester: "5º Semestre",
    avatarColor: "#B7770D",
    status: "suggestion",
  },
  {
    id: "7",
    name: "Beatriz Costa",
    initials: "BC",
    course: "Engenharia de Software",
    semester: "3º Semestre",
    avatarColor: "#7D3C98",
    status: "suggestion",
  },
  {
    id: "8",
    name: "Rafael Mendes",
    initials: "RM",
    course: "Ciência da Computação",
    semester: "8º Semestre",
    avatarColor: "#2E4057",
    status: "suggestion",
  },
];

// ─── Abas ─────────────────────────────────────────────────────────────────────

type Tab = "minhaRede" | "solicitacoes" | "sugestoes";

const TABS: { key: Tab; label: string }[] = [
  { key: "minhaRede", label: "Minha Rede" },
  { key: "solicitacoes", label: "Solicitações" },
  { key: "sugestoes", label: "Sugestões" },
];

// ─── Card de Conexão ──────────────────────────────────────────────────────────

interface ConnectionCardProps {
  item: Connection;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onConnect?: (id: string) => void;
  onRemove?: (id: string) => void;
  sentRequests?: Set<string>;
}

function ConnectionCard({
  item,
  onAccept,
  onReject,
  onConnect,
  onRemove,
  sentRequests,
}: ConnectionCardProps) {
  const isSent = sentRequests?.has(item.id);

  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.personName}>{item.name}</Text>
          <Text style={styles.personCourse}>{item.course}</Text>
          <Text style={styles.personSemester}>{item.semester}</Text>
        </View>
      </View>

      {/* Ações: Minha Rede */}
      {item.status === "connected" && onRemove && (
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="person-remove-outline" size={18} color="#E74C3C" />
        </TouchableOpacity>
      )}

      {/* Ações: Solicitações */}
      {item.status === "pending" && (
        <View style={styles.pendingActions}>
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => onAccept?.(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.acceptBtnText}>Aceitar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => onReject?.(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.rejectBtnText}>Recusar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Ações: Sugestões */}
      {item.status === "suggestion" && (
        <TouchableOpacity
          style={[styles.connectBtn, isSent && styles.connectBtnSent]}
          onPress={() => !isSent && onConnect?.(item.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isSent ? "checkmark-outline" : "person-add-outline"}
            size={14}
            color={isSent ? "#1B4F8A" : "#FFFFFF"}
          />
          <Text
            style={[styles.connectBtnText, isSent && styles.connectBtnTextSent]}
          >
            {isSent ? "Enviado" : "Conectar"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────

export default function RedeConexoesScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("minhaRede");
  const [connections, setConnections] =
    useState<Connection[]>(MOCK_CONNECTIONS);
  const [pending, setPending] = useState<Connection[]>(MOCK_PENDING);
  const [suggestions] = useState<Connection[]>(MOCK_SUGGESTIONS);
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  const handleRemove = (id: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAccept = (id: string) => {
    const person = pending.find((p) => p.id === id);
    if (person) {
      setConnections((prev) => [...prev, { ...person, status: "connected" }]);
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleReject = (id: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
  };

  const handleConnect = (id: string) => {
    setSentRequests((prev) => new Set(prev).add(id));
  };

  const currentData =
    activeTab === "minhaRede"
      ? connections
      : activeTab === "solicitacoes"
        ? pending
        : suggestions;

  const emptyMessages: Record<
    Tab,
    { icon: keyof typeof Ionicons.glyphMap; text: string; sub: string }
  > = {
    minhaRede: {
      icon: "people-outline",
      text: "Nenhuma conexão ainda",
      sub: "Explore sugestões e conecte-se com colegas!",
    },
    solicitacoes: {
      icon: "person-add-outline",
      text: "Nenhuma solicitação pendente",
      sub: "Quando alguém te enviar um pedido, aparece aqui.",
    },
    sugestoes: {
      icon: "bulb-outline",
      text: "Sem sugestões no momento",
      sub: "Volte mais tarde para ver novos colegas.",
    },
  };

  const empty = emptyMessages[activeTab];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EBF3FA" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rede de Conexões</Text>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>{connections.length}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
            {tab.key === "solicitacoes" && pending.length > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{pending.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConnectionCard
            item={item}
            onAccept={handleAccept}
            onReject={handleReject}
            onConnect={handleConnect}
            onRemove={handleRemove}
            sentRequests={sentRequests}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name={empty.icon} size={48} color="#B0C4D8" />
            <Text style={styles.emptyText}>{empty.text}</Text>
            <Text style={styles.emptySubText}>{empty.sub}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF3FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B3A5C",
  },
  counterBadge: {
    backgroundColor: "#1B4F8A",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  tabActive: {
    backgroundColor: "#1B4F8A",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B8BA4",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  tabBadge: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  tabBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  personName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B3A5C",
  },
  personCourse: {
    fontSize: 12,
    color: "#6B8BA4",
    marginTop: 1,
  },
  personSemester: {
    fontSize: 11,
    color: "#9BB5C8",
    marginTop: 1,
  },
  // Minha rede
  removeBtn: {
    padding: 8,
  },
  // Solicitações
  pendingActions: {
    flexDirection: "column",
    gap: 6,
  },
  acceptBtn: {
    backgroundColor: "#1B4F8A",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 7,
    alignItems: "center",
  },
  acceptBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  rejectBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E74C3C",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 7,
    alignItems: "center",
  },
  rejectBtnText: {
    color: "#E74C3C",
    fontSize: 12,
    fontWeight: "600",
  },
  // Sugestões
  connectBtn: {
    backgroundColor: "#1B4F8A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 7,
  },
  connectBtnSent: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1B4F8A",
  },
  connectBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  connectBtnTextSent: {
    color: "#1B4F8A",
  },
  // Empty state
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B8BA4",
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 13,
    color: "#9BB5C8",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
