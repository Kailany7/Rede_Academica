import React, { useState, useEffect, useCallback } from "react";
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
import {
  getConnections,
  getRequests,
  getSuggestions,
  sendRequest,
  acceptRequest,
  rejectRequest,
  removeConnection,
} from "../../../services/perfilApi";

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
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pending, setPending] = useState<Connection[]>([]);
  const [suggestions, setSuggestions] = useState<Connection[]>([]);
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  const carregarDados = useCallback(async () => {
    try {
      const [conexoesRes, solicitacoesRes, sugestoesRes] = await Promise.all([
        getConnections(),
        getRequests(),
        getSuggestions(),
      ]);

      setConnections(
        conexoesRes.map((u) => ({
          id: u._id,
          name: u.nome,
          initials: u.nome?.[0] || "?",
          course: u.curso,
          semester: u.semestre,
          avatarColor: u.avatarColor || "#1B4F8A",
          status: "connected" as const,
        }))
      );

      setPending(
        solicitacoesRes.map((s) => ({
          id: s._id,
          name: s.remetente?.nome,
          initials: s.remetente?.nome?.[0] || "?",
          course: s.remetente?.curso,
          semester: s.remetente?.semestre,
          avatarColor: s.remetente?.avatarColor || "#1B4F8A",
          status: "pending" as const,
        }))
      );

      setSuggestions(
        sugestoesRes.map((s) => ({
          id: s._id,
          name: s.nome,
          initials: s.nome?.[0] || "?",
          course: s.curso,
          semester: s.semestre,
          avatarColor: s.avatarColor || "#1B4F8A",
          status: "suggestion" as const,
        }))
      );

      setSentRequests(
        new Set(
          sugestoesRes.filter((s) => s.solicitacaoEnviada).map((s) => s._id)
        )
      );
    } catch (err) {
      console.error("Erro ao carregar rede de conexões:", err);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleRemove = async (id: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
    try {
      await removeConnection(id);
    } catch (err) {
      console.error("Erro ao remover conexão:", err);
      carregarDados();
    }
  };

  const handleAccept = async (id: string) => {
    const person = pending.find((p) => p.id === id);
    if (person) {
      setConnections((prev) => [...prev, { ...person, status: "connected" }]);
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
    try {
      await acceptRequest(id);
      carregarDados();
    } catch (err) {
      console.error("Erro ao aceitar solicitação:", err);
      carregarDados();
    }
  };

  const handleReject = async (id: string) => {
    setPending((prev) => prev.filter((p) => p.id !== id));
    try {
      await rejectRequest(id);
    } catch (err) {
      console.error("Erro ao recusar solicitação:", err);
      carregarDados();
    }
  };

  const handleConnect = async (id: string) => {
    setSentRequests((prev) => new Set(prev).add(id));
    try {
      await sendRequest(id);
    } catch (err) {
      console.error("Erro ao enviar solicitação:", err);
    }
  };

  const currentData =
    activeTab === "minhaRede"
      ? connections
      : activeTab === "solicitacoes"
        ? pending
        : suggestions;

  const emptyMessages: Record<Tab, { icon: keyof typeof Ionicons.glyphMap; text: string; sub: string }> = {
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