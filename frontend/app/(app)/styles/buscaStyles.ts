import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },

  // Centraliza e limita largura na web — mesmo padrão do cadastro
  innerContent: {
    width: "90%",
    maxWidth: 600,
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Campo de busca
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.foreground,
    outlineColor: "transparent", // remove a borda azul no foco (web)
  },

  // Botões de filtro
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.cardForeground,
  },
  filterButtonTextActive: {
    color: Colors.primaryForeground,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.muted,
    borderRadius: 12,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.cardForeground,
  },

  // Card de filtros expandido
  filtersCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 16,
    gap: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.foreground,
    marginBottom: 8,
  },

  // Estado vazio
  emptyCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 48,
    alignItems: "center",
    marginTop: 8,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.muted,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.foreground,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.mutedForeground,
    textAlign: "center",
  },

  // Resultados
  resultsCount: {
    fontSize: 14,
    color: Colors.mutedForeground,
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  resultAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  resultInfo: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.foreground,
  },
  resultBadge: {
    fontSize: 10,
    backgroundColor: Colors.muted,
    color: Colors.mutedForeground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  resultSubtitle: {
    fontSize: 14,
    color: Colors.mutedForeground,
    marginBottom: 8,
  },
  resultTags: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  resultTag: {
    fontSize: 12,
    backgroundColor: Colors.muted,
    color: Colors.mutedForeground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
});

export default styles;
