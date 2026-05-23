import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

const styles = StyleSheet.create({

  // ── Container principal ──
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
  },

  // Centraliza e limita largura na web
  innerContent: {
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },

  // ── Topo com título e botão + ──
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.foreground,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // ── Campo de busca ──
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.foreground,
  },

  // ── Estado vazio ──
  emptyCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 48,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.muted,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },

  // ── Card de cada grupo ──
  grupoCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  grupoAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grupoInfo: {
    flex: 1,
  },
  grupoNome: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 2,
  },
  grupoDescricao: {
    fontSize: 13,
    color: Colors.mutedForeground,
    marginBottom: 4,
  },
  grupoMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  grupoMetaText: {
    fontSize: 12,
    color: Colors.mutedForeground,
  },

  // ── Botão Entrar ──
  entrarButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  entrarButtonText: {
    color: Colors.primaryForeground,
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Modal de criar grupo ──
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    // flex-end faz o modal subir de baixo para cima
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCard: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 16,
    textAlign: 'center',
  },

  // ── Campos do formulário ──
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.foreground,
  },
  inputBio: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.foreground,
    height: 100,
    textAlignVertical: 'top',
  },

  // ── Botões do modal ──
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: Colors.primaryForeground,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonCancel: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.muted,
  },
  buttonCancelText: {
    color: Colors.mutedForeground,
    fontSize: 15,
    fontWeight: '500',
  },

  header: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,
    marginTop: 40,
  },

  backButton: {
    marginRight: 8,
    marginTop: 12,
  },

  headerTitle: {

    fontSize: 28,

    fontWeight: '700',

    color: Colors.cardForeground,
  },
})

export default styles